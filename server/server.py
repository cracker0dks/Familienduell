#!/usr/bin/env python
#Benötigte Module: asyncio websockets

import asyncio
import datetime
import websockets
import pprint

#server config <change ip if you like>
ip = "0.0.0.0"
port = 8080

#global vars
clients = set()

@asyncio.coroutine
def sendMsg(socket, msg):
	print ("info>send>begin:\n" + msg + "\ninfo>send>end")
	yield from socket.send(msg)

@asyncio.coroutine
def broadcast(msg):

	command = msg.split("###");
	print("info>broadcasting msg(" + str(len(msg)) + ") command=" + command[0])

	for client in clients:
		
		print("info>broadcast>send to" + str(client.remote_address))
		yield from client.send(msg)

@asyncio.coroutine
def client_connect(websocket, path):
	print("info>Client connected:" + str(websocket.remote_address));
	clients.add(websocket)

	try:
		while True:
			msg = yield from websocket.recv()

			command = msg.split("###");

			pprint.pprint(command)

			if command[0] == "fileOp":
				print("info>got filop");

				if command[1] == "read":
					print("info>fileop> got read")
					print("info>fileop>read:" + command[2])

					try:
						f = open(command[2], "r", encoding='utf8')
						content = f.read()
						f.close()

						print("reading done")
					except:
						print("Error reading file:"+ command[2])

					#send content
					#yield from sendMsg(websocket, "file###" + command[2] + "###" + content)
					yield from broadcast("file###" + command[2] + "###" + content);

				elif command[1] == "write":
					f = open(command[2], "w", encoding='utf8')
					f.write(command[3])
					f.close()

					yield from broadcast("file###" + command[2] + "###" + command[3])

			else:
				yield from broadcast(msg)

	except:
		print("info>client disconnected:" + path);
		clients.remove(websocket)
		#raise

print("info>starting server " + ip + ":" + str(port))
server = websockets.serve(client_connect, ip, port)

print ("info>go into loop")
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
