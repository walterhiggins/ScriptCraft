// Example inspired by ScriptCraft tutorial

var rainbowColors = [
	blocks.wool.red, 
	blocks.wool.orange, 
	blocks.wool.yellow, 
	blocks.wool.lime, 
	blocks.wool.lightblue, 
	blocks.wool.blue, 
	blocks.wool.purple,
	blocks.wool.blue,
	blocks.wool.lightblue,
	blocks.wool.lime, 
	blocks.wool.yellow, 
	blocks.wool.orange, 
	blocks.wool.red
	];

exports.road_rainbow = function(howLong) {
	boxa(rainbowColors,13,1,howLong);
};

//Example: /js road_rainbow(100)