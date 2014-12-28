'use strict';
/*global require, __plugin, org*/
var Drone = require('../drone').Drone,
    bkMaterial = org.bukkit.Material,
    blocks = require('blocks');

function canHang( block ) {

  if (__plugin.bukkit){
    if ( block.type.equals(bkMaterial.AIR) ||
	 block.type.equals(bkMaterial.VINE) ) {
      return true;
    } 
  }
  if (__plugin.canary){
    if (block.typeId == blocks.air || 
	block.typeid == blocks.vines ) {
	return true;
    }
  }
  return false;
}  
function hangtorch() { 
  var torch = '50:' + Drone.PLAYER_TORCH_FACING[this.dir];
  var moves = 0;
  var block = this.getBlock();

  while ( !canHang(block) ){

    moves++;
    this.back();
    if (moves == 10){
      this
	.fwd(moves);
      console.log('nowhere to hang torch');
      return;
    }
    block = this.getBlock();
  }
  this
    .box(torch)
    .fwd(moves);
}
Drone.extend(hangtorch);
