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
<http://jd.bukkit.org/beta/apidocs/org/bukkit/entity/EntityType.html>
for a list of possible entities (creatures) which can be spawned.

***/
var entities = [],
  bkEntityType = org.bukkit.entity.EntityType;

var entitytypes = bkEntityType.values();
for ( var t in entitytypes ) {
  if ( entitytypes[t] && entitytypes[t].ordinal ) { 
    entities.push(entitytypes[t].name());
  }
}
command( 'spawn', function( parameters, sender ) {
  if ( !sender.op ) {
    sender.sendMessage( 'Only operators can perform this command' );
    return;
  }
  var location = sender.location;
  if ( !location ) {
    sender.sendMessage( 'You have no location. This command only works in-game.' );
    return;
  }
  var world = location.world;
  var type = ('' + parameters[0]).toUpperCase();
  world.spawnEntity( location, EntityType[type] );
}, entities );
