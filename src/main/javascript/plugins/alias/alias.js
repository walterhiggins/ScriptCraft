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

Aliases can use paramters as above. On the right hand side of the `=`, the 
`{1}` refers to the first parameter provided with the `cw` alias, `{2}`
refers to the second parameter and so on. So `cw 4000 sun` is converted to 
`time set 4000` and `weather sun`. 

To set a global command alias usable by all (only operators can create
such an alias)...

    /jsp alias global stormy = time 18000; weather storm

To delete an alias ...

    /jsp alias delete cw

... deletes the 'cw' alias from the appropriate alias map.

To get a list of aliases currently defined...

    /jsp alias list

To get help on the `jsp alias` command:

    /jsp alias help

Aliases can be used at the in-game prompt by players or in the server
console.  Aliases will not be able to avail of command autocompletion
(pressing the TAB key will have no effect).

***/

var _usage = "\
/jsp alias set {alias} = {comand-1} ;{command-2}\n \
/jsp alias global {alias} = {command-1} ; {command-2}\n \
/jsp alias list\n \
/jsp alias delete {alias}\n \
Create a new alias : \n \
/jsp alias set cw = time set {1} ; weather {2}\n \
Execute the alias : \n \
/cw 4000 sun \n \
...is the same as '/time set 4000' and '/weather sun'";
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
var _processParams = function(params){
    var paramStr = params.join(' ');
    var eqPos = paramStr.indexOf('=');
    var aliasCmd = paramStr.substring(0,eqPos).trim();
    var aliasValue = paramStr.substring(eqPos+1).trim();
    return { cmd: aliasCmd, aliases: aliasValue.split(/\s*;\s*/) };
};

var _set = function(player, params){
    var playerAliases = _store.players[player.name];
    if (!playerAliases){
        playerAliases = {};
    }
    var o = _processParams(params);
    playerAliases[o.cmd] = o.aliases;
    _store.players[player.name] = playerAliases;
    player.sendMessage("Alias '" + o.cmd + "' created.");
};

var _delete = function(player, params){
    if (_store.players[player.name] &&
        _store.players[player.name][params[0]]){
        delete _store.players[player.name][params[0]];
        player.sendMessage("Alias '" + params[0] + "' deleted.");
    }
    else{
        player.sendMessage("Alias '" + params[0] + "' does not exist.");
    }
    if (player.op){
        if (_store.global[params[0]])
            delete _store.global[params[0]];
    }
};

var _global = function(player, params){
    if (!player.op){
        player.sendMessage("Only operators can set global aliases. " + 
                           "You need to be an operator to perform this command.");
        return;
    }
    var o = _processParams(params);
    _store.global[o.cmd] = o.aliases;
    player.sendMessage("Global alias '" + o.cmd + "' created.");
};

var _list = function(player){
    try { 
        var alias = 0;
        if (_store.players[player.name]){
            player.sendMessage("Your aliases:");
            for (alias in _store.players[player.name]){
                player.sendMessage(alias + " = " + 
                                   JSON.stringify(_store.players[player.name][alias]));
            }
        }else{
            player.sendMessage("You have no player-specific aliases.");
        }
        player.sendMessage("Global aliases:");
        for (alias in _store.global){
            player.sendMessage(alias + " = " + JSON.stringify(_store.global[alias]) );
        }
    }catch(e){
        console.error("Error in list function: " + e.message);
        throw e;
    }
};
var alias = plugin('alias', {
    "store":  _store,
    "set":    _set,
    "global": _global,
    "delete": _delete,
    "list":   _list,
    "help":   function(player){ player.sendMessage("Usage:\n" + _usage);}
}, true );


var aliasCmd = command('alias', function(params,invoker){
    var operation = params[0];
    if (!operation){
        invoker.sendMessage("Usage:\n" + _usage);
        return;
    }
    if (alias[operation])
        alias[operation](invoker, params.slice(1));
    else
        invoker.sendMessage("Usage:\n" + _usage);
});

var _intercept = function( msg, invoker, exec)
{
    if (msg.trim().length == 0)
        return false;
    var msgParts = msg.split(' ');
    var command = msg.match(/^\/*([^\s]+)/)[1];

    var template = [], isAlias = false, cmds = [];
    
    if (_store.global[command]){
        template = _store.global[command];
        isAlias = true;
    }else{
        if (config.verbose){
            var commandObj = server.commandMap.getCommand(command);
            if (!commandObj)
                console.info("No global alias found for command: " + command);
        }
    }
    /*
      allows player-specific aliases to override global aliases
     */
    if (_store.players[invoker] &&
        _store.players[invoker][command])
    {
        template = _store.players[invoker][command];
        isAlias = true;
    }else{
        if (config.verbose){
            var commandObj = server.commandMap.getCommand(command);
            if (!commandObj)
                console.info("No player alias found for command: " + command);
        }
    }
    for (var i = 0;i < template.length; i++)
    {
        var filledinCommand = template[i].replace(/{([0-9]+)}/g, function (match,index){ 
            index = parseInt(index,10);
            if (msgParts[index])
                return msgParts[index]
            else
                return match;
        });
        cmds.push(filledinCommand);
    }
    
    for (var i = 0; i< cmds.length; i++){
        exec(cmds[i]);
    }
    return isAlias;

};
/*
  Intercept all command processing and replace with aliased commands if the 
  command about to be issued matches an alias.
*/
events.on('player.PlayerCommandPreprocessEvent', function(listener,evt){
    var invoker = evt.player;
    var exec = function(cmd){ invoker.performCommand(cmd);};
    var isAlias = _intercept(''+evt.message, ''+invoker.name, exec);
    if (isAlias)
        evt.cancelled = true;

});
/* define a 'void' command because ServerCommandEvent can't be canceled */
command('void',function(){});
events.on('server.ServerCommandEvent', function(listener,evt){
    var invoker = evt.sender;
    var exec = function(cmd){ invoker.server.dispatchCommand(invoker, cmd); };
    var isAlias = _intercept(''+evt.command, ''+ invoker.name, exec);
    if (isAlias)
        evt.command = "jsp void";
});
