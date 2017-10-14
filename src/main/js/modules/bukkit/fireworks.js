/*
  create a firework at the given location
*/
function bukkitFirework( location ) {
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
}
module.exports = bukkitFirework;
