/*************************************************************************
 *
 * The arrows mod adds fancy arrows to the game.
 * 
 * Usage: 
 * /js arrows.sign() turns a targeted sign into a Arrows menu
 * /js arrows.normal() sets arrow type to normal.
 * /js arrows.explosive() - makes arrows explode.
 * /js arrows.teleport() - makes player teleport to where arrow has landed.
 * /js arrows.flourish() - makes a tree grow where the arrow lands.
 * /js arrows.lightning() - lightning strikes where the arrow lands.
 *
 * All of the above functions can take an optional player object or name as 
 * a parameter. E.g.
 * 
 * /js arrows.explosive('player23') makes player23's arrows explosive.
 *
 ************************************************************************/

load(__folder + "signs/select.js");
load(__folder + "bukkit/events.js");
var arrows = arrows || {};
// ------------------------------------------------------------------------
// Private implementation
// ------------------------------------------------------------------------
(function(){
	 //
	 // setup functions for the arrow types
	 //
	 var _types = {normal: 0, explosive: 1, teleport: 2, flourish: 3, lightning: 4};
	 for (var i in _types){
		  arrows[[i]] = (function(n){
				return function(player){
					 if (typeof player == "undefined")
						  player = __self;
					 var playerName = null;
					 if (typeof player == "string")
						  playerName = player;
					 else
						  playerName = player.name;
					 _players[playerName] = n;
				};
		  })(_types[i]);
	 }
	 if (typeof arrows.sign != "undefined")
		  return;
	 
	 var _players = {};

	 var _arrowSign = 
		  signs.select("Arrow",
							["Normal","Explosive","Teleport","Flourish","Lightning"],
							function(player,sign,selectedText,selectedIndex){
								 _players[player.name] = selectedIndex;
							});
	 //
	 // event handler called when a projectile hits something
	 //
	 var _onArrowHit = function(listener,event)
	 {
		  var projectile = event.entity;
		  var world = projectile.world;
		  var shooter = projectile.shooter;
		  if (projectile instanceof Arrow && shooter instanceof Player){
				var arrowType = _players[shooter.name];
				switch (arrowType){
				case 1:
					 projectile.remove();
					 world.createExplosion(projectile.location,2.5);
					 break;
				case 2:
					 projectile.remove();
					 shooter.teleport(projectile.location,
											org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.ENDER_PEARL);
					 break;
				case 3:
					 projectile.remove();
					 world.generateTree(projectile.location, org.bukkit.TreeType.BIG_TREE);
					 break;
				case 4: 
					 projectile.remove();
					 world.strikeLightning(projectile.location);
					 break;
				}
		  }
	 };
	 arrows.sign = _arrowSign;
	 bukkit.on("entity.ProjectileHitEvent",_onArrowHit);
}());
