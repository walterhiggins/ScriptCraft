/*************************************************************************
 * Authors:
 *  - Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04)
 *  - Michael Vorburger: Clean-up for initial ScriptCraft Git contribution
 */

var items = require('items');

var ItemType = Packages.net.canarymod.api.inventory.ItemType;
var Canary = Packages.net.canarymod.Canary;
var itemFactory = Canary.factory().itemFactory;

exports.piramid = function( drone, width, length, height ) {
	while(width>=2&&length>=2&&height>=1){
	     drone.box0(2,width,1,length);
		 drone.fwd();
		 drone.right();
		 width=width-2;
		 length=length-2;
		 drone.box (3,width,1,length);
		 drone.up();
		 height--;
	}
};

command( 'daytime', function ( parameters, player ) {
    player.location.world.setTime(4000);
});

exports.boxAlternate = function(drone, width, length, material1, material2) {
	for (var count3 = 0; count3 < 2; count3++) {
	    for (var count = 0; count < width/2; count++) {
	      drone.box(material1);
	      drone.fwd();
	      drone.box(material2);
	      drone.fwd();
	    }
	    drone.turn();
	    for (var count2 = 0; count2 < length/2; count2++) {
	        drone.box(material1);
	        drone.fwd();
	        drone.box(material2);
	        drone.fwd();
	    }
	    drone.turn();
	}
};
