var fireworks = require('fireworks');
var Drone = require('./drone').Drone;
Drone.extend('firework',function() {
    fireworks.firework(this.getLocation());
});

