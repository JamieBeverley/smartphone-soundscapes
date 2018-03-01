var http = require('http');
var express = require('express');
var server = http.createServer();
var expressServer = express();
var osc = require ('osc')

var scOSC = new osc.UDPPort({
	localAddress: "0.0.0.0",
	localPort: 9000,
	remoteAddress: "127.0.0.1",
	remotePort: 9001
})
scOSC.open();

// uses current directory
expressServer.use(express.static(__dirname));
server.on('request', expressServer)


//http server listening on 8000
server.listen(8000, function(){console.log("listening")})

// WebSocket
var WebSocket = require('ws')
var wsServer = new WebSocket.Server({server: server});

var id=0;
var clients = {};

// Messages with/on WebSocket
wsServer.on('connection', function(r){
	id=id+1;
  r.identifier=id;
	console.log((new Date())+ 'Connection accepted, id: '+ id);
	//Default setting
	clients[id]={
		id: id,
		client:r,
		username:"User"+id
	};

  // On Message ////////////////////////////////////////
	r.on('message',function(message){

		var msg = JSON.parse(message);
		if (msg.type =='motion'){
		} else if (msg.type == 'updateWeights'){
		}
		else {
				console.log("WARNING: Server received unhandled message from client: "+msg.type)
				console.log("________________________________________")
		}
	});//end on message

  // Connection close//////////////////////////////////
	r.on('close', function(reasonCode, description){
		for (var a in clients){
			if (clients[a].id==r.identifier) {
				console.log("Client: " +a+" disconnected");

				delete clients[a]
				break;
			}
		}
	});// end on 'close'

    // Connection Errors..////////////////////////////////
  	r.on('error',function(){
  		for (var a in clients){
  			if (clients[a].client.identifier == r.identifier) delete clients[a]
  	}
  	});//end on 'error'
});


// Messages from SuperCollider
scOSC.on('message',function(msg){

	if (msg.address =="/play"){
			msg.portion = msg.portion?msg.portion:1;
			console.log(msg);
			wsServer.weightedBroadcast(JSON.stringify(msg),msg.portion);
	} else {
		console.log("********WARNING: OSC received from SC with no recognized address: "+msg.type)
		console.log(msg)
	}
})

wsServer.weightedBroadcast = function (data,probability){
	for (i in clients){
		if (Math.random()<=probability){
				try {
	    		clients[i].client.send(data)
			} catch (e){
				console.log("broadcast message dropped for client: "+client[i].identifier+"  "+client[i].username)
			}
		}
	}
}

wsServer.broadcast = function (data){
	for (i in clients){
  		try {
    		clients[i].client.send(data)
		} catch (e){
			console.log("broadcast message dropped for client: "+client[i].identifier+"  "+client[i].username)
		}
	}
}


function mean(array){
	var result=0
	for (i in array){
		result=result+array[i]
	}
	return result/array.length
}
