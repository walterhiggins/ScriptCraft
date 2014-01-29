var Drone = require('../drone').Drone;
var blocks = require('blocks');

/**
* Creates a tile pattern of given block types and size
*
* Paramters:
*  whiteBlock - blockId used for the traditional white portion of the chessboard
*  blackBlock - blockId used for the traditional black portion of the chessboard
*  width - width of the chessboard
*  height - height of the chessboard
*/
Drone.extend('chessboard', function( whiteBlock, blackBlock, width, depth ) {
  var i, 
    j,
    block;

  this.chkpt('chessboard-start');

  if ( typeof whiteBlock == 'undefined' ) {
    whiteBlock = blocks.wool.white;
  }
  if ( typeof blackBlock == 'undefined' ) {
    blackBlock = blocks.wool.black;
  }
  if ( typeof width == 'undefined' ) {
    width = 8;
  }
  if ( typeof depth == 'undefined' ) {
    depth = width;
  }
  var wb = [ blackBlock, whiteBlock ];
  for ( i = 0; i < depth; i++ ) { 
    this.boxa( wb, width, 1, 1).fwd();
    wb = wb.reverse();
  }
  return this.move('chessboard-start');
});
