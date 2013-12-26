/*
  A test of the commando plugin.
  Adds a new `/scriptcrafttimeofday` command with 4 possible options: Dawn, Midday, Dusk, Midnight
*/
var commando = require('./commando').commando;
var times = {
    Dawn: 0,
    Midday: 6000,
    Dusk: 12000,
    Midnight: 18000
};
commando('scriptcrafttimeofday',function(params){
    self.location.world.setTime(times[params[0]]);
},['Dawn','Midday','Dusk','Midnight']);
