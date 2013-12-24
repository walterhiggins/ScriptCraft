var signs = require('./menu');
//
// Usage:
// 
// In game, create a sign , target it and type ...
//
// /js var signExamples = require('./signs/examples');
// /js signExamples.testMenu()
//
exports.testMenu = signs
    .menu("Dinner",
          ["Lamb","Pork","Chicken","Duck","Beef"],
          function(event){
              event.player.sendMessage("You chose " + event.text);
          });
//
// This is an example sign that displays a menu of times of day
// interacting with the sign will change the time of day accordingly.
//
// In game, create a sign , target it and type ...
//
// /js var signExamples = require('./signs/examples');
// /js signExamples.timeOfDay()
//
exports.timeOfDay = signs
    .menu("Time",
          ["Dawn","Midday","Dusk","Midnight"],
          function(event){
              event.player.location.world.setTime( event.number * 6000 );
          });


