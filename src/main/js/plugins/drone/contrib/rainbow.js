var Drone = require('../drone').Drone;
var blocks = require('blocks');

/************************************************************************
### Drone.rainbow() method

Creates a Rainbow.

#### Parameters

 * radius (optional - default:18) - The radius of the rainbow

#### Example
    
    var d = new Drone();
    d.rainbow(30);

![rainbow example](img/rainbowex1.png)

***/
function rainbow( radius ) {
  var i,
    colors,
    bm;
  
  if ( typeof radius == "undefined" ) {
    radius = 18;
  }
  
  this.chkpt('rainbow');
  this.down(radius);
  // copy blocks.rainbow and add air at end (to compensate for strokewidth)
  colors = blocks.rainbow.slice(0);
  colors.push(blocks.air);
  for ( i = 0; i < colors.length; i++ ) {
    bm = this._getBlockIdAndMeta( colors[i] );
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
