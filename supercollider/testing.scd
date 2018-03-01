SuperDirt.start()

(
var superDirtPort = 57110;
var srcID= NetAddr.new("127.0.0.1",port:57110);
var server = NetAddr.new("127.0.0.1",port:9000);
OSCdef(\tidalcycles,{
	|msg|
	msg.postln;
	~server.sendBundle(0,["/play"]++(msg[7..]));
},"/play2")
)

[1]++[2,3,4]

~server = NetAddr.new("127.0.0.1",port:9000);

~server.sendBundle(0,["/hmmm",\type,3]);

~server.sendMsg("/hmm",\type,3);


[1,2,3,4][1..]

sendmsg


SuperDirt.start()

"[\play,2,\"value\",3]".interpret


OSCFunc({|msg| msg.postln;})


[].argTemplate

SuperDirt.start