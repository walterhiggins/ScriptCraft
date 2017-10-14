'use strict';
/*global __plugin, org, module, require*/
var utils = require('utils');
/************************************************************************
## Teleport Module

This module provides a function to teleport entities (Players or NPCs). 

### Parameters

 * entity - The player or NPC to be teleported. If of type String, then a player with that name will be teleported.
 * destination - The location to which they should be teleported. If not of type Location but is a Player, Block or any
   object which has a `location` property then that works too. If of type String, then it's assumed that the destination is the player with that name.

### Example 

The following code will teleport each player back to their spawn position.

```javascript
var teleport = require('teleport'),
    utils = require('utils'),
    players = utils.players(), 
    i = 0;
for ( ; i < players.length; i++ ) {
  teleport( players[i], players[i].spawnPosition );
}
```

The following code will teleport 'tom' to 'jane's location.

```javascript
var teleport = require('teleport');
teleport('tom' , 'jane'); 
```
***/
function teleport( entity, destination){
  if (typeof entity === 'string' || entity instanceof java.lang.String){
    entity = utils.player(entity);
  }
  if (typeof destination === 'string' || destination instanceof java.lang.String){
    var player = utils.player(destination);
    if (player){
      destination = player.location;
    }
  } else {
    if (destination.location){
      destination = destination.location;
    }
  }
  if (__plugin.bukkit){
    var bkTeleportCause = org.bukkit.event.player.PlayerTeleportEvent.TeleportCause;
    entity.teleport( destination, bkTeleportCause.PLUGIN);
  }
  if (__plugin.canary){
    var cmTeleportCause = Packages.net.canarymod.hook.player.TeleportHook.TeleportCause;
    entity.teleportTo(destination, cmTeleportCause.PLUGIN);
  }
}
module.exports = teleport;
