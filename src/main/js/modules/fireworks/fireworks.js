/************************************************************************
## Fireworks Module

The fireworks module makes it easy to create fireworks using
ScriptCraft.  The module has a single function `firework` which takes
a `org.bukkit.Location` as its 1 and only parameter.

### Examples

The module also extends the `Drone` object adding a `firework` method
so that fireworks can be created as a part of a Drone chain. For
Example....

    /js firework()

... creates a single firework, while ....

    /js firework().fwd(3).times(5) 

... creates 5 fireworks in a row. Fireworks have also been added as a
possible option for the `arrow` module. To have a firework launch
where an arrow strikes...

    /js arrows.firework()

To call the fireworks.firework() function directly, you must provide a
location. For example...

    /js var fireworks = require('fireworks');
    /js fireworks.firework( self.location );

![firework example](img/firework.png)

***/

/*
  create a firework at the given location
*/
var firework = function( location ) {
  var bkColor = org.bukkit.Color;
  var bkFireworkEffect = org.bukkit.FireworkEffect;
  var bkEntityType = org.bukkit.entity.EntityType;

  var randInt = function( n ) {
    return Math.floor( Math.random() * n );
  };
  var getColor = function( i ) {
    var colors = [
      bkColor.AQUA, bkColor.BLACK, bkColor.BLUE, bkColor.FUCHSIA, bkColor.GRAY,
      bkColor.GREEN, bkColor.LIME, bkColor.MAROON, bkColor.NAVY, bkColor.OLIVE,
      bkColor.ORANGE, bkColor.PURPLE, bkColor.RED, bkColor.SILVER, bkColor.TEAL,
      bkColor.WHITE, bkColor.YELLOW];
    return colors[i];
  };
  var fw = location.world.spawnEntity(location, bkEntityType.FIREWORK);
  var fwm = fw.getFireworkMeta();
  var fwTypes = [
    bkFireworkEffect.Type.BALL,
    bkFireworkEffect.Type.BALL_LARGE,
    bkFireworkEffect.Type.BURST,
    bkFireworkEffect.Type.CREEPER,
    bkFireworkEffect.Type.STAR
  ];
  var type = fwTypes[ randInt( 5 ) ];
  
  var r1i = randInt( 17 );
  var r2i = randInt( 17 );
  var c1 = getColor( r1i );
  var c2 = getColor( r2i );
  var effectBuilder = bkFireworkEffect.builder()
        .flicker( Math.round( Math.random() ) == 0 )
        .withColor( c1 )
        .withFade( c2 )
        .trail( Math.round( Math.random() ) == 0 );
  effectBuilder['with']( type );
  var effect = effectBuilder.build();
  fwm.addEffect( effect );
  fwm.setPower( randInt( 2 ) + 1 );
  fw.setFireworkMeta( fwm );
};

exports.firework = firework;

