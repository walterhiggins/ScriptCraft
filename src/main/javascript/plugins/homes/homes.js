/*************************************************************************
## homes Plugin

The homes plugin lets players set a location as home and return to the
location, invite other players to their home and also visit other
player's homes.

This module is a good example of how to create a javascript-based
minecraft mod which provides...

 * A programmatic interface (API) and 
 * A command extension which uses that API to provide new functionality for players.

The module uses the `plugin()` function to specify an object and
methods, and the `command()` function to expose functionality to
players through a new `jsp home` command. This module also
demonstrates how to enable autocompletion for custom commands (to see
this in action, at the in-game prompt or server console prompt type
`jsp home ` then press the TAB key - you should see a list of further
possible options).

The `jsp home` command has the following options...

### Basic options

 * `/jsp home set` Will set your current location as your
   'home' location to which you can return at any time using the ...

 * `/jsp home` ..command will return you to your home, if you have set one.

 * `/jsp home <player>` Will take you to the home of <player> (where 
   <player> is the name of the player whose home you wish to visit.

 * `/jsp home delete` Deletes your home location from the location
   database. This does not actually remove the home from the world or
   change the world in any way. This command is completely
   non-destructive and cannot be used for griefing. No blocks will be
   destroyed by this command.

### Social options
The following options allow players to open their homes to all or some
players, invite players to their home and see a list of homes they can
visit.

 * `/jsp home list` Lists home which you can visit.
 * `/jsp home ilist` Lists players who can visit your home.
 * `/jsp home invite <player>` Invites the named player to your home.
 * `/jsp home uninvite <player>` Uninvites (revokes invitation) the named player to your home.
 * `/jsp home public` Opens your home to all players (all players can visit your home).
 * `/jsp home private` Makes your home private (no longer visitable by all).

### Administration options
The following administration options can only be used by server operators...

 * `/jsp home listall` List all of the homes
 * `/jsp home clear <player>` Removes the player's home
   location. Again, this command does not destroy any structures in
   the world, it simply removes the location from the database. No
   blocks are destroyed by this command.

***/
var utils = require('utils');
var _store = {
    houses: {},
    openHouses: {},
    invites: {}
};
/*
*/
var homes =  plugin("homes", { 
    help: function(){
        return [
            /* basic functions */
            "/jsp home : Return to your own home",
            "/jsp home <player> : Go to player's home",
            "/jsp home set : Set your current location as home",
            "/jsp home delete : Delete your home location",

            /* social */
            "/jsp home list : List homes you can visit",
            "/jsp home ilist : List players who can visit your home",
            "/jsp home invite <player> : Invite <player> to your home",
            "/jsp home uninvite <player> : Uninvite <player> to your home",
            "/jsp home public : Open your home to all players",
            "/jsp home private : Make your home private",

            /* administration */
            "/jsp home listall : Show all houses (ops only)",
            "/jsp home clear <player> : Clears player's home location (ops only)"
        ];
    },
    /* ========================================================================
       basic functions
       ======================================================================== */

    go: function(guest, host){
        if (typeof host == "undefined")
            host = guest;
        guest = utils.player(guest);
        host = utils.player(host);
        var loc = _store.houses[host.name];
        if (!loc){
            guest.sendMessage(host.name + " has no home");
            return;
        }
        if (!this._canVisit(guest,host)){
            guest.sendMessage("You can't visit " + host.name + "'s home yet");
            return;
        }
        var teleportCause = org.bukkit.event.player.PlayerTeleportEvent.TeleportCause;
        var homeLoc = utils.locationFromJSON(loc);
        guest.teleport(homeLoc, teleportCause.PLUGIN);
    },
    /*
      determine whether a guest is allow visit a host's home
    */
    _canVisit: function(guest, host){
        if  (guest == host)
            return true;
        if (_store.openHouses[host.name])
            return true;
        var invitations = _store.invites[host.name];
        if (invitations)
            for (var i = 0;i < invitations.length;i++)
                if (invitations[i] == guest.name)
                    return true;
        return false;
    },
    set: function(player){
        player = utils.player(player);
        var loc = player.location;
        _store.houses[player.name] = utils.locationToJSON(loc);
    },
    remove: function(player){
        player = utils.player(player);
        delete _store.houses[player.name];
    },
    /* ========================================================================
       social functions
       ======================================================================== */
    
    /* 
       list homes which the player can visit
    */
    list: function(player){
        var result = [];
        for (var ohp in _store.openHouses)
            result.push(ohp);
        player = utils.player(player);
        for (var host in _store.invites){
            var guests = _store.invites[host];
            for (var i = 0;i < guests.length; i++)
                if (guests[i] == player.name)
                    result.push(host);
        }
        return result;
    },
    /*
      list who can visit the player's home
     */
    ilist: function(player){
        player = utils.player(player);
        var result = [];
        // if home is public - all players
        if (_store.openHouses[player.name]){
            var online = org.bukkit.Bukkit.getOnlinePlayers();
            for (var i = 0;i < online.length; i++)
                if (online[i].name != player.name)
                    result.push(online[i].name);
        }else{
            if (_store.invites[player.name])
                result = _store.invites[player.name];
            else
                result = [];
        }
        return result;
    },
    /*
      Invite a player to the home
    */
    invite: function(host, guest){
        host = utils.player(host);
        guest = utils.player(guest);
        var invitations = [];
        if (_store.invites[host.name])
            invitations = _store.invites[host.name];
        invitations.push(guest.name);
        _store.invites[host.name] = invitations;
        guest.sendMessage(host.name + " has invited you to their home.");
        guest.sendMessage("type '/jsp home " + host.name + "' to accept");
    },
    /*
      Uninvite someone to the home
     */
    uninvite: function(host, guest){
        host = utils.player(host);
        guest = utils.player(guest);
        var invitations = _store.invites[host.name];
        if (!invitations)
            return;
        var revisedInvites = [];
        for (var i =0;i < invitations.length; i++)
            if (invitations[i] != guest.name)
                revisedInvites.push(invitations[i]);
        _store.invites[host.name] = revisedInvites;
    },
    /*
      make the player's house public
    */
    open: function(player, optionalMsg){
        player = utils.player(player);
        _store.openHouses[player.name] = true;
        if (typeof optionalMsg != "undefined")
            __plugin.server.broadcastMessage(optionalMsg);
    },
    /*
      make the player's house private
    */
    close: function(player){
        player = utils.player(player);
        delete _store.openHouses[player.name];
    },
    /* ========================================================================
       admin functions
       ======================================================================== */
    listall: function(){
        var result = [];
        for (var home in _store.houses)
            result.push(home);
        return result;
    },
    clear: function(player){
        player = utils.player(player);
        delete _store.houses[player.name];
        delete _store.openHouses[player.name];
    },
    store: _store
}, true);

