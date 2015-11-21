/*global __plugin, org, Packages, module, exports*/
'use strict';
var entities = {},
  entitytypes,
  t, i, name;
if (__plugin.bukkit) {
  entitytypes = org.bukkit.entity.EntityType.values();
}
if (__plugin.canary) {
  entitytypes = Packages.net.canarymod.api.entity.EntityType.values();
}
for (t in entitytypes) {
  if (entitytypes[t] && entitytypes[t].ordinal) {
    name = entitytypes[t].name();
    entities[name] = entitytypes[t];
  }
}
module.exports = entities;
