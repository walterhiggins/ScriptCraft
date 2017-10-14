'use strict';
/*global require, __plugin, Packages, org, echo, module */
var blocks = require('blocks');
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
function bukkitTreeFactory( k, v ) {
  return function( ) { 
    var block = this.getBlock();
    if ( block.typeId == blocks.grass ) { 
      this.up( );
    }
    var treeLoc = this.getLocation();
    treeLoc.world.generateTree(treeLoc,v );
    if ( block.typeId == blocks.grass ) { 
      this.down( );
    }
  };
}
function canaryTreeFactory( k ){
  return function(){
    var block = this.getBlock();
    if ( block.typeId == blocks.grass ) { 
      this.up( );
    }
    var treeLoc = this.getLocation();
    if (!treeLoc.world.generateTree){
      var msg = k + '() is not supported in this version';
      if (this.player){
        echo(this.player, msg);
      }
      console.log(msg);
      return;
    }
    var cmTreeType = Packages.net.canarymod.api.world.TreeType;
    var trees = {
      oak: cmTreeType.BIGOAK,
      birch: cmTreeType.BIRCH,
      jungle: cmTreeType.JUNGLE,
      spruce: cmTreeType.SPRUCE
    };

    treeLoc.world.generateTree(treeLoc, trees[k] );
    if ( block.typeId == blocks.grass ) { 
      this.down( );
    }
  };
}
module.exports = function (Drone){
  var trees = {
    oak: null,
    birch: null,
    jungle: null,
    spruce: null
  };
  var p;
  if (__plugin.canary){
    for (p in trees ) {
      Drone.extend(p, canaryTreeFactory ( p, trees[p] ) );
    }
  }
  if (__plugin.bukkit){
    var bkTreeType = org.bukkit.TreeType;
    trees = {
      oak: bkTreeType.BIG_TREE ,
      birch: bkTreeType.BIRCH ,
      jungle: bkTreeType.JUNGLE,
      spruce: bkTreeType.REDWOOD 
    };
    for (p in trees ) {
      Drone.extend(p, bukkitTreeFactory ( p, trees[p] ) );
    }
  }
};

