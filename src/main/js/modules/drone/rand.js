'use strict';
/*global require, module*/
/************************************************************************
### Drone.rand() method

rand takes either an array (if each blockid has the same chance of occurring) or an object where each property is a blockid and the value is it's weight (an integer)

#### Example

place random blocks stone, mossy stone and cracked stone (each block has the same chance of being picked)

    rand( [blocks.brick.stone, blocks.brick.mossy, blocks.brick.cracked ],w,d,h) 

to place random blocks stone has a 50% chance of being picked, 

    var distribution = {};
    distribution[ blocks.brick.stone ] = 5;
    distribution[ blocks.brick.mossy ] = 3;
    distribution[ blocks.brick.cracked ] = 2;

    rand( distribution, width, height, depth) 

regular stone has a 50% chance, mossy stone has a 30% chance and cracked stone has just a 20% chance of being picked.

***/
//
// standard fisher-yates shuffle algorithm
//
function fisherYates(  myArray  ) {
  var i = myArray.length;
  if (  i == 0 ) return false;
  while ( --i ) {
    var j = Math.floor( Math.random( ) * ( i + 1 ) );
    var tempi = myArray[i];
    var tempj = myArray[j];
    myArray[i] = tempj;
    myArray[j] = tempi;
  }
}
function _rand( blockDistribution ) { 
  if ( !(blockDistribution.constructor == Array ) ) { 
    var a = [];
    for ( var p in blockDistribution ) { 
      var n = blockDistribution[p];
      for ( var i = 0;i < n;i++ ) { 
        a.push(p );
      }
    }
    blockDistribution = a;
  }
  while ( blockDistribution.length < 1000 ) { 
    // make array bigger so that it's more random
    blockDistribution = blockDistribution.concat(blockDistribution );
  }
  fisherYates(blockDistribution );
  return blockDistribution;
}
function rand( dist, width, height, depth, overwrite ) { 
  if ( typeof overwrite == 'undefined' ) { 
    overwrite = true;
  }
  var randomized = _rand( dist );
  this.boxa( randomized, width, height, depth, overwrite);
}
module.exports = function(Drone){
  Drone.extend( rand );
};
