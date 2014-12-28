'use strict';
/*global require, echo,__plugin*/
var Drone = require('./drone').Drone;
/************************************************************************
### Drone.sign() method

Signs must use block 63 (stand-alone signs) or 68 (signs on walls)

#### Parameters

 * message -  can be a string or an array of strings. 
 * block - can be 63 or 68

#### Example

To create a free-standing sign...

    drone.sign(["Hello","World"],63);

![ground sign](img/signex1.png)

... to create a wall mounted sign...

    drone.sign(["Welcome","to","Scriptopia"], 68 );

![wall sign](img/signex2.png)

***/
function putSign( drone, texts, blockId, meta ) {
  var i,
    block,
    state,
    getState, 
    isSign, 
    setLine;

  if ( blockId != 63 && blockId != 68 ) {
    throw new Error( 'Invalid Parameter: blockId must be 63 or 68' );
  }
  drone.setBlock( blockId, meta);
  block = drone.getBlock();
  if (__plugin.canary){
    isSign = function(block){ 
      var sign = block.getTileEntity();
      return sign.setTextOnLine; 
    };
    setLine = function( block, i, text) { 
      var sign = block.getTileEntity();
      sign.setTextOnLine( text, i ); 
      sign.update(); 
    };
    if ( drone.bountiful ) {
      // 1.8
      var prop = require('blockhelper').property;
      prop(block).set('facing',(drone.dir+2)%4);
      block.update();
    }
  }
  if (__plugin.bukkit){
    isSign = function(block){ return block.state && block.state.setLine; };
    setLine = function( block, i, text) { 
      var sign = block.state;
      sign.setLine( i, text ); 
      sign.update(true); 
    };
  }
  if ( isSign(block) ) { 
    for ( i = 0; i < texts.length; i++ ) {
      setLine(block, i % 4, texts[ i ] );
    }
  }
};
function sign( message, block ) {
  if ( message.constructor != Array ) {
    message = [message];
  }
  var bm = this._getBlockIdAndMeta( block );
  block = bm[0];
  var meta = bm[1];
  if ( block != 63 && block != 68 ) {
    var usage = 'Usage: sign("message", "63:1") or sign("message","68:1")';
    if ( this.player ) {
      echo( this.player, usage);
    }
    console.error(usage);
    return;
  }
  if ( block == 68 ) {
    meta = Drone.PLAYER_SIGN_FACING[ this.dir % 4 ];
    this.back();
  }
  if ( block == 63 ) {
    meta = ( 12 + ( ( this.dir + 2 ) * 4 ) ) % 16;
  }
  this.then(function(){
    putSign( this, message, block, meta);
    if ( block == 68 ) {
      this.fwd();
    }
  });
}
Drone.extend(sign);
