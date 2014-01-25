
module.exports = function($){

    // wph 20140105 trim not availabe in String on Mac OS.
    if (typeof String.prototype.trim == 'undefined'){
        String.prototype.trim = function(){
            return this.replace(/^\s+|\s+$/g,'');
        };
    }
    
    $.setTimeout = function( callback, delayInMillis){
        /*
          javascript programmers familiar with setTimeout know that it expects
          a delay in milliseconds. However, bukkit's scheduler expects a delay in ticks 
          (where 1 tick = 1/20th second)
        */
        var bukkitTask = server.scheduler.runTaskLater(__plugin, callback, delayInMillis/50);
        return bukkitTask;
    };
    $.clearTimeout = function(bukkitTask){
        bukkitTask.cancel();
    };
    
    $.setInterval = function(callback, intervalInMillis){
        var delay = intervalInMillis/ 50;
        var bukkitTask = server.scheduler.runTaskTimer(__plugin, callback, delay, delay);
        return bukkitTask;
    };
    $.clearInterval = function(bukkitTask){
        bukkitTask.cancel();
    };
};

