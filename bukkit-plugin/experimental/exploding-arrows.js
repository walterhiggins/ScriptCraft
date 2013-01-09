importPackage(org.bukkit.entity);
bukkit.on("entity.ProjectileHitEvent", function(listener, event){
    var projectile = event.entity;
    var world = projectile.world;
    //
    // only want arrows shot by players to explode
    //
    if (projectile instanceof Arrow && projectile.shooter instanceof Player){
        projectile.remove();
        world.createExplosion(projectile.location,2.5);
    }
});
