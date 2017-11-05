'use strict';
/*global Packages, __plugin, command, echo, isOp, org */
/*jslint nomen: true, indent: 2 */
/*************************************************************************
## Spawn Plugin

Allows in-game operators to easily spawn creatures at current location.

### Usage

    /jsp spawn cow
    /jsp spawn sheep
    /jsp spawn wolf

This command supports TAB completion so to see a list of possible
entitities, type `/jsp spawn ' at the in-game command prompt, then
press TAB. Visit
<https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityType.html> (Bukkit/SpigotMC)
or <http://docs.visualillusionsent.net/CanaryLib/1.0.0/net/canarymod/api/entity/EntityType.html> (CanaryMod)

for a list of possible entities (creatures) which can be spawned.

***/
var entities = require('entities'),
  spawn = require('spawn');
var entityNames = [];
for (var name in entities) {
  entityNames.push(name);
}
command(
  'spawn',
  function(parameters, sender) {
    if (!isOp(sender)) {
      echo(sender, 'Only operators can perform this command');
      return;
    }
    var location = sender.location;
    if (!location) {
      echo(sender, 'You have no location. This command only works in-game.');
      return;
    }
    var name = ('' + parameters[0]).toUpperCase();
    spawn(name, sender.location);
  },
  entityNames
);
