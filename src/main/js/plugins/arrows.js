/*************************************************************************
## Arrows Plugin

The arrows mod adds fancy arrows to the game. Arrows which... 

 * Launch fireworks.
 * Explode on impact. 
 * Force Lightning to strike where they land.
 * Teleport the player to the landing spot.
 * Spawn Trees at the landing spot.

### Usage: 

  * `/js arrows.firework(self)` - A firework launches where the the arrow lands.
  * `/js arrows.lightning(self)` - lightning strikes where the arrow lands.
  * `/js arrows.teleport(self)` - makes player teleport to where arrow has landed.
  * `/js arrows.flourish(self)` - makes a tree grow where the arrow lands.
  * `/js arrows.explosive(self)` - makes arrows explode.
  * `/js arrows.normal(self)` sets arrow type to normal.
  * `/js arrows.sign(self)` turns a targeted sign into a Arrows menu

All of the above functions can take an optional player object or name
as a parameter. For example: `/js arrows.explosive('player23')` makes
player23's arrows explosive.
 
***/

var signs = require('signs');
var fireworks = require('fireworks');
var utils = require('utils');

var _store = {players: {}};

var arrows = plugin("arrows",{
    /*
      turn a sign into a menu of arrow choices
    */
    sign: function(sign){},
    /*
      change player's arrows to normal
     */
    normal: function(player){},
    /*
      change player's arrows to explode on impact
     */
    explosive: function(player){},
    /*
      change player's arrows to teleporting
     */
    teleport: function(player){},
    /*
      change player's arrows to plant trees where they land
     */
    flourish: function(player){},
    /*
      change player's arrows to strike lightning where they land
     */
    lightning: function(player){},

    /*
      launch a firework where the arrow lands
     */
    explosiveYield: 2.5,
    
    store: _store

},true);

exports.arrows = arrows;

//
// setup functions for the arrow types
//
var _types = {normal: 0, explosive: 1, teleport: 2, flourish: 3, lightning: 4, firework: 5};
for (var type in _types)
{
    arrows[type] = (function(n){
        return function(player){
            player = utils.player(player);
            if (player)
                arrows.store.players[player.name] = n;
            else
                console.warn('arrows.' + n + ' No player ' + player);
        };
    })(_types[type]);
}

/*
  called when the player chooses an arrow option from a menu sign
*/
var _onMenuChoice = function(event){
    arrows.store.players[event.player.name] = event.number;
};
var convertToArrowSign = signs.menu(
    "Arrow", 
    ["Normal","Explosive","Teleport","Flourish","Lightning","Firework"],
    _onMenuChoice);

arrows.sign = function(cmdSender)
{
    var sign = signs.getTargetedBy(cmdSender);
    if (!sign){
        throw new Error('You must first look at a sign!');
    }
    return convertToArrowSign(sign,true);
};

/*
  event handler called when a projectile hits something
*/
var _onArrowHit = function(listener,event)
{
    var projectile = event.entity;
    var world = projectile.world;
    var shooter = projectile.shooter;
    var fireworkCount = 5;
    if (projectile instanceof org.bukkit.entity.Arrow && 
        shooter instanceof org.bukkit.entity.Player)
    {
        var arrowType = arrows.store.players[shooter.name];

        switch (arrowType){
        case 1:
            projectile.remove();
            world.createExplosion(projectile.location,arrows.explosiveYield);
            break;
        case 2:
            projectile.remove();
            var teleportCause =org.bukkit.event.player.PlayerTeleportEvent.TeleportCause;
            shooter.teleport(projectile.location,
                             teleportCause.PLUGIN);
            break;
        case 3:
            projectile.remove();
            world.generateTree(projectile.location, org.bukkit.TreeType.BIG_TREE);
            break;
        case 4: 
            projectile.remove();
            world.strikeLightning(projectile.location);
            break;
        case 5:
            projectile.remove();
            var launch = function(){
                fireworks.firework(projectile.location);
                if (--fireworkCount)
                    setTimeout(launch,2000);
            };
            launch();
            break;
        }
    }
};
events.on('entity.ProjectileHitEvent',_onArrowHit);

