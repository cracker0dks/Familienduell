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

console.log("Websocket Server running at ws://127.0.0.1:"+wsPort);

function writeInFile(filename, content, callback) {
	console.log("going to read file:"+filename);
	fs.writeFile(filename, content, function(err) {
		console.log("file:"+filname+" write callback done!");
	    if(err) {
	    	console.log(err);
	    	callback("error");
	    } else {
	    	callback("success");
	        console.log("The file '"+filename+"' was saved!");
	    }
	}); 
}

function readFile(filname, callback) {
	console.log("going to read file:"+filname);
	fs.readFile(filname, 'utf8', function (err,data) {
		console.log("file:"+filname+" read callback done!");
		if (err) {
			console.log(err);
			callback("error");
	  	}
	  	callback(data);
	});
}


