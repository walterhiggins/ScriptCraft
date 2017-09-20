'use strict';
/*global __plugin, require, module, exports*/
/************************************************************************
## Signs Module

The Signs Module can be used by plugin authors to create interactive
signs - that is - signs which display a list of choices which can be
changed by interacting (right-clicking) with the sign.

### signs.menu() function

This function is used to construct a new interactive menu on top of an
existing sign in the game world.

#### Parameters

 * Label : A string which will be displayed in the topmost line of the
   sign. This label is not interactive.  
 * options : An array of strings which can be selected on the sign by 
   right-clicking/interacting.
 * callback : A function which will be called whenever a player
   interacts (changes selection) on a sign. This callback in turn
   takes as its parameter, an object with the following properties...

   * player : The player who interacted with the sign.
   * sign : The [org.bukkit.block.Sign][buksign] which the player interacted with.
   * text : The text for the currently selected option on the sign.
   * number : The index of the currently selected option on the sign.
 
 * selectedIndex : optional: A number (starting at 0) indicating which
   of the options should be selected by default. 0 is the default.

#### Returns
This function does not itself do much. It does however return a
function which when invoked with a given
[org.bukkit.block.Sign][buksign] object, will convert that sign into
an interactive sign.

#### Example: Create a sign which changes the time of day.

##### plugins/signs/time-of-day.js
   
```javascript 
var utils = require('utils'),
    signs = require('signs');

var onTimeChoice = function(event){
    var selectedIndex = event.number;
    // convert to Minecraft time 0 = Dawn, 6000 = midday, 12000 = dusk, 18000 = midnight
    var time = selectedIndex * 6000; 
    event.player.location.world.setTime(time);
};

// signs.menu returns a function which can be called for one or more signs in the game.
var convertToTimeMenu = signs.menu('Time of Day',
    ['Dawn', 'Midday', 'Dusk', 'Midnight'],
    onTimeChoice);
        
exports.time_sign = function( player ){
    var sign = signs.getTargetedBy(player);
    if ( !sign ) {
        throw new Error('You must look at a sign');
    } 
    convertToTimeMenu(sign);
};
```

To use the above function at the in-game prompt, look at an existing
sign and type...

    /js time_sign(self);

... and the sign you're looking at will become an interactive sign
which changes the time each time you interact (right-click) with it.

### signs.getTargetedBy() function

This function takes a [org.bukkit.entity.LivingEntity][bukle] as a
parameter and returns a [org.bukkit.block.Sign][buksign] object which
the entity has targeted. It is a utility function for use by plugin authors.

#### Example

```javascript 
var signs = require('signs'),
    utils = require('utils');
var player = utils.player('tom1234');
var sign = signs.getTargetedBy( player );
if ( !sign ) { 
    echo( player, 'Not looking at a sign');
}
```

[buksign]: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/Sign.html
[bukle]: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/LivingEntity.html

***/
function hasSign( block ){
  if (__plugin.canary){
    if (block && block.tileEntity && block.tileEntity.setTextOnLine){
      return block.tileEntity;
    }
  }
  if (__plugin.bukkit){
    if (block && block.state && block.state.setLine){
      return block.state;
    }
  }
  return false;
}
var utils = require('utils');
var menu = require('./menu')(hasSign);
// include all menu exports
for ( var i in menu ) {
  exports[i] = menu[i];
}

function getTargetedBy( livingEntity ) {
  var location = utils.getMousePos( livingEntity );
  if ( !location ) { 
    return null;
  }
  return hasSign(utils.blockAt(location));
}
exports.getTargetedBy = getTargetedBy;
exports.hasSign = hasSign;
