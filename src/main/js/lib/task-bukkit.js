'use strict';
/*global __plugin, module, server*/
function bukkitSetTimeout(callback, delayInMillis) {
  var delay = Math.ceil(delayInMillis / 50);

  // This does not work, as GraalJS does not enable picking the specific runTaskLater()
  // overloaded funciton out of the different possibilities as Nashorn does
  // (see https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/prog_guide/javascript.html and
  // https://www.gitmemory.com/issue/graalvm/graaljs/37/739925131
  // In principle, GraalJS should support this method but at least in GraalJS 21.2.0 this is not working.
  // Reverting to work-around as per https://github.com/walterhiggins/ScriptCraft/issues/396
  //
//  var task = server.scheduler[
//    'runTaskLater(org.bukkit.plugin.Plugin, java.lang.Runnable ,long)'
//  ](__plugin, callback, delay);
  var Run = Java.type('java.lang.Runnable');
  var MyRun = Java.extend(Run, {
    run: callback
  });
  var task = server.scheduler.runTaskLater(__plugin, new MyRun(), delay);

  return task;
}
function bukkitClearTimeout(task) {
  task.cancel();
}
function bukkitSetInterval(callback, intervalInMillis) {
  var delay = Math.ceil(intervalInMillis / 50);
  // See comment in bukkitSetTimeout()
//  var task = server.scheduler[
//    'runTaskTimer(org.bukkit.plugin.Plugin, java.lang.Runnable ,long, long)'
//  ](__plugin, callback, delay, delay);
  var Run = Java.type('java.lang.Runnable');
  var MyRun = Java.extend(Run, {
    run: callback
  });
  var task = server.scheduler.runTaskTimer(__plugin, new MyRun(), delay, delay);

  return task;
}
function bukkitClearInterval(bukkitTask) {
  bukkitTask.cancel();
}
module.exports = function($) {
  $.setTimeout = bukkitSetTimeout;
  $.clearTimeout = bukkitClearTimeout;
  $.setInterval = bukkitSetInterval;
  $.clearInterval = bukkitClearInterval;
};
