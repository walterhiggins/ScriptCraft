'use strict';
/*global require*/
var Drone = require('./drone').Drone;
/************************************************************************
### Copy & Paste using Drone

A drone can be used to copy and paste areas of the game world.

### Drone.copy() method

Copies an area so it can be pasted elsewhere. The name can be used for
pasting the copied area elsewhere...

#### Parameters

 * name - the name to be given to the copied area (used by `paste`)
 * width - the width of the area to copy
 * height - the height of the area to copy
 * length - the length of the area (extending away from the drone) to copy

#### Example

    drone.copy('somethingCool',10,5,10 ).right(12 ).paste('somethingCool' );

### Drone.paste() method

Pastes a copied area to the current location.

#### Example

To copy a 10x5x10 area (using the drone's coordinates as the starting
point) into memory.  the copied area can be referenced using the name
'somethingCool'. The drone moves 12 blocks right then pastes the copy.

    drone.copy('somethingCool',10,5,10 )
         .right(12 )
         .paste('somethingCool' );

***/
function paste( name, immediate )
{
  var ccContent = Drone.clipBoard[name];
  if (ccContent == undefined){
    console.warn('Nothing called ' + name + ' in clipboard!');
    return;
  }
  var srcBlocks = ccContent.blocks;
  var srcDir = ccContent.dir; // direction player was facing when copied.
  var dirOffset = (4 + (this.dir - srcDir ) ) %4;

  this.traverseWidth(srcBlocks.length,function( ww ) { 
    var h = srcBlocks[ww].length;
    this.traverseHeight(h,function( hh ) { 
      var d = srcBlocks[ww][hh].length;
      this.traverseDepth(d,function( dd ) { 
        var b = srcBlocks[ww][hh][dd],
            cb = b.type,
            md = b.data,
	    newDir,
	    dir,
	    a,
	    len;
        //
        // need to adjust blocks which face a direction
        //
        switch ( cb ) {
          // 
          // doors
          //
          case 64: // wood
          case 71: // iron
            // top half of door doesn't need to change
            if ( md < 8 ) {
              md = (md + dirOffset ) % 4;
            }
            break;
          //
          // stairs
          //
          case 53:  // oak 
          case 67:  // cobblestone 
          case 108: // red brick 
          case 109: // stone brick 
          case 114: // nether brick
          case 128: // sandstone
          case 134: // spruce
          case 135: // birch
          case 136: // junglewood
            dir = md & 0x3;
            a = Drone.PLAYER_STAIRS_FACING;
            len = a.length;
            for ( var c=0;c < len;c++ ) { 
              if ( a[c] == dir ) { 
                break;
              }
            }
            c = (c + dirOffset ) %4;
            newDir = a[c];
            md = (md >>2<<2 ) + newDir;
            break;
          //
          // signs , ladders etc
          //
          case 23: // dispenser
          case 54: // chest
          case 61: // furnace
          case 62: // burning furnace
          case 65: // ladder
          case 68: // wall sign
            a = Drone.PLAYER_SIGN_FACING;
            len = a.length;
            for ( var c=0;c < len;c++ ) { 
              if ( a[c] == md ) { 
                break;
              }
            }
            c = (c + dirOffset ) %4;
            newDir = a[c];
            md = newDir;
            break;
          }
	  this.setBlock(cb,md);
      } );
    } );
  } );
}
function copy( name, w, h, d ) {
  var ccContent = [];
  this.traverseWidth(w,function( ww ) { 
    ccContent.push([] );
    this.traverseHeight(h,function( hh ) { 
      ccContent[ww].push([] );
      this.traverseDepth(d,function( dd ) { 
        var b = this.getBlock();
        ccContent[ww][hh][dd] = {type:b.getTypeId(), data:b.data};
      } );
    } );
  } );
  Drone.clipBoard[name] = {dir: this.dir, blocks: ccContent};
}
Drone.clipBoard = {};
Drone.extend( copy );
Drone.extend( paste );
