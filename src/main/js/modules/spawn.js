/*global require, module, __plugin, Packages*/
'use strict';
var entities = require('entities');

module.exports = function(entityType, location){
  if (typeof entityType === 'string'){
    entityType = entities[entityType];
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
