var signs = require('signs');
//
// Usage:
// 
// In game, create a sign , target it and type ...
//
// /js signs.menu_food(); 
//
// ... or ...
//
// /js signs.menu_time()
//

var onDinnerChoice = function(event){
  echo( event.player, 'You chose ' + event.text);
};
var convertToDinnerMenu = signs.menu('Dinner', 
  ['Lamb','Pork','Chicken','Duck','Beef'], 
  onDinnerChoice);

var onTimeChoice = function(event){
  event.player.location.world.setTime( event.number * 6000 );
};
var convertToTimeMenu = signs.menu('Time', ['Dawn','Midday','Dusk','Midnight'], onTimeChoice);

exports.signs = {
  menu_food:  function(cmdSender){
    var sign = signs.getTargetedBy(cmdSender);
    if (!sign){
      throw new Error('You must look at an existing sign');
    }
    convertToDinnerMenu(sign);
  },
  //
  // This is an example sign that displays a menu of times of day
  // interacting with the sign will change the time of day accordingly.
  //
  // In game, create a sign , target it and type ...
  //
  // /js var signExamples = require('./signs/examples');
  // /js signExamples.timeOfDay()
  //
  menu_time:  function(cmdSender){
    var sign = signs.getTargetedBy(cmdSender);
    if (!sign){
      throw new Error('You must look at an existing sign');
    }
    convertToTimeMenu(sign);
  }
};

