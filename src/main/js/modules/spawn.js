/*global require, module, __plugin, Packages*/
'use strict';
var entities = require('entities');

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
