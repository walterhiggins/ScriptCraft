'use strict';
var spawnFn = require('spawn'),
  Drone = require('drone')
    ;
function spawn(entityType){
  spawnFn(entityType, this.getBlock().location);
}
Drone.extend(spawn);
