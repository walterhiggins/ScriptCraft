/*
 
  The arrows mod adds fancy arrows to the game.
  
  Usage: 

  /js arrows.sign() turns a targeted sign into a Arrows menu
  /js arrows.normal() sets arrow type to normal.
  /js arrows.explosive() - makes arrows explode.
  /js arrows.teleport() - makes player teleport to where arrow has landed.
  /js arrows.flourish() - makes a tree grow where the arrow lands.
  /js arrows.lightning() - lightning strikes where the arrow lands.
 
  All of the above functions can take an optional player object or name as 
  a parameter. E.g.
  
  /js arrows.explosive('player23') makes player23's arrows explosive.
 
*/

var arrows = arrows || plugin("arrows",{
    /*
      turn a sign into a menu of arrow choices
    */
    sign: function(sign){},
    /*
      change player's arrows to normal
     */
    normal: function(player){},
    /*
      change player's arrows to explode on impact
     */
    explosive: function(player){},
    /*
      change player's arrows to teleporting
     */
    teleport: function(player){},
    /*
      change player's arrows to plant trees where they land
     */
    flourish: function(player){},
    /*
      change player's arrows to strike lightning where they land
     */
    lightning: function(player){},
    
    explosiveYield: 2.5

},true);
/*
  initialize data
*/
arrows.store.players = arrows.store.players || {};

/*
  private implementation of normal, explosive, teleport, flourish and lightning functions
*/
(function(){
    //
    // setup functions for the arrow types
    //
    var _types = {normal: 0, explosive: 1, teleport: 2, flourish: 3, lightning: 4};
    for (var type in _types)
    {
        arrows[type] = (function(n){
            return function(player){
                if (typeof player == "undefined")
                    player = self;
                var playerName = null;
                if (typeof player == "string")
                    playerName = player;
                else
                    playerName = player.name;
                arrows.store.players[playerName] = n;
            };
        })(_types[type]);
    }
}());
/*
  Arrows depends on 2 other modules: 'signs' and 'events' so the following code 
  can't execute until all modules have loaded (ready).
*/
ready(function()
{
    /*
      called when the player chooses an arrow option from a menu sign
     */
    var _onMenuChoice = function(event){
        arrows.store.players[event.player.name] = event.number;
    };
    arrows.sign = signs.menu("Arrow", 
                             ["Normal","Explosive","Teleport","Flourish","Lightning"],
                             _onMenuChoice );

    /*
      event handler called when a projectile hits something
    */
    var _onArrowHit = function(listener,event)
    {
        var projectile = event.entity;
        var world = projectile.world;
        var shooter = projectile.shooter;
        if (projectile instanceof org.bukkit.entity.Arrow && 
            shooter instanceof org.bukkit.entity.Player)
        {
            var arrowType = arrows.store.players[shooter.name];
            switch (arrowType){
            case 1:
                projectile.remove();
                world.createExplosion(projectile.location,arrows.explosiveYield);
                break;
            case 2:
                projectile.remove();
                var teleportCause =org.bukkit.event.player.PlayerTeleportEvent.TeleportCause;
                shooter.teleport(projectile.location,
                                 teleportCause.PLUGIN);
                break;
            case 3:
                projectile.remove();
                world.generateTree(projectile.location, org.bukkit.TreeType.BIG_TREE);
                break;
            case 4: 
                projectile.remove();
                world.strikeLightning(projectile.location);
                break;
            }
        }
    };
    events.on("entity.ProjectileHitEvent",_onArrowHit);
});
