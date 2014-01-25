'use strict';
var _commands = require('command').commands;
/*
  Tab completion for the /jsp commmand
*/
var __onTabCompleteJSP = function( result, cmdSender, pluginCmd, cmdAlias, cmdArgs) {
    var cmdInput = cmdArgs[0];
    var cmd = _commands[cmdInput];
    if (cmd){
        var opts = cmd.options;
        var len = opts.length;
        if (cmdArgs.length == 1){
            for (var i = 0;i < len; i++)
                result.add(opts[i]);
        }else{
            // partial e.g. /jsp chat_color dar
            for (var i = 0;i < len; i++){
                if (opts[i].indexOf(cmdArgs[1]) == 0){
                    result.add(opts[i]);
                }
            }
        }
    }else{
        if (cmdArgs.length == 0){
            for (var i in _commands)
                result.add(i);
        }else{
            // partial e.g. /jsp ho
            // should tabcomplete to home
            //
            for (var c in _commands){
                if (c.indexOf(cmdInput) == 0){
                    result.add(c);
                }
            }
        }
    }
    return result;
};
module.exports = __onTabCompleteJSP;


