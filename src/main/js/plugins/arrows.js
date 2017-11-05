'use strict';
/*global require, __plugin, exports, events, setTimeout */
/*************************************************************************
## Arrows Plugin

The arrows mod adds fancy arrows to the game. Arrows which ... 

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
  * `/js arrows.sign(self)` turns a targeted sign into an Arrows menu

All of the above functions can take an optional player object or name
as a parameter. For example: `/js arrows.explosive('player23')` makes
player23's arrows explosive.
 
***/
var Drone = require('drone'),
  teleport = require('teleport'),
  signs = require('signs'),
  fireworks = require('fireworks'),
  utils = require('utils'),
  bkArrow = org.bukkit.entity.Arrow,
  bkPlayer = org.bukkit.entity.Player,
  EXPLOSIVE_YIELD = 2.5,
  store = persist('arrows', { players: {} }),
  arrows = {},
  i,
  type,
  _types = [
    'Normal',
    'Explosive',
    'Teleport',
    'Flourish',
    'Lightning',
    'Firework'
  ];

exports.arrows = arrows;

for (i = 0; i < _types.length; i++) {
  type = _types[i].toLowerCase();
  // iife (immediately-invoked function expression)
  arrows[type] = (function(n) {
    return function(player) {
      player = utils.player(player);
      if (player) {
        store.players[player.name] = n;
      } else {
        console.warn('arrows.' + n + ' No player ' + player);
      }
    };
  })(i);
}

/*
 called when the player chooses an arrow option from a menu sign
 */
var _onMenuChoice = function(event) {
  store.players[event.player.name] = event.number;
};

var convertToArrowSign = signs.menu('Arrow', _types, _onMenuChoice);

/*
 turn a sign into a menu of arrow choices
 */
arrows.sign = function(cmdSender) {
  var sign = signs.getTargetedBy(cmdSender);
  if (!sign) {
    throw new Error('You must first look at a sign!');
  }
  return convertToArrowSign(sign, true);
};

/*
 event handler called when a projectile hits something
 */
function onBukkitArrowHit(event) {
  var projectile = event.entity,
    world = projectile.world,
    shooter = projectile.shooter,
    fireworkCount = 5,
    arrowType;

  function launch() {
    fireworks.firework(projectile.location);
    if (--fireworkCount) {
      setTimeout(launch, 2000);
    }
  }
  if (projectile instanceof bkArrow && shooter instanceof bkPlayer) {
    arrowType = store.players[shooter.name];

    switch (arrowType) {
      case 1:
        projectile.remove();
        world.createExplosion(projectile.location, EXPLOSIVE_YIELD);
        break;
      case 2:
        projectile.remove();
        teleport(shooter, projectile.location);
        break;
      case 3:
        projectile.remove();
        new Drone(projectile.location).oak();
        break;
      case 4:
        projectile.remove();
        world.strikeLightning(projectile.location);
        break;
      case 5:
        projectile.remove();
        launch();
        break;
    }
  }
}

function onCanaryArrowHit(event) {
  var projectile = event.projectile,
    world = projectile.world,
    shooter = projectile.owner,
    fireworkCount = 5,
    arrowType,
    cmArrow = Packages.net.canarymod.api.entity.Arrow,
    cmPlayer = Packages.net.canarymod.api.entity.living.humanoid.Player,
    loc = projectile.location,
    launch = function() {
      fireworks.firework(loc);
      if (--fireworkCount) {
        setTimeout(launch, 2000);
      }
    };

  if (projectile instanceof cmArrow && shooter instanceof cmPlayer) {
    arrowType = store.players[shooter.name];

    switch (arrowType) {
      case 1:
        projectile.destroy();
        world.makeExplosion(shooter, loc, EXPLOSIVE_YIELD, true);
        break;
      case 2:
        projectile.destroy();
        teleport(shooter, loc);
        break;
      case 3:
        projectile.destroy();
        new Drone(loc).oak();
        break;
      case 4:
        projectile.destroy();
        world.makeLightningBolt(loc);
        break;
      case 5:
        projectile.destroy();
        launch();
        break;
    }
  }
}
events.projectileHit(__plugin.bukkit ? onBukkitArrowHit : onCanaryArrowHit);
