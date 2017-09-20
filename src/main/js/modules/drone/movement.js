'use strict';
/*global require,__plugin, module, Packages, org*/

/************************************************************************
### Drone Movement

Drones can move freely in minecraft's 3-D world. You control the
Drone's movement using any of the following methods..

 * up()
 * down()
 * left()
 * right()
 * fwd()
 * back()
 * turn()

... Each of these methods takes a single optional parameter
`numBlocks` - the number of blocks to move in the given direction. If
no parameter is given, the default is 1.

To change direction use the `turn()` method which also takes a single
optional parameter (numTurns) - the number of 90 degree turns to
make. Turns are always clock-wise. If the drone is facing north, then
drone.turn() will make the turn face east. If the drone is facing east
then drone.turn(2) will make the drone turn twice so that it is facing
west.

### Drone Positional Info

 * getLocation() - Returns a native Java Location object for the drone

### Drone Markers

Markers are useful when your Drone has to do a lot of work. You can
set a check-point and return to the check-point using the move()
method.  If your drone is about to undertake a lot of work -
e.g. building a road, skyscraper or forest you should set a
check-point before doing so if you want your drone to return to its
current location.

A 'start' checkpoint is automatically created when the Drone is first created.

Markers are created and returned to using the followng two methods...

 * chkpt - Saves the drone's current location so it can be returned to later.
 * move - moves the drone to a saved location. Alternatively you can provide a Java Location object or x,y,z and direction parameters.

#### Parameters

 * name - the name of the checkpoint to save or return to.

#### Example

    drone.chkpt('town-square');
    //
    // the drone can now go off on a long excursion
    //
    for ( i = 0; i< 100; i++) {  
        drone.fwd(12).box(6); 
    }
    //
    // return to the point before the excursion
    //
    drone.move('town-square');

***/
var _movements = [{},{},{},{}];
// east
_movements[0].right = function( drone,n ) {  drone.z +=n; return drone;};
_movements[0].left = function( drone,n ) {  drone.z -=n; return drone;};
_movements[0].fwd = function( drone,n ) {  drone.x +=n; return drone;};
_movements[0].back = function( drone,n ) {  drone.x -= n; return drone;};
// south
_movements[1].right = _movements[0].back;
_movements[1].left = _movements[0].fwd;
_movements[1].fwd = _movements[0].right;
_movements[1].back = _movements[0].left;
// west
_movements[2].right = _movements[0].left;
_movements[2].left = _movements[0].right;
_movements[2].fwd = _movements[0].back;
_movements[2].back = _movements[0].fwd;
// north
_movements[3].right = _movements[0].fwd;
_movements[3].left = _movements[0].back;
_movements[3].fwd = _movements[0].left;
_movements[3].back = _movements[0].right;

function turn( n ) {
  if ( typeof n == 'undefined' ) {
    n = 1;
  }
  this.dir += n;
  this.dir %=4;
}
function chkpt( name ) {
  this._checkpoints[ name ] = { x:this.x, y:this.y, z:this.z, dir:this.dir };
}
function move( ) {
  var Drone = this.constructor;
  if ( arguments[0].x && arguments[0].y && arguments[0].z) {
    this.x = arguments[0].x;
    this.y = arguments[0].y;
    this.z = arguments[0].z;
    this.dir = Drone.getDirFromRotation(arguments[0] );
    this.world = arguments[0].world;
  } else if ( typeof arguments[0] === 'string' ) {
    var coords = this._checkpoints[arguments[0]];
    if ( coords ) {
      this.x = coords.x;
      this.y = coords.y;
      this.z = coords.z;
      this.dir = coords.dir%4;
    }            
  } else {
    // expect x,y,z,dir
    switch( arguments.length ) {
    case 4:
      this.dir = arguments[3];
    case 3:
      this.z = arguments[2];
    case 2:
      this.y = arguments[1];
    case 1:
      this.x = arguments[0];
    }
  }
}
function right( n ) { 
  if ( typeof n == 'undefined' ) {
    n = 1;
  }
  _movements[ this.dir ].right( this, n ); 
}
function left( n ) { 
  if ( typeof n == 'undefined') { 
    n = 1;
  }
  _movements[ this.dir ].left( this, n );
}
function fwd( n ) { 
  if ( typeof n == 'undefined' ) {
    n = 1;
  }
  _movements[ this.dir ].fwd( this, n );
}
function back( n ) { 
  if ( typeof n == 'undefined' ) { 
    n = 1;
  }
  _movements[ this.dir ].back( this, n );
}
function up( n ) { 
  if ( typeof n == 'undefined' ) {
    n = 1;
  }
  this.y+= n; 
}
function down( n ) { 
  if ( typeof n == 'undefined' ) {
    n = 1;
  }
  this.y-= n; 
}
function getLocation( ) {
  if (__plugin.canary) {
    var cmLocation = Packages.net.canarymod.api.world.position.Location;
    return new cmLocation( this.world, this.x, this.y, this.z, 0, 0);
  }
  if (__plugin.bukkit) { 
    var bkLocation = org.bukkit.Location;
    return new bkLocation( this.world, this.x, this.y, this.z );
  }
}
module.exports = function(Drone){
  Drone.prototype._checkpoints = {};
  Drone.prototype.getLocation = getLocation;
  Drone.extend( chkpt );
  Drone.extend( move );
  Drone.extend( turn );
  Drone.extend( right );
  Drone.extend( left );
  Drone.extend( fwd );
  Drone.extend( back );
  Drone.extend( up );
  Drone.extend( down );
};

