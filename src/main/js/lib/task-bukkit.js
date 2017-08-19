'use strict';
/*global __plugin, module, server*/
/*
 JavaScript programmers familiar with setTimeout know that it expects
 a delay in milliseconds. However, Minecraft's scheduler expects a delay in ticks 
 (where 1 tick = 1/20th second)
 */
function bukkitSetTimeout(callback, delayInMillis) {
    var delay = Math.ceil(delayInMillis / 50);
    var task = server.scheduler.runTaskLater(__plugin, callback, delay);
    return task;
}
function bukkitClearTimeout(task) {
    task.cancel();
}
function bukkitSetInterval(callback, intervalInMillis) {
    var delay = Math.ceil(intervalInMillis / 50);
    var task = server.scheduler.runTaskTimer(__plugin, callback, delay, delay);
    return task;
}
function bukkitClearInterval(bukkitTask) {
    bukkitTask.cancel();
}
module.exports = function ($) {
    $.setTimeout = bukkitSetTimeout;
    $.clearTimeout = bukkitClearTimeout;
    $.setInterval = bukkitSetInterval;
    $.clearInterval = bukkitClearInterval;
};
