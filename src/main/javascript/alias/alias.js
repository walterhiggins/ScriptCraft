plugin("alias", {
    help: function(){
        return [
            "/jsp alias set <alias> <commands> : Set a shortcut/alias for one or more commands (separated by ';')\n" + 
                "For example: '/jsp alias set sunny time set 4000; weather clear'\n" +
                "/jsp sunny (is the same as..\n/time set 4000\n/weather clear",
            "/jsp alias delete <alias> : Removes a shortcut/alias",
            "/jsp alias list : shows a list of the player's command aliases",
            "/jsp alias help : Shows this message"
        ];
    },
    set: function(player, alias, commands){
        var aliases = this.store.players;
        var name = player.name;
        if (typeof aliases[name] == "undefined")
            aliases[name] = {};
        aliases[name][alias] = commands;
    },
    remove: function(player, alias){
        var aliases = this.store.players;
        if (aliases[player.name])
            delete aliases[player.name][alias];
    },
    list: function(player){
        var result = [];
        var aliases = this.store.players[player.name];
        for (var a in aliases)
            result.push(a + " = " + aliases[a].join(";"));
        return result;
    }
},true);

if (typeof alias.store.players == "undefined")
    alias.store.players = {};

command("alias",function(params){
    /*
      this function also intercepts command options for /jsp
    */
    if (params[0] === "help"){
        self.sendMessage(alias.help());
        return;
    }
    if (params[0] === "set"){
        var aliasCmd = params[1];
        var cmdStr = params.slice(2).join(' ');
        var cmds = cmdStr.split(';');
        alias.set(self,aliasCmd,cmds);
        return;
    }
    if (params[0] === "delete"){
        alias.remove(self,params[1]);
        return ;
    }
    if (params[0] === "list"){
        self.sendMessage(alias.list(self));
        return;
    }
    if (params.length == 0)
        return self.sendMessage(alias.help());
    
    var playerHasAliases = alias.store.players[self.name];
    if (!playerHasAliases)
        return false;
    // is it an alias?
    var commands = playerHasAliases[params[0]];
    if (!commands)
        return false;
    for (var i = 0;i < commands.length; i++){
        // fill in template
        var cmd = commands[i];
        cmd = cmd.replace(/{([0-9]*)}/g,function(dummy,index){ return params[index] ? params[index] : "";})
        self.performCommand(cmd);
    }
    return true;

},["help","set","delete","list"],true);
