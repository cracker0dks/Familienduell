//Websocket Server <<<<<<<<<<<<<<
var wsPort = 8080;
var subscribers = [];
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: wsPort});
var fs = require('fs');

wss.on('connection', function(ws) {
	subscribers.push(ws);
	ws.send(subscribers.length-1 + '###thatsYou');
	
	for(var i=0;i<subscribers.length;i++) {
		if(subscribers[i] != null)
			broadcastMessage(i, "connected");
	}
	
	console.log("~~~~~~~~ WELCOME TO SERVER ~~~~~~ s:"+subscribers.length);
    ws.on('message', function(message) {
    	console.log('msg: ' + message);
    	var parts = message.split("###");
    	if(parts[0] != "fileOp") {
	    	broadcastMessage(getClientId(), message);
	    } else {
	    	if(parts[1] == "write")
	    		writeInFile(parts[2], parts[3], function(ret) {
	    			if(ret == "error") {
	    				broadcastMessage(getClientId(), "error###Fehler beim Schreiben einer Datei... siehe Serverlog!");
	    			} else {
	    				broadcastMessage(getClientId(), "file###"+parts[2]+"###"+parts[3]);
	    			}
	    		});
	    	else if(parts[1] == "read") {
	    		readFile(parts[2], function(content) {
	    			if(content == "error") {
	    				broadcastMessage(getClientId(), "error###Fehler beim Lesen einer Datei... siehe Serverlog!");
	    			} else {
		    			broadcastMessage(getClientId(), "file###"+parts[2]+"###"+content);
		    		}
	    		});
	    	}	    		
	    }
    });

	ws.on("close", function() {
		var cId = getClientId();
		subscribers[cId] = null;
		broadcastMessage(cId, "disconnected");
		console.log('Subscriber left: ' + subscribers.length + " total.\n");
	});
	
	function getClientId() {
		for(var i=0;i<subscribers.length;i++) {
			if(subscribers[i] == ws)
				return i;
		}
	}
});

function broadcastMessage(clientId, msg) {
	console.log("broadcast:"+msg.split("###")[0]+" length:"+subscribers.length);
	for(var i=0;i<subscribers.length;i++) {
		if(subscribers[i] != null)
			subscribers[i].send(msg);
	}
}

console.log("\nWebsocket Server on Port:"+wsPort);
console.log("\nYou have this IPs to connect to:");
console.log("From this PC: 127.0.0.1 or localhost");
console.log("\n---From different networks---");
getLocalIp()
console.log("\n\n------------------------------");
console.log("\n---SERVER IS UP AND RUNNING---");
console.log("\n------------------------------");

function writeInFile(filename, content, callback) {
	console.log("going to read file:"+filename);
	fs.writeFile(filename, content, function(err) {
		console.log("file:"+filename+" write callback done!");
	    if(err) {
	    	console.log(err);
	    	callback("error");
	    } else {
	    	callback("success");
	        console.log("The file '"+filename+"' was saved!");
	    }
	}); 
}

function readFile(filename, callback) {
	console.log("going to read file:"+filename);
	fs.readFile(filename, 'utf8', function (err,data) {
		console.log("file:"+filename+" read callback done!");
		if (err) {
			console.log(err);
			callback("error");
	  	}
	  	callback(data);
	});
}

function getLocalIp() {
    var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});
}
