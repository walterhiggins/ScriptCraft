'use strict';
/*global __plugin, module, server*/
function bukkitSetTimeout( callback, delayInMillis ){
  var delay = Math.ceil( delayInMillis / 50 );
  var task = server.scheduler.runTaskLater( __plugin, callback, delay );
  return task;
}
function bukkitClearTimeout( task ) {
  task.cancel();
}
function bukkitSetInterval( callback, intervalInMillis ) {
  var delay = Math.ceil( intervalInMillis / 50);
  var task = server.scheduler.runTaskTimer( __plugin, callback, delay, delay );
  return task;
}
function bukkitClearInterval( bukkitTask ) {
  bukkitTask.cancel();
}
module.exports = function($){
  $.setTimeout = bukkitSetTimeout;
  $.clearTimeout = bukkitClearTimeout;
  $.setInterval = bukkitSetInterval;
  $.clearInterval = bukkitClearInterval;
};
