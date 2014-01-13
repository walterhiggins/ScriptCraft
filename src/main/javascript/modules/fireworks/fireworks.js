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
    /js fireworks.firework(self.location);

![firework example](img/firework.png)

***/

/*
  create a firework at the given location
*/
var firework = function(location){
    var Color = org.bukkit.Color;
    var FireworkEffect = org.bukkit.FireworkEffect;
    var EntityType = org.bukkit.entity.EntityType;

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
        .flicker(Math.round(Math.random())==0)
        .withColor(c1)
        .withFade(c2).trail(Math.round(Math.random())==0);
    effectBuilder['with'](type);
    var effect = effectBuilder.build();
    fwm.addEffect(effect);
    fwm.setPower(randInt(2)+1);
    fw.setFireworkMeta(fwm);
};

exports.firework = firework;

