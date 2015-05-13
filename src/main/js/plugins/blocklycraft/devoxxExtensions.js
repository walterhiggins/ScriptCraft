/*******************************************************************************
 * Authors: - Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04) -
 * Michael Vorburger: Clean-up for initial ScriptCraft Git contribution
 * 
 * 
 * Define the functions useful for runing a Devoxx4kids session
 */

var items = require('items');
var utils = require('utils');

command('daytime', function(parameters, player) {
	player.location.world.setTime(4000);
});

command('nighttime', function(parameters, player) {
	player.location.world.setTime(12000);
});

// explosive ray
command('exp', function(parameters, player) {
	var theDrone = new Drone(player);
	for ( var count = 0; count < 5; count++) {
		theDrone.fwd();
		theDrone.fwd();

		player.world.makeExplosion(player, theDrone.getLocation(), 2.5, true);
	}
});

/*
 * command for the final mob attack. 
 * usage example to create a group 2x2 of zombies: jsp mob zombie 2
 */
command('mob', function(parameters, player) {
	if (!isOp(player)) {
		echo(player, 'Only operators can perform this command');
		return;
	}
	var myEntity = parameters[0];
	var groupWidth = parameters[1];
	var theDrone = new Drone(player);
	theDrone.up();
	theDrone.chkpt('start');
	var timeoutStop = new Date().getTime() + 500;
	for ( var count2 = 0; count2 < groupWidth; count2++) {
		if (new Date().getTime() > timeoutStop) {
			console.log('timeout reached');
			break;
		}
		;
		theDrone.chkpt('start');
		for ( var count = 0; count < groupWidth; count++) {
			if (new Date().getTime() > timeoutStop) {
				console.log('timeout reached');
				break;
			}
			;
			Packages.net.canarymod.Canary.factory().entityFactory.newEntity(Packages.net.canarymod.api.entity.EntityType[(myEntity).toUpperCase()],
					theDrone.getLocation()).spawn();
			theDrone.fwd();
			theDrone.fwd();
		}
		theDrone.move('start');
		theDrone.right();
		theDrone.right();
	}
});


//remove the night. This stops mobs from spawning naturally
function skipTheNight() { 
	// naturally
	var wrld = utils.world('default');
	var currTime = utils.time(wrld);
	if (currTime > 12500 && currTime < 23500) { // evening
		wrld.setTime(23500); // early morning
	}
	// console.log(currTime);
	setTimeout(skipTheNight, 30000);
};


// setup the player with armor and tools.
// make the player able to fly
function preparePlayer(event) { // give the default tools to the new players
	var player = event.player;
	player.getInventory().addItem(items.diamondPickaxe());
	player.getInventory().addItem(items.diamondSword());
	player.getInventory().addItem(items.diamondAxe());
	player.getInventory().addItem(items.diamondHoe());
	player.getInventory().addItem(items.diamondSpade());
	player.getInventory().addItem(items.bow());
	player.getInventory().addItem(items.arrow(64));
	player.getInventory().addItem(items.diamondBoots());
	player.getInventory().addItem(items.diamondChestplate());
	player.getInventory().addItem(items.diamondHelmet());
	player.getInventory().addItem(items.diamondLeggings());
	 
	server.consoleCommand('fly ' + player.name); // this command might fail if the fly plugin is not installed
}

// call 'jsp devoxx' after starting the server for a Devoxx4Kids session
command('devoxx', function(parameters, player) {
	skipTheNight();
	events.playerRespawned(preparePlayer);
	events.on(net.canarymod.hook.player.ConnectionHook, preparePlayer)
});
