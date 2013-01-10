importPackage(org.bukkit.entity);
bukkit.on("entity.ProjectileHitEvent", function(listener, event){
    var projectile = event.entity;
    var world = projectile.world;
    if (projectile instanceof Arrow && projectile.shooter instanceof Player){
        projectile.remove();
        world.createExplosion(projectile.location,2.5);
    }
});