exports.homes = homes;

/*
  define a set of command options that can be used by players
*/
var options = {
    'set': function(params, sender){ homes.set(sender); },
    'delete': function(params, sender ){ homes.remove(sender);},
    'help': function(params, sender){ sender.sendMessage(homes.help());},
    'list': function(params, sender){
        var visitable = homes.list();
        if (visitable.length == 0){
            sender.sendMessage("There are no homes to visit");
            return;
        }else{
            sender.sendMessage([
                "You can visit any of these " + visitable.length + " homes"
                ,visitable.join(", ")
            ]);
        }
    },
    'ilist': function(params, sender){
        var potentialVisitors = homes.ilist();
        if (potentialVisitors.length == 0)
            sender.sendMessage("No one can visit your home");
        else
            sender.sendMessage([
                "These " + potentialVisitors.length + "players can visit your home",
                potentialVisitors.join(", ")]);
    },
    'invite': function(params,sender){
        if (params.length == 1){
            sender.sendMessage("You must provide a player's name");
            return;
        }
        var playerName = params[1];
        var guest = utils.player(playerName);
        if (!guest)
            sender.sendMessage(playerName + " is not here");
        else
            homes.invite(sender,guest);
    },
    'uninvite': function(params,sender){
        if (params.length == 1){
            sender.sendMessage("You must provide a player's name");
            return;
        }
        var playerName = params[1];
        var guest = utils.player(playerName);
        if (!guest)
            sender.sendMessage(playerName + " is not here");
        else
            homes.uninvite(sender,guest);
    },
    'public': function(params,sender){         
        homes.open(sender,params.slice(1).join(' '));
        sender.sendMessage("Your home is open to the public");
    },
    'private': function(params, sender){ 
        homes.close(sender); 
        sender.sendMessage("Your home is closed to the public");
    },
    'listall': function(params, sender){
        if (!sender.isOp())
            sender.sendMessage("Only operators can do this");
        else
            sender.sendMessage(homes.listall().join(", "));
    },
    'clear': function(params,sender){
        if (!sender.isOp())
            sender.sendMessage("Only operators can do this");
        else
            homes.clear(params[1], sender);
    }
};
var optionList = [];
for (var o in options)
    optionList.push(o);
/*
  Expose a set of commands that players can use at the in-game command prompt
*/
command("home", function ( params , sender) {
    if (params.length == 0){
        homes.go(sender,sender);
        return;
    }
    var option = options[params[0]];
    if (option)
        option(params,sender);
    else{
        var host = utils.player(params[0]);
        if (!host)
            sender.sendMessage(params[0] + " is not here");
        else
            homes.go(sender,host);
    }
},optionList);



