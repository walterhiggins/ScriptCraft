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
of console uses the Bukkit Plugin [Logger][lgr] under the hood and
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
[strfmt]: http://docs.oracle.com/javase/6/docs/api/java/lang/String.html#format(java.lang.String, java.lang.Object...)
[webcons]: https://developer.mozilla.org/en-US/docs/Web/API/console

***/
var logger = __plugin.logger;
var argsToArray = function(args){
    var result = [];
    for (var i =0;i < args.length; i++)
        result.push(args[i]);
    return result;
}
var log = function(level, restOfArgs){
    var args = argsToArray(restOfArgs);
    if (args.length > 1){
        var msg = java.lang.String.format(args[0],args.slice(1));
        logger['log(java.util.logging.Level,java.lang.String)'](level,msg);
    }else{
        logger['log(java.util.logging.Level,java.lang.String)'](level, args[0]);
    }
};

var Level = java.util.logging.Level;

exports.log = function(){
    log(Level.INFO, arguments);
};

exports.info = function(){
    log(Level.INFO, arguments);
}
exports.warn = function(){
    log(Level.WARNING, arguments);
};
exports.error = function(){
    log(Level.SEVERE, arguments);
};
