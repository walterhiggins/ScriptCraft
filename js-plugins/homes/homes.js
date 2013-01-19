/*
  The homes plugin lets players set a location as home and return to the location, invite
  other players to their home and also visit other player's homes.
*/
plugin("homes", { 
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
		  guest = getPlayerObject(guest);
		  host = getPlayerObject(host);
		  var location = this.store.houses[host.name];
		  if (!location){
				guest.sendMessage(host.name + " has no home");
				return;
		  }
		  if (!this._canVisit(guest,host)){
				guest.sendMessage("You can't visit " + host.name + "'s home yet");
				return;
		  }
		  var worldName = location[0], x = location[1], y = location[2], z=location[3], yaw=location[4];
		  var homeLoc = new org.bukkit.Location(org.bukkit.Bukkit.getWorld(worldName),x,y,z,yaw,0);
		  guest.teleport(homeLoc);
	 },
	 /*
		determine whether a guest is allow visit a host's home
	 */
	 _canVisit: function(guest, host){
		  if  (guest == host)
				return true;
		  if (this.store.openHouses[host.name])
				return true;
		  var invitations = this.store.invites[host.name];
		  if (invitations)
				for (var i = 0;i < invitations.length;i++)
					 if (invitations[i] == guest.name)
						  return true;
		  return false;
	 },
	 set: function(player){
		  player = getPlayerObject(player);
		  var loc = player.location;
		  this.store.houses[player.name] = [""+loc.world.name, Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z), Math.floor(loc.yaw), Math.floor(loc.pitch)];
	 },
	 remove: function(player){
		  player = getPlayerObject(player);
		  delete this.store.houses[player.name];
	 },
	 /* ========================================================================
		 social functions
	    ======================================================================== */
	 
	 /* 
		 list homes which the player can visit
	 */
	 list: function(player){
		  var result = [];
		  for (var ohp in this.store.openHouses)
				result.push(ohp);
		  player = getPlayerObject(player);
		  for (var host in this.store.invites){
				var guests = this.store.invites[host];
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
		  player = getPlayerObject(player);
		  var result = [];
		  // if home is public - all players
		  if (this.store.openHouses[player.name]){
				var online = org.bukkit.Bukkit.getOnlinePlayers();
				for (var i = 0;i < online.length; i++)
					 if (online[i].name != player.name)
						  result.push(online[i].name);
		  }else{
				result = this.store.invites[player.name] || [];
		  }
		  return result;
	 },
	 /*
		Invite a player to the home
	 */
	 invite: function(host, guest){
		  host = getPlayerObject(host);
		  guest = getPlayerObject(guest);
		  var invitations = this.store.invites[host.name] || [];
		  invitations.push(guest.name);
		  this.store.invites[host.name] = invitations;
		  guest.sendMessage(host.name + " has invited you to their home.");
		  guest.sendMessage("type '/jsp home " + host.name + "' to accept");
	 },
	 /*
		Uninvite someone to the home
	  */
	 uninvite: function(host, guest){
		  host = getPlayerObject(host);
		  guest = getPlayerObject(guest);
		  var invitations = this.store.invites[host.name];
		  if (!invitations)
				return;
		  var revisedInvites = [];
		  for (var i =0;i < invitations.length; i++)
				if (invitations[i] != guest.name)
					 revisedInvites.push(invitations[i]);
		  this.store.invites[host.name] = revisedInvites;
	 },
	 /*
		make the player's house public
	 */
	 open: function(player, optionalMsg){
		  player = getPlayerObject(player);
		  this.store.openHouses[player.name] = true;
		  if (typeof optionalMsg != "undefined")
				__plugin.server.broadcastMessage(optionalMsg);
	 },
	 /*
		make the player's house private
	 */
	 close: function(player){
		  player = getPlayerObject(player);
		  delete this.store.openHouses[player.name];
	 },
	 /* ========================================================================
		 admin functions
	    ======================================================================== */
	 listall: function(){
		  var result = [];
		  for (var home in this.store.houses)
				result.push(home);
		  return result;
	 },
	 clear: function(player){
		  player = getPlayerObject(player);
		  delete this.store.houses[player.name];
		  delete this.store.openHouses[player.name];
	 }
	 
}, true);
/* 
	private implementation
*/
(function(){
	 /*
		define a set of command options that can be used by players
	  */
	 var options = {
		  set: function(){homes.set();},
		  'delete': function(){ homes.remove();},
		  help: function(){ __self.sendMessage(homes.help());},
		  list: function(){
				var visitable = homes.list();
				if (visitable.length == 0){
					 __self.sendMessage("There are no homes to visit");
					 return;
				}else{
					 __self.sendMessage([
						  "You can visit any of these " + visitable.length + " homes"
						  ,visitable.join(", ")
					 ]);
				}
		  },
		  ilist: function(){
				var potentialVisitors = homes.ilist();
				if (potentialVisitors.length == 0)
					 __self.sendMessage("No one can visit your home");
				else
					 __self.sendMessage([
						  "These " + potentialVisitors.length + "players can visit your home",
						  potentialVisitors.join(", ")]);
		  },
		  invite: function(){
				if (params.length == 1){
					 __self.sendMessage("You must provide a player's name");
					 return;
				}
				var playerName = params[1];
				var guest = getPlayerObject(playerName);
				if (!guest)
					 __self.sendMessage(playerName + " is not here");
				else
					 homes.invite(__self,guest);
		  },
		  uninvite: function(){
				if (params.length == 1){
					 __self.sendMessage("You must provide a player's name");
					 return;
				}
				var playerName = params[1];
				var guest = getPlayerObject(playerName);
				if (!guest)
					 __self.sendMessage(playerName + " is not here");
				else
					 homes.uninvite(__self,guest);
		  },
		  'public': function(){ 		  
				homes.open(__self,params.slice(1).join(' '));
				__self.sendMessage("Your home is open to the public");
		  },
		  'private': function(){ 
				homes.close(); 
				__self.sendMessage("Your home is closed to the public");
		  },
		  listall: function(){
				if (!__self.isOp())
					 __self.sendMessage("Only operators can do this");
				else
					 __self.sendMessage(homes.listall().join(", "));
		  },
		  clear: function(){
				if (!__self.isOp())
					 __self.sendMessage("Only operators can do this");
				else
					 homes.clear(params[1]);
		  }
	 };
	 var optionList = [];
	 for (var o in options)
		  optionList.push(o);
	 /*
		Expose a set of commands that players can use at the in-game command prompt
	 */
	 command("home", function(params){
		  if (params.length == 0){
				homes.go();
				return;
		  }
		  var option = options[params[0]];
		  if (option)
				option();
		  else{
		  var host = getPlayerObject(params[0]);
				if (!host)
					 __self.sendMessage(params[0] + " is not here");
				else
					 homes.go(__self,host);
		  }
	 },optionList);

	 /*
		initialize the store
	 */
	 homes.store.houses = homes.store.houses || {};
	 homes.store.openHouses = homes.store.openHouses || {};
	 homes.store.invites = homes.store.invites || {};
}());
