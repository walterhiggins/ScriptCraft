'use strict';
/*global require*/
var Drone = require('drone'),
  blocks = require('blocks');

/************************************************************************
### Drone.rainbow() method

Creates a Rainbow.

#### Parameters

 * radius (optional - default:18) - The radius of the rainbow

#### Example

At the in-game prompt you can create a rainbow by looking at a block and typing:
```javascript
/js rainbow()
```

Alternatively you can create a new Drone object from a Player or Location object and call the rainbow() method.

```javascript    
var d = new Drone(player);
d.rainbow(30);
```

![rainbow example](img/rainbowex1.png)

***/
function rainbow( radius ) {
  var i,
    colors,
    bm;
  
  if ( typeof radius == 'undefined' ) {
    radius = 18;
  }
  
  this.chkpt('rainbow');
  this.down(radius);
  // copy blocks.rainbow and add air at end (to compensate for strokewidth)
  colors = blocks.rainbow.slice(0);
  colors.push(blocks.air);
  for ( i = 0; i < colors.length; i++ ) {
    bm = this.getBlockIdAndMeta( colors[i] );
    this.arc({
      blockType: bm[0],
      meta: bm[1],
      radius: radius-i,
      strokeWidth: 2,
      quadrants: {topright: true,
        topleft: true},
      orientation: 'vertical'}).right().up();
  }
  return this.move('rainbow');
}
Drone.extend(rainbow);
