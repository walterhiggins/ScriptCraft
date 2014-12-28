'use strict';
/*global require,__plugin*/
/************************************************************************
### Drone Trees methods

 * oak()
 * spruce()
 * birch()
 * jungle()

#### Example

To create 4 trees in a row, point the cross-hairs at the ground then type `/js ` and ...

    up( ).oak( ).right(8 ).spruce( ).right(8 ).birch( ).right(8 ).jungle( );

Trees won't always generate unless the conditions are right. You
should use the tree methods when the drone is directly above the
ground. Trees will usually grow if the drone's current location is
occupied by Air and is directly above an area of grass (That is why
the `up()` method is called first).

![tree example](img/treeex1.png)

None of the tree methods require parameters. Tree methods will only be
successful if the tree is placed on grass in a setting where trees can
grow.

***/
var Drone = require('./drone').Drone;
var bkTreeType = org.bukkit.TreeType;
var _trees = {
  oak: bkTreeType.BIG_TREE ,
  birch: bkTreeType.BIRCH ,
  jungle: bkTreeType.JUNGLE,
  spruce: bkTreeType.REDWOOD 
};
function bukkitTreeFactory( k, v ) {
  return function( ) { 
    var block = this.getBlock();
    if ( block.typeId == 2 ) { 
      this.up( );
    }
    var treeLoc = this.getLocation();
    var successful = treeLoc.world.generateTree(treeLoc,v );
    if ( block.typeId == 2 ) { 
      this.down( );
    }
  };
}
function canaryTreeFactory( k, v ){
  return function(){
    console.log(k + ' not yet implemented.');
  };
}
for ( var p in _trees ) {
  Drone.extend(p, (__plugin.canary? canaryTreeFactory : bukkitTreeFactory) ( p, _trees[p] ) );
}
