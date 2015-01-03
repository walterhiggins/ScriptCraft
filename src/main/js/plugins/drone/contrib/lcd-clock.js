'use strict';
/*global require, setInterval, clearInterval, __plugin, exports*/
/*
 Experimental:
 Point at a block and issue the following ...
 /js var d = new Drone();
 /js var clock = new LCDClock(d);
 /js clock.start24(); 
 ... start the clock...
 /js clock.stop24();
 ... stops the clock...
 */
var Drone = require('../drone').Drone,
    blocktype = require('../blocktype'),
    blocks = require('blocks');


exports.LCDClock = function(drone, fgColor,bgColor,border) {

  var lastSecs = [0,0,0,0],
      world = drone.world,
      intervalId = -1;

  function update(secs) {
    var digits = [0,0,0,0],
	s = secs % 60,
	m = (secs - s) / 60;
    digits[3] = s%10;
    digits[2] = (s-digits[3])/10;
    digits[1] = m%10;
    digits[0] = (m-digits[1])/10;
    //
    // updating all 4 digits each time is expensive
    // only update digits which have changed (in most cases - just 1)
    //
    if (digits[3] != lastSecs[3]){
      drone
	.right(14)
	.blocktype(''+digits[3],fgColor,bgColor, true)
	.left(14);
    }
    if (digits[2] != lastSecs[2]){
      drone
	.right(10)
	.blocktype(''+digits[2],fgColor,bgColor, true)
	.left(10);
    }
    if (digits[1] != lastSecs[1]){
      drone
	.right(4)
	.blocktype(''+digits[1], fgColor, bgColor, true)
	.left(4);
    }
    if (digits[0] != lastSecs[0]){
      drone
	.blocktype(''+digits[0], fgColor, bgColor, true);
    }
    lastSecs[0] = digits[0];
    lastSecs[1] = digits[1];
    lastSecs[2] = digits[2];
    lastSecs[3] = digits[3];
    
  }
  if ( typeof bgColor == 'undefined' ) {
    bgColor = blocks.wool.black;
  }
  if ( typeof fgColor == 'undefined' ) {
    fgColor = blocks.wool.white ; // white wool 
  }
  if ( border ) {
    drone.box(border,21,9,1);
    drone.up().right();
  }
  drone.blocktype('00:00', fgColor, bgColor, true);
  return { 
    start24: function( ) {
      function tick() {
	var rolloverMins = 24*60,
	    mcTime = __plugin.canary ? world.totalTime : world.time,
	    timeOfDayInMins = Math.floor(((mcTime + 6000) % 24000) / 16.6667);
	timeOfDayInMins = timeOfDayInMins % rolloverMins;
	update( timeOfDayInMins );
      };
      intervalId = setInterval(tick, 800);
    },
    stop24: function() {
      clearInterval( intervalId );
    }
  };
};

