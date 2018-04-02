
try{
	var	ws = new WebSocket("ws://"+location.hostname+":"+location.port, 'echo-protocol');
	console.log("WebSocket established")
} catch (e){
	console.log("no WebSocket connection")
  alert("oops, something went wrong connecting to server - please reload!")
}

var isActive = false;

//Web Audio Stuff:
var ac;
var wd;

function start(){
	wd = new WebDirt("WebDirt/sampleMap.json","WebDirt/Dirt-Samples");
	wd.initializeWebAudio();
	document.getElementById("mainBody").style.visibility = "visible";
	document.getElementById("startButton").style.visibility = "hidden";
	isActive = true;
}

//
// function initWebAudio(){
// 	window.AudioContext = window.AudioContext || window.webkitAudioContext;
// 	ac = new AudioContext();
// 	console.log("Web Audio Initialized");
// }


function testWebAudio(){
	var mod = ac.createOscillator()
	mod.frequency.value = 440;
	mod.type = 'sine'
	mod.start();
	var modGain = ac.createGain()
	modGain.gain.value = 440;
	mod.connect(modGain)
	var car = ac.createOscillator()
	car.frequency.value = 440;
	modGain.connect(car.frequency);
	car.type = 'sine'
	var melodyGain = ac.createGain();
	car.connect(melodyGain)
	melodyGain.gain.setValueAtTime(0,ac.currentTime)
	melodyGain.gain.linearRampToValueAtTime(0.1,ac.currentTime+0.4)
	melodyGain.gain.linearRampToValueAtTime(0,ac.currentTime+2)
	melodyGain.connect(ac.destination)
	car.start()
}


ws.addEventListener('message', function(message){
	var msg = JSON.parse(message.data)

	if (msg.address == "/play"){
		var wdMsg = {};
		console.log(msg.args)
		for (var i =0; i<msg.args.length; i=i+2){
			wdMsg[msg.args[i]] = msg.args[i+1];
		}
		if(isActive){
			wd.playSample(wdMsg)
		}
	} else if(msg.type =="..."){

	} else {
    console.log("WARNING: Message received from server with unrecognized message type")
	}
})
