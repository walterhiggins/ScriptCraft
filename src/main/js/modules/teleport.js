function teleport( entity, location){
  if (__plugin.bukkit){
    var bkTeleportCause = org.bukkit.event.player.PlayerTeleportEvent.TeleportCause;
    entity.teplort( location, bkTeleportCause.PLUGIN);
  }
  if (__plugin.canary){
    entity['teleportTo(Location)'](location);
  }
}
module.exports = teleport;
