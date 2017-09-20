'use strict';
/* 
   command management - allow for non-ops to execute approved javascript code.
*/
var _commands = {},
  _cmdInterceptors = [];
/*
  execute a JSP command.
*/
var executeCmd = function( args, player ) {
  var name,
    cmd,
    intercepted,
    result = null;

  if ( args.length === 0 ) {
    throw new Error('Usage: jsp command-name command-parameters');
  }
  name = args[0];
  cmd = _commands[name];
  if ( typeof cmd === 'undefined' ) {
    // it's not a global command - pass it on to interceptors
    intercepted = false;
    for ( var i = 0; i < _cmdInterceptors.length; i++ ) {
      if ( _cmdInterceptors[i]( args, player ) )
        intercepted = true;
    }
    if ( !intercepted ) {
      console.warn( 'Command %s is not recognised', name );
    }
  }else{
    try { 
      result = cmd.callback( args.slice(1), player );
    } catch ( e ) {
      console.error( 'Error while trying to execute command: ' + JSON.stringify( args ) );
      throw e;
    }
  }
  return result;
};
/*
  define a new JSP command.
*/
var defineCmd = function( name, func, options, intercepts ) {

  if ( typeof name == 'function'){
    intercepts = options;
    options = func;
    func = name;
    name = func.name;
  }
  
  if ( typeof options == 'undefined' ) {
    options = [];
  }
  _commands[name] = { callback: func, options: options };
  if ( intercepts ) {
    _cmdInterceptors.push(func);
  }
  return func;
};
exports.command = defineCmd;
exports.commands = _commands;
exports.exec = executeCmd;
