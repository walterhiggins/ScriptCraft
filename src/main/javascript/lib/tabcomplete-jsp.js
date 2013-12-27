var _commands = require('plugin').commands;
/*
  Tab completion for the /jsp commmand
*/
var __onTabCompleteJSP = function() {
    var result = global.__onTC_result;
    var args = global.__onTC_args;
    var cmdInput = args[0];
    var cmd = _commands[cmdInput];
    if (cmd){
        var opts = cmd.options;
        var len = opts.length;
        if (args.length == 1){
            for (var i = 0;i < len; i++)
                result.add(opts[i]);
        }else{
            // partial e.g. /jsp chat_color dar
            for (var i = 0;i < len; i++){
                if (opts[i].indexOf(args[1]) == 0){
                    result.add(opts[i]);
                }
            }
        }
    }else{
        if (args.length == 0){
            for (var i in _commands)
                result.add(i);
        }else{
            // partial e.g. /jsp al 
            // should tabcomplete to alias 
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


