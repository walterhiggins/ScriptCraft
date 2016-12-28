/*global require, module, __plugin, Packages*/
'use strict';
var entities = require('entities');
/************************************************************************
## Spawn Module

Provides a single function to 'spawn' an entity at a given location.

### Parameters

 * entityType - <String|Object> The type of entity to spawn. This can be a string (see entities module for reference) or a framework-specific object type (see https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/EntityType.html). A list of [all possible entities][ents] functions (equivalent to the EntityType enum).

 * location - where the entity should be spawned.

[ents]: #entities-module

### Example

Using the entities module as a helper, spawn a new polar bear at the world's default spawn location:

```javascript
var entities = require('entities'),
    spawn = require('spawn');
...
var spawnLocation = world.spawnLocation;
spawn(entities.polar_bear(), spawnLocation);
``` 

This module is in turn used by the Drone's `spawn()` method and the `jsp spawn` command.
***/
module.exports = function(entityType, location){
  var entityTypeFn;
  if (typeof entityType === 'string'){
    entityTypeFn = entities[entityType.toLowerCase()];
    entityType = entityTypeFn();
  }
  var world = location.world;
  if (__plugin.bukkit){
    world.spawnEntity( location, entityType);
  }
  if (__plugin.canary){
    var Canary = Packages.net.canarymod.Canary,
      entityInstance = Canary.factory().entityFactory.newEntity(entityType, location);
    entityInstance.spawn();
  }
};
