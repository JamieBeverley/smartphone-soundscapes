SuperDirt.start()

(
var processingPort = 9003;
var processing = NetAddr.new("127.0.0.1", processingPort);
~node = NetAddr.new("127.0.0.1",port:9000);
OSCdef(\repackageTidal,{
		|msg|
	var sus, legato, dur, cps, delta,s;
	msg.postln;
	msg.size.do{
		|i|
		if(msg[i] == 'sustain',{sus = msg[i+1]});
		if(msg[i] == 'legato',{legato = msg[i+1]});
		if(msg[i] == 's', {s = msg[i+1]});
		if(msg[i] == 'cps', {cps = msg[i+1]});
		if(msg[i] == 'delta', {delta = msg[i+1]});
	};

	if(sus == nil, {
		if (legato !=nil,
			{dur = (1/cps)*delta*legato},
			{dur = (1/cps)*delta}
		);
	},{dur = sus}
	);
	// processing.sendMsg("/sound",s,dur);


	~node.sendBundle(0,["/play"]++(msg[7..]));

},path:'/play2',recvPort:57120)

)











(
var superDirtPort = 57110;
var srcID= NetAddr.new("127.0.0.1",port:57110);
var server = NetAddr.new("127.0.0.1",port:9000);
~server = NetAddr.new("127.0.0.1",port:9000);
OSCdef(\tidalcycles,{
	|msg|
	msg.postln;
	~server.sendBundle(0,["/play"]++(msg[7..]));
},'/play2',srcID:NetAddr.new("127.0.0.1"))
)

[1]++[2,3,4]



~server.sendBundle(0,["/hmmm",\type,3]);

~server.sendMsg("/hmm",\type,3);


[1,2,3,4][1..]

sendmsg


SuperDirt.start()

"[\play,2,\"value\",3]".interpret


OSCFunc({|msg| msg.postln;})


[].argTemplate

SuperDirt.start