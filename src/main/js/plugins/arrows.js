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

var signs = require('signs'),
  fireworks = require('fireworks'),
  utils = require('utils'),
  bkTeleportCause = org.bukkit.event.player.PlayerTeleportEvent.TeleportCause,
  bkArrow = org.bukkit.entity.Arrow,
  bkPlayer = org.bukkit.entity.Player,
  bkTreeType = org.bukkit.TreeType,
  EXPLOSIVE_YIELD = 2.5,
  _store = { players: { } },
  arrows = plugin( 'arrows', { store: _store }, true ),
  i,
  type,
  _types = [ 'Normal', 'Explosive', 'Teleport', 'Flourish', 'Lightning', 'Firework' ];

exports.arrows = arrows;


for ( i = 0; i < _types.length; i++ ) {
  type = _types[i].toLowerCase();
  // iife (immediately-invoked function expression)
  arrows[ type ] = ( function( n ) {
    return function( player ) {
      player = utils.player( player );
      if ( player ) {
        arrows.store.players[ player.name ] = n;
      } else {
        console.warn('arrows.' + n + ' No player ' + player);
      }
    };
  } )( i );
}

/*
 called when the player chooses an arrow option from a menu sign
 */
var _onMenuChoice = function( event ) {
  arrows.store.players[ event.player.name ] = event.number;
};
var convertToArrowSign = signs.menu( 'Arrow', _types, _onMenuChoice );

/*
 turn a sign into a menu of arrow choices
 */
arrows.sign = function( cmdSender ) {
  var sign = signs.getTargetedBy( cmdSender );
  if ( !sign ) {
    throw new Error( 'You must first look at a sign!' );
  }
  return convertToArrowSign( sign, true );
};

/*
 event handler called when a projectile hits something
 */
var _onArrowHit = function( listener, event ) {
  var projectile = event.entity,
    world = projectile.world,
    shooter = projectile.shooter,
    fireworkCount = 5,
    arrowType,
    launch = function( ) {
      fireworks.firework( projectile.location );
      if ( --fireworkCount ) { 
	setTimeout( launch, 2000 );
      }
    };

  if (projectile instanceof bkArrow 
      && shooter instanceof bkPlayer) {

    arrowType = arrows.store.players[ shooter.name ];

    switch ( arrowType ) {
    case 1:
      projectile.remove();
      world.createExplosion( projectile.location, EXPLOSIVE_YIELD );
      break;
    case 2:
      projectile.remove();
      shooter.teleport( projectile.location, bkTeleportCause.PLUGIN );
      break;
    case 3:
      projectile.remove();
      world.generateTree( projectile.location, bkTreeType.BIG_TREE );
      break;
    case 4: 
      projectile.remove();
      world.strikeLightning( projectile.location );
      break;
    case 5:
      projectile.remove();
      launch();
      break;
    }
  }
};
events.on( 'entity.ProjectileHitEvent', _onArrowHit );

