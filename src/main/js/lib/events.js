'use strict';
/************************************************************************
## events Module

The Events module provides a thin wrapper around Bukkit's
Event-handling API.  Bukkit's Events API makes use of Java Annotations
which are not available in Javascript, so this module provides a
simple way to listen to minecraft events in javascript.

### events.on() static method

This method is used to register event listeners. 

#### Parameters

 * eventName - A Java class. See [Bukkit API][buk] for details of the many bukkit event types.  

 * callback - A function which will be called whenever the event
   fires. The callback should take a single parameter, event (the event fired).

 * priority (optional - default: "HIGHEST") - The priority the
   listener/callback takes over other listeners to the same
   event. Possible values are "HIGH", "HIGHEST", "LOW", "LOWEST",
   "NORMAL", "MONITOR". For an explanation of what the different
   priorities mean refer to bukkit's [Event API Reference][buk2].

#### Returns

An object which can be used to unregister the listener. 

#### Example:

The following code will print a message on screen every time a block is broken in the game

```javascript
events.on( org.bukkit.block.BlockBreakEvent, function( evt ) { 
    echo(evt.player, evt.player.name + ' broke a block!');
} );
```

To handle an event only once and unregister from further events...

```javascript    
events.on( org.bukkit.block.BlockBreakEvent, function( evt ) { 
    echo( evt.player, evt.player.name + ' broke a block!');
    this.unregister();
} );
```

The `this` keyword when used inside the callback function refers to
the Listener object created by ScriptCraft. It has a single method
`unregister()` which can be used to stop listening. This is the same
object which is returned by the `events.on()` function.

To unregister a listener *outside* of the listener function...

```javascript    
var myBlockBreakListener = events.on( org.bukkit.block.BlockBreakEvent, function( evt ) { ... } );
...
myBlockBreakListener.unregister();
```

[buk2]: http://wiki.bukkit.org/Event_API_Reference
[buk]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/event/Event.html

***/
var helper;
if (__plugin.canary){
  module.exports = require('events-canary');
  helper = require('events-helper-canary');
} else {
  module.exports = require('events-bukkit');
  helper = require('events-helper-bukkit');
}
for ( var func in helper ) {
  module.exports[func] = helper[func];
};
