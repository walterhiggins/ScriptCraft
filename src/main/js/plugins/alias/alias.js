'use strict';
/*************************************************************************
## alias Plugin

The alias module lets players and server admins create their own
per-player or global custom in-game command aliases.

### Examples

To set a command alias which is only visible to the current player
(per-player alias)...

    /jsp alias set cw = time set {1} ; weather {2}

... Creates a new custom command only usable by the player who set
it called `cw` (short for set Clock and Weather) which when invoked...

    /cw 4000 sun

... will perform the following commands...

    /time set 4000
    /weather sun

Aliases can use parameters as above. On the right hand side of the `=`, the 
`{1}` refers to the first parameter provided with the `cw` alias, `{2}`
refers to the second parameter and so on. So `cw 4000 sun` is converted to 
`time set 4000` and `weather sun`. 

To set a global command alias usable by all (only operators can create
such an alias)...

    /jsp alias global stormy = time 18000; weather storm

To remove an alias ...

    /jsp alias remove cw

... removes the 'cw' alias from the appropriate alias map.

To get a list of aliases currently defined...

    /jsp alias list

To get help on the `jsp alias` command:

    /jsp alias help

Aliases can be used at the in-game prompt by players or in the server
console.  Aliases will not be able to avail of command autocompletion
(pressing the TAB key will have no effect).

***/

var _usage = '\
/jsp alias set {alias} = {comand-1} ;{command-2}\n \
/jsp alias global {alias} = {command-1} ; {command-2}\n \
/jsp alias list\n \
/jsp alias remove {alias}\n \
Create a new alias : \n \
/jsp alias set cw = time set {1} ; weather {2}\n \
Execute the alias : \n \
/cw 4000 sun \n \
...is the same as \'/time set 4000\' and \'/weather sun\'';
/*
  persist aliases
*/
var _store = {
  players: {},
  global: {}
};
/*
  turns 'cw = time set {1} ; weather {2}' into {cmd: 'cw', aliases: ['time set {1}', 'weather {2}']}
  _processParams is a private function which takes an array of parameters
  used for the 'set' and 'global' options.
*/
var _processParams = function( params ) {
  var paramStr = params.join(' '),
    eqPos = paramStr.indexOf('='),
    aliasCmd = paramStr.substring( 0, eqPos).trim(),
    aliasValue = paramStr.substring( eqPos + 1 ).trim();
  return { 
    cmd: aliasCmd, 
    aliases: aliasValue.split( /\s*;\s*/ ) 
  };
};

var _set = function( params, player ) {
  var playerAliases = _store.players[player.name];
  if (!playerAliases ) {
    playerAliases = {};
  }
  var o = _processParams( params );
  playerAliases[o.cmd] = o.aliases;
  _store.players[player.name] = playerAliases;
  echo( player, 'Alias ' + o.cmd + ' created.' );
};

var _remove = function( params, player ) {
  if ( _store.players[player.name] && _store.players[player.name][ params[0] ] ) {
    delete _store.players[player.name][params[0]];
    echo( player, 'Alias ' + params[0] + ' removed.' );
  }
  else{
    echo( player, 'Alias ' + params[0] + ' does not exist.' );
  }
  if ( isOp(player) ) {
    if ( _store.global[params[0]] ) {
      delete _store.global[params[0]];
    }
  }
};

var _global = function( params, player ) {
  if ( !isOp(player) ) {
    echo( player, 'Only operators can set global aliases. ' + 
      'You need to be an operator to perform this command.' );
    return;
  }
  var o = _processParams( params );
  _store.global[o.cmd] = o.aliases;
  echo( player, 'Global alias ' + o.cmd + ' created.' );
};

var _list = function( params, player ) {
  var alias = 0;
  try { 
    if ( _store.players[player.name] ) {
      echo( player, 'Your aliases:');
      for ( alias in _store.players[player.name] ) {
        echo( player, alias + ' = ' + 
              JSON.stringify( _store.players[player.name][alias] ) );
      }
    } else {
      echo( player, 'You have no player-specific aliases.' );
    }
    echo( player, 'Global aliases:' );
    for ( alias in _store.global ) {
      echo( player, alias + ' = ' + JSON.stringify( _store.global[alias] ) );
    }
  } catch( e ) {
    console.error( 'Error in list function: ' + e.message );
    throw e;
  }
};
var _help = function( params, player ) {
  echo( player, 'Usage:\n' + _usage );
};

var alias = plugin( 'alias', {
  store:  _store,
  set:    _set,
  global: _global,
  remove: _remove,
  list:   _list,
  help:   _help
}, true );

command( 'alias', function(  params, invoker ) {
  var operation = params[0], 
    fn;
  if ( !operation ) {
    echo( invoker, 'Usage:\n' + _usage );
    return;
  }
  /*
   wph 20140122 this is kind of dumb but Nashorn has some serious problems 
   accessing object properties by array index notation
   in JRE8 alias[operation] returns null - definitely a bug in Nashorn.
   */
  for ( var key in alias ) {
    if ( key == operation ) {
      fn = alias[key];
      fn( params.slice(1), invoker );
      return;
    }
  }
  echo( invoker, 'Usage:\n' + _usage );
});

var _intercept = function( msg, invoker, exec ) {
  if ( msg.trim().length == 0 )
    return false;
  var msgParts = msg.split(' '),
    command = msg.match( /^\/*([^\s]+)/ )[1],
    template = [], 
    isAlias = false, 
    cmds = [],
    filledinCommand,
    i;
  
  if ( _store.global[command] ) {
    template = _store.global[command];
    isAlias = true;
  }
  /*
   allows player-specific aliases to override global aliases
   */
  if ( _store.players[invoker] && _store.players[invoker][command] ) {
    template = _store.players[invoker][command];
    isAlias = true;
  }
  for ( i = 0; i < template.length; i++) {
    filledinCommand = template[i].replace( /{([0-9]+)}/g, function( match, index ) { 
      index = parseInt( index, 10 );
      if ( msgParts[index] ) {
        return msgParts[index];
      } else {
        return match;
      }
    });
    cmds.push( filledinCommand );
  }
  
  for (i = 0; i< cmds.length; i++ ) {
    exec( cmds[i] );
  }
  return isAlias;

};
/*
  Intercept all command processing and replace with aliased commands if the 
  command about to be issued matches an alias.
*/
if (__plugin.canary){
  console.warn('alias plugin is not yet supported in CanaryMod');
  return;
}
events.playerCommandPreprocess( function( evt ) {
  var invoker = evt.player;
  var exec = function( cmd ) { 
    invoker.performCommand(cmd);
  };
  var isAlias = _intercept( (''+evt.message).trim(), ''+invoker.name, exec);
  if ( isAlias ) {
    evt.cancelled = true;
  }
});
/* define a 'void' command because ServerCommandEvent can't be canceled */
command('void',function(  ) {
} );

events.serverCommand( function( evt ) {
  var invoker = evt.sender;
  var exec = function( cmd ) { 
    invoker.server.dispatchCommand( invoker, cmd); 
  };
  var isAlias = _intercept( (''+evt.command).trim(), ''+ invoker.name, exec );
  if ( isAlias ) {
    evt.command = 'jsp void';
  }
});
