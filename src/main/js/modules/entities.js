'use strict';
var entities = {},
  entitytypes,
  t, name;
if (__plugin.bukkit) {
  entitytypes = org.bukkit.entity.EntityType.values();
}
if (__plugin.canary) {
  entitytypes = Packages.net.canarymod.api.entity.EntityType.values();
}
function getEntityHandler( entityType ) {
  return function( entity ){
    if (arguments.length == 0){
      return entityType;
    }
    if (arguments.length == 1){
      if (entity){
        if (__plugin.bukkit){
          return entity.type == entityType;
        }
        if (__plugin.canary){
          return entity.entityType == entityType;
        }
      }
    }
    return null;
  };
}
for (t in entitytypes) {
  if (entitytypes[t] && entitytypes[t].ordinal) {
    name = ('' + entitytypes[t].name()).replace(/^(.*)/,function(a){
      return a.toLowerCase();
    });
    entities[name] = getEntityHandler(entitytypes[t]);
  }
}
module.exports = entities;
