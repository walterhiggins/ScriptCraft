plugin("fireworks", { 
    /*
      create a firework at the given location
     */
    firework: function(location){
        importPackage(org.bukkit.entity);
        importPackage(org.bukkit);
        
        var randInt = function(n){
            return Math.floor(Math.random() * n);
        };
        var getColor = function(i){
            var colors = [
                Color.AQUA, Color.BLACK, Color.BLUE, Color.FUCHSIA, Color.GRAY,
                Color.GREEN, Color.LIME, Color.MAROON, Color.NAVY, Color.OLIVE,
                Color.ORANGE, Color.PURPLE, Color.RED, Color.SILVER, Color.TEAL,
                Color.WHITE, Color.YELLOW];
            return colors[i];
        };
        var fw = location.world.spawnEntity(location, EntityType.FIREWORK);
        var fwm = fw.getFireworkMeta();
        var fwTypes = [FireworkEffect.Type.BALL,
                       FireworkEffect.Type.BALL_LARGE,
                       FireworkEffect.Type.BURST,
                       FireworkEffect.Type.CREEPER,
                       FireworkEffect.Type.STAR];
        var type = fwTypes[randInt(5)];
        
        var r1i = randInt(17);
        var r2i = randInt(17);
        var c1 = getColor(r1i);
        var c2 = getColor(r2i);
        var effectBuilder = FireworkEffect.builder()
            .flicker(true)
            .withColor(c1)
            .withFade(c2).trail(true);
        effectBuilder['with'](type);
        var effect = effectBuilder.build();
        fwm.addEffect(effect);
        fwm.setPower(randInt(2)+1);
        fw.setFireworkMeta(fwm);
    }
});
Drone.extend('firework',function()
{
    fireworks.firework(this.getLocation());
});
