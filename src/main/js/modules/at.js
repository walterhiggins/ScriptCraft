'use strict';
var utils = require('utils');
/************************************************************************
## The at Module

The at module provides a single function `at()` which can be used to schedule
repeating (or non-repeating) tasks to be done at a particular time. 

### at() function

The utils.at() function will perform a given task at a given time in the 
(minecraft) day.

#### Parameters

* time24hr : The time in 24hr form - e.g. 9:30 in the morning is '09:30' while 9:30 pm is '21:30', midnight is '00:00' and midday is '12:00'
* callback : A javascript function which will be invoked at the given time.
* worlds : (optional) An array of worlds. Each world has its own clock. If no array of worlds is specified, all the server's worlds are used.
* repeat : (optional) true or false, default is true (repeat the task every day)

#### Example

To warn players when night is approaching:

```javascript
var utils = require('utils'),
    at = require('at');
function warning(){
  utils.players(function( player ) {
    echo( player, 'The night is dark and full of terrors!' );
  });
}
at('19:00', warning);
```
To run a task only once at the next given time:
```javascript
var utils = require('utils'),
    at = require('at');
function wakeup(){
  utils.players(function( player ) {
    echo( player, "Wake Up Folks!" );
  });
}
at('06:00', wakeup, null, false);
```

***/
var SECOND = 1000;
var POLLING_INTERVAL = 3 * SECOND; // this is probably precise enough 

function at(time24hr, callback, pWorlds, repeat) {
  if (arguments.length === 0){
    // TODO: Document this behaviour
    console.log(tasksToString());
    return;
  }
  var timeParts = time24hr.split( ':' );
  var timeMins = (timeParts[0] * 60) + (timeParts[1] * 1);
  if (!pWorlds ||  pWorlds === undefined ) {
    pWorlds = utils.worlds();
  }
  if (repeat === undefined){
    repeat = true;
  }
  utils.foreach( pWorlds, function ( world ) {
    atAddTask( timeMins, callback, world, repeat);
  });
}
var atTasks = {};

function tasksToString(){
  var result = '';
  for (var world in atTasks){
    result += 'world: ' + world +'\n';
    for (var time in atTasks[world]){
      var scheduledFuncs = atTasks[world][time];
      for (var i = 0;i < scheduledFuncs.length; i++){
        result += ' ' + time + ': ' + scheduledFuncs[i].constructor + '\n';
      }
    }
    result += '(current world time: ' + utils.time24(world) + ')\n';
  }
  return result;
}
/*
  constructs a function which will be called every x ticks to 
  track the schedule for a given world
*/
function atMonitorFactory(world){
  var worldName = ''+ world.name;
  var lastRun = null;

  return function atMonitorForWorld(){
    var timeMins = utils.time24(world);
    if (timeMins === lastRun){
      return;
    }
    if (lastRun === null ){
      lastRun = timeMins - 1;
    }else {
      lastRun = lastRun % 1440;
    }
    var worldSchedule = atTasks[worldName];
    if (!worldSchedule){
      return;
    }
    while ( lastRun > timeMins ? (lastRun <= 1440) : ( lastRun < timeMins ) ){

      var tasks = worldSchedule[lastRun++];
      if (!tasks){
        continue;
      }
      utils.foreach(tasks, function(task, i){
        if (!task){
          return;
        }
        setTimeout(task.callback.bind(null, timeMins, world), 1);
        if (!task.repeat){
          tasks[i] = null;
        }
      });
    }
  };
}
function atAddTask( timeMins, callback, world, repeat){
  var worldName = ''+world.name;
  if (!atTasks[worldName]){
    atTasks[worldName] = {};
  }
  if (!atTasks[worldName][timeMins]){
    atTasks[worldName][timeMins] = [];
  }
  atTasks[worldName][timeMins].push({callback: callback, repeat: repeat});
}
var atMonitors = [];
function onLoadStartMonitor(event){
  var monitor = setInterval( atMonitorFactory(event.world), POLLING_INTERVAL);
  atMonitors.push( monitor );
}
if (__plugin.canary){
  events.loadWorld( onLoadStartMonitor );
}
if (__plugin.bukkit){
  events.worldLoad( onLoadStartMonitor );
}

addUnloadHandler(function(){
  utils.foreach(atMonitors, function(atInterval){
    clearInterval(atInterval);
  });
});

module.exports = at;
