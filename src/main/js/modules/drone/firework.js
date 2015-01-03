'use strict';
/*global module, require*/
var fireworks = require('fireworks');
/*************************************************************************
### Drone.firework() method

Launches a firework at the drone's location.

#### Example

To launch a firework:

    var drone = new Drone(self);
    drone.firework();

***/
module.exports = function(Drone){
  Drone.extend( function firework( ) {
    fireworks.firework( this.getLocation() );
  });
};
