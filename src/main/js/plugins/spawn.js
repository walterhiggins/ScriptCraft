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
<https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityType.html> (CanaryMod)
or <http://docs.visualillusionsent.net/CanaryLib/1.0.0/net/canarymod/api/entity/EntityType.html> (Bukkit)

for a list of possible entities (creatures) which can be spawned.

***/
var entities = [],
  entityType = null,
  entitytypes,
  t;
if (__plugin.bukkit) {
  entityType = org.bukkit.entity.EntityType;
}
if (__plugin.canary) {
  entityType = Packages.net.canarymod.api.entity.EntityType;
}
entitytypes = entityType.values();
for (t in entitytypes) {
  if (entitytypes[t] && entitytypes[t].ordinal) {
    entities.push(entitytypes[t].name());
  }
}

command('spawn', function (parameters, sender) {
  if (!isOp(sender)) {
    echo(sender, 'Only operators can perform this command');
    return;
  }
  var location = sender.location;
  if (!location) {
    echo(sender, 'You have no location. This command only works in-game.');
    return;
  }
  var world = location.world || sender.world,
    type = ('' + parameters[0]).toUpperCase();
  if (__plugin.bukkit) {
    world.spawnEntity(location, entityType[type]);
  }
  if (__plugin.canary) {
    var Canary = Packages.net.canarymod.Canary,
      entity = Canary.factory().entityFactory.newEntity(entityType[type], location);
    entity.spawn();
  }
}, entities);
