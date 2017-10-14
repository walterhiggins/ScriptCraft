'use strict';
/*global require */
var Drone = require('drone'),
  blocks = require('blocks');
/************************************************************************
### Drone.chessboard() method

Creates a tile pattern of given block types and size

#### Parameters

 * whiteBlock - (optional: default blocks.wool.white)
 * blackBlock - (optional: default blocks.wool.black)
 * width - width of the chessboard
 * length - length of the chessboard

#### Example

At the in-game prompt you can create a chessboard by looking at a block and typing:

```javascript
/js chessboard()
```

Alternatively you can create a new Drone object from a Player or Location object and call the chessboard() method.

```javascript
var d = new Drone(player);
d.chessboard();
```
![chessboard example](img/chessboardex1.png)

***/
Drone.extend('chessboard', function( whiteBlock, blackBlock, width, depth ) {
  var i;

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
  var squares = [ blackBlock, whiteBlock ];

  this.chkpt('chessboard-start');
  for ( i = 0; i < depth; i++ ) { 
    this.boxa( squares, width, 1, 1).fwd();
    squares = squares.reverse();
  }
  this.move('chessboard-start');
});
