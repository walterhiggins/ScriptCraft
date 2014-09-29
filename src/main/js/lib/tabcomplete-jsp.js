'use strict';
var _commands = require('command').commands;
/*
  Tab completion for the /jsp commmand
*/
var __onTabCompleteJSP = function( result, cmdArgs ) {
  var cmdInput = cmdArgs[0],
    opts,
    cmd,
    len,
    i;
  cmd = _commands[cmdInput];
  if ( cmd ) {
    if (typeof cmd.options === 'function'){
      opts = cmd.options();
    } else {
      opts = cmd.options;
    }
    len = opts.length;
    if ( cmdArgs.length > 1 ) {
      // partial e.g. /jsp chat_color dar
      for ( i = 0; i < len; i++ ) {
        if ( opts[i].indexOf( cmdArgs[1] ) == 0 ) {
          result.add( opts[i] );
        }
      }
    }
  } else {
    if ( cmdArgs.length == 0 ) {
      for ( i in _commands ) { 
        result.add( i );
      }
    } else {
      // partial e.g. /jsp ho
      // should tabcomplete to home
      //
      for ( i in _commands ) {
        if ( i.indexOf( cmdInput ) == 0 ) {
          result.add( i );
        }
      }
    }
  }
  return result;
};
module.exports = __onTabCompleteJSP;


