'use strict';
/*global require, echo,__plugin, module*/
var blocks = require('blocks');
/************************************************************************
### Drone.wallsign() method

Creates a wall sign (A sign attached to a wall)

#### Parameters

 * message - can be a string or an array of strings

#### Example

    drone.wallsign(['Welcome','to','Scriptopia']);

![wall sign](img/signex2.png)

### Drone.signpost() method

Creates a free-standing signpost 

#### Parameters

 * message - can be a string or an array of strings

#### Example

    drone.signpost(['Hello','World']);

![ground sign](img/signex1.png)

### Drone.sign() method

Deprecated: Use signpost() or wallsign() methods instead.

Signs must use block 63 (stand-alone signs) or 68 (signs on walls)

#### Parameters

 * message -  can be a string or an array of strings. 
 * block - can be 63 or 68

#### Example

To create a free-standing sign...

    drone.sign(["Hello","World"], blocks.sign_post);

![ground sign](img/signex1.png)

... to create a wall mounted sign...

    drone.sign(["Welcome","to","Scriptopia"], blocks.sign );

![wall sign](img/signex2.png)

***/
function putSign( drone, texts, blockId, meta ) {
  var i,
    len = texts.length,
    block,
    isSign, 
    setLine;

  if ( blockId != blocks.sign_post && blockId != blocks.sign ) {
    throw new Error( 'Invalid Parameter: blockId must be blocks.sign_post or blocks.sign' );
  }
  block = drone.setBlock( blockId, meta);
  if (__plugin.canary){
    isSign = function(block){ 
      var sign = block.getTileEntity();
      return sign.setTextOnLine; 
    };
    setLine = function( block, i) { 
      var sign = block.getTileEntity();
      sign.setTextOnLine( texts[i], i ); 
      sign.update(); 
    };
  }
  if (__plugin.bukkit){
    isSign = function(block){ return block.state && block.state.setLine; };
    setLine = function( block, i) { 
      var sign = block.state;
      sign.setLine( i, texts[i] ); 
      sign.update(true); 
    };
  }
  if ( isSign(block) ) { 
    if (len > 4){
      len = 4;
    }
    for ( i = 0; i < len; i++ ) {
      setLine(block, i, texts[ i ] );
    }
  }
}
function signpost( message ){
  this.then(function(){
    this.sign(message, blocks.sign_post);
  });
}
function wallsign( message ){
  /*
   must allow for /js wallsign() while looking at a wall block
   */
  this.then(function(){
    var block = this.getBlock();
    if (block.typeId == blocks.air || block.typeId == blocks.sign){
      this.sign(message, blocks.sign);
    } else {
      this
        .back()
        .sign(message, blocks.sign)
        .fwd();
    }
  });
  
}
function sign( message, block ) {
  if ( message.constructor != Array ) {
    message = [message];
  }
  var bm = this.getBlockIdAndMeta( block );
  block = bm[0];
  var meta = bm[1];
  if ( block !== blocks.sign_post && block !== blocks.sign ) {
    var usage = 'Usage: sign("message", blocks.sign_post) or sign("message", blocks.sign)';
    if ( this.player ) {
      echo( this.player, usage);
    }
    console.error(usage);
    return;
  }
  putSign( this, message, block,  meta);

}
module.exports = function(Drone){
  Drone.extend(sign);
  Drone.extend(signpost);
  Drone.extend(wallsign);
};
