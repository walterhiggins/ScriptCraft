'use strict';
var blocks = require('blocks');
/************************************************************************
### Drone.bed() method

Creates a bed. The foot of the bed will be at the drone's location and
the head of the bed will extend away from the drone.

#### Example
To create a bed at the in-game prompt, look at a block then type:

```javascript
/js bed()
```

Like most Drone methods, this returns the drone so it can be chained like so:

```javascript
this
  .fwd(3)
  .bed()
  .back(3)
```     
***/
var bedDirections = {
  0:3, // east
  1:0, // south
  2:1, // west
  3:2  // north
};
module.exports = function(Drone){

  Drone.extend( function bed(){
    this.then(function(){
      var foot = this.setBlock(blocks.bed, bedDirections[this.dir], 0,0,0, false);
      var head = this.setBlock(blocks.bed, bedDirections[this.dir] + 8, 0,0,1, false);
      if (Drone.bountiful){
        var prop = require('blockhelper').property;
        var BedHalf = Packages.net.canarymod.api.world.blocks.properties.helpers.BedProperties.Half;
        prop(foot)
          .set('facing',this.dir)
          .set('part', BedHalf.FOOT);
        prop(head)
          .set('facing',this.dir)
          .set('part', BedHalf.HEAD);
      }
      if (__plugin.canary){
        foot.update();
        head.update();
      }
    });
  });
};

