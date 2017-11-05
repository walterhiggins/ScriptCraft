'use strict';
/*global require*/
var Drone = require('drone');

//
// usage:
// [1] to place a new block with redstone wire on it (block on bottom, redstone on top)
// /js wireblock(blocks.sandstone);
//
// [2] to drop wire on to an existing block
// /js wire()
//
// [3] to place a (redstone) torch on a new block
// /js torchblock(blocks.sandstone)
//
// [4] to place a repeater on a new block
// /js repeaterblock(blocks.sandstone)
//
// [5] To create a long redstone wire (with necessary repeaters, powererd by a single torch)
// /js wirestraight(blocks.sandstone, distance)
//
// [6] To create a 'road' with redstone torches and wire lining each side
// /js redstoneroad(blocks.stone, blocks.sandstone, 25)

Drone.extend('wireblock', function(blockType) {
  this.chkpt('wireblock')
    .box(blockType, 1, 2, 1) // 2 blocks tall, top block will be wire dropped on lower
    .up();

  this.world.getBlockAt(this.x, this.y, this.z).setTypeId(55); //apply wire

  return this.move('wireblock');
});

Drone.extend('wire', function() {
  this.chkpt('wire').up();

  this.world.getBlockAt(this.x, this.y, this.z).setTypeId(55); // apply wire

  return this.move('wire');
});

Drone.extend('torchblock', function(blockType) {
  this.box(blockType, 1, 2, 1) // 2 blocks tall
    .up();

  this.world.getBlockAt(this.x, this.y, this.z).setTypeId(76); // apply torch

  return this.down();
});

Drone.extend('repeaterblock', function(blockType) {
  this.chkpt('repeaterblock')
    .box(blockType, 1, 2, 1)
    .up();

  var block = this.world.getBlockAt(this.x, this.y, this.z);
  block.setTypeId(94); // apply repeater

  // redstone repeater dirs: north=0,east=1,south=2,west=3
  var direction = [1, 2, 3, 0][this.dir]; // convert drone dir to repeater dir.
  block.setData(direction);

  return this.move('repeaterblock');
});

Drone.extend('wirestraight', function(blockType, distance) {
  this.chkpt('wirestraight');

  this.torchblock(blockType);
  this.fwd();

  for (var i = 1; i < distance; i++) {
    if (i % 14 == 0) {
      this.repeaterblock(blockType);
    } else {
      this.wireblock(blockType);
    }

    this.fwd();
  }

  return this.move('wirestraight');
});

Drone.extend('redstoneroad', function(
  roadBlockType,
  redstoneunderBlockType,
  distance
) {
  return this.down()
    .wirestraight(redstoneunderBlockType, distance)
    .right()
    .box(roadBlockType, 4, 1, distance)
    .right(4)
    .wirestraight(redstoneunderBlockType, distance)
    .up();
});
