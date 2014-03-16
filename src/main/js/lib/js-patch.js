
module.exports = function( $ ) {

  // wph 20140105 trim not availabe in String on Mac OS.
  if ( typeof String.prototype.trim == 'undefined' ) {
    String.prototype.trim = function( ) {
      return this.replace( /^\s+|\s+$/g, '' );
    };
  }

  // wph 20140316 Java 1.6.0_65 on mac does not have Function.prototype.bind
  // code from http://webreflection.blogspot.ie/2010/02/functionprototypebind.html
  if (typeof Function.prototype.bind == 'undefined' ) { 
    Function.prototype.bind = (function (slice){
      // (C) WebReflection - Mit Style License
      function bind(context) {
	var self = this; // "trapped" function reference
	// only if there is more than an argument
        // we are interested into more complex operations
        // this will speed up common bind creation
        // avoiding useless slices over arguments
	if (1 < arguments.length) {
	  // extra arguments to send by default
          var $arguments = slice.call(arguments, 1);
          return function () {
            return self.apply(
              context,
              // thanks @kangax for this suggestion
              arguments.length ?
              // concat arguments with those received
              $arguments.concat(slice.call(arguments)) :
              // send just arguments, no concat, no slice
              $arguments
            );
          };
        }
	// optimized callback
	return function () {
          // speed up when function is called without arguments
          return arguments.length ? self.apply(context, arguments) : self.call(context);
        };
      }
      // the named function
      return bind;
    }(Array.prototype.slice));
  }
  $.setTimeout = function( callback, delayInMillis ) {
    /*
     javascript programmers familiar with setTimeout know that it expects
     a delay in milliseconds. However, bukkit's scheduler expects a delay in ticks 
     (where 1 tick = 1/20th second)
     */
    var bukkitTask = server.scheduler.runTaskLater( __plugin, callback, Math.ceil( delayInMillis / 50 ) );
    return bukkitTask;
  };

  $.clearTimeout = function( bukkitTask ) {
    bukkitTask.cancel();
  };
    
  $.setInterval = function( callback, intervalInMillis ) {
    var delay = Math.ceil( intervalInMillis / 50);
    var bukkitTask = server.scheduler.runTaskTimer( __plugin, callback, delay, delay );
    return bukkitTask;
  };

  $.clearInterval = function( bukkitTask ) {
    bukkitTask.cancel();
  };

};

