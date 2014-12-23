'use strict';
/*************************************************************************
## console global variable

ScriptCraft provides a `console` global variable with the followng methods...

 * log()  
 * info() 
 * warn()
 * error()

The ScriptCraft console methods work like the [Web API implementation][webcons].

### Example 

    console.log('Hello %s', 'world');

Basic variable substitution is supported (ScriptCraft's implementation
of console uses the Bukkit Plugin [Logger][lgr] or Canary Plugin [Logman][cmlgr] under the hood and
uses [java.lang.String.format()][strfmt] for variable
substitution. All output will be sent to the server console (not
in-game).

### Using string substitutions

ScriptCraft uses Java's [String.format()][strfmt] so any string substitution identifiers supported by 
`java.lang.String.format()` are supported (e.g. %s , %d etc).

    for (var i=0; i<5; i++) {
      console.log("Hello, %s. You've called me %d times.", "Bob", i+1);
    }

[lgr]: http://jd.bukkit.org/beta/apidocs/org/bukkit/plugin/PluginLogger.html
[cmlgr]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/logger/Logman.html
[strfmt]: http://docs.oracle.com/javase/6/docs/api/java/lang/String.html#format(java.lang.String, java.lang.Object...)
[webcons]: https://developer.mozilla.org/en-US/docs/Web/API/console

***/
function argsToArray( args ) {
  var result = [];
  for ( var i =0; i < args.length; i++ ) {
    result.push(args[i]);
  }
  return result;
}
function consMsg(params){
  var args = argsToArray(params);
  if ( args.length > 1 ) {
    return java.lang.String.format( args[0], args.slice(1) );
  } else {
    return args[0];
  }
}

module.exports = function(logger){

  function bukkitLog( level, restOfArgs ) {
    logger['log(java.util.logging.Level,java.lang.String)']( 
      java.util.logging.Level[level], 
      consMsg(restOfArgs) 
    );
  }

  if (__plugin.canary){
    return {
      log: function( ) { logger.info( consMsg(arguments) ); },
      info: function( ) { logger.info( consMsg(arguments) ); },
      warn: function( ) { logger.warn( consMsg(arguments) ); },
      error: function( ) { logger.error( consMsg(arguments) ); }
    };
  } else {
    return {
      log: function() { bukkitLog('INFO', arguments ); },
      info: function() { bukkitLog('INFO', arguments ); },
      warn: function( ) { bukkitLog('WARNING', arguments ); },
      error: function( ) { bukkitLog('SEVERE', arguments ); }
    };
  }
};
