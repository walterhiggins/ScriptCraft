'use strict';
/*global require, echo,__plugin*/
var Drone = require('./drone').Drone;
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
function signpost( message ){
  this.sign(message, 63);
}
function wallsign( message ){
  this.sign(message, 68);
}
function sign( message, block ) {
  if ( message.constructor != Array ) {
    message = [message];
  }
  var bm = this._getBlockIdAndMeta( block );
  block = bm[0];
  var meta = bm[1];
  if ( block != 63 && block != 68 ) {
    var usage = 'Usage: sign("message", 63) or sign("message", 68)';
    if ( this.player ) {
      echo( this.player, usage);
    }
    console.error(usage);
    return;
  }
  this.then(function(){
    putSign( this, message, block,  meta);
  });
}
Drone.extend(sign);
Drone.extend(signpost);
Drone.extend(wallsign);
