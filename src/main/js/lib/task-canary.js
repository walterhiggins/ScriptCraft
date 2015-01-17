'use strict';
/*global Packages, __plugin, module*/
/*
 javascript programmers familiar with setTimeout know that it expects
 a delay in milliseconds. However, bukkit's scheduler expects a delay in ticks 
 (where 1 tick = 1/20th second)
 */
function canarySetTimeout( callback, delayInMillis ){
  var cmTaskManager = Packages.net.canarymod.tasks.ServerTaskManager;
  var delay = Math.ceil( delayInMillis / 50 );
  var task = __plugin.createServerTask(callback, delay, false);
  cmTaskManager.addTask(task);
  return task;
}
function canaryClearTimeout( task ){
  var cmTaskManager = Packages.net.canarymod.tasks.ServerTaskManager;
  cmTaskManager.removeTask( task );
}
function canarySetInterval( callback, intervalInMillis ) {
  var cmTaskManager = Packages.net.canarymod.tasks.ServerTaskManager;
  var delay = Math.ceil( intervalInMillis / 50 );
  var task = __plugin.createServerTask(callback, delay, true);
  cmTaskManager.addTask(task);
  return task;
}
function canaryClearInterval( task ){
  var cmTaskManager = Packages.net.canarymod.tasks.ServerTaskManager;
  cmTaskManager.removeTask( task );
}
module.exports = function($){
  $.setTimeout = canarySetTimeout;
  $.clearTimeout = canaryClearTimeout;
  $.setInterval = canarySetInterval;
  $.clearInterval = canaryClearInterval;
};
