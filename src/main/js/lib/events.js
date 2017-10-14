'use strict';
/************************************************************************
## events Module

The Events module provides a thin wrapper around CanaryMod's or
Bukkit's Event-handling API.  The Java-based CanaryMod and Bukkit
Events APIs make use of Java Annotations which are not available in
Javascript, so this module provides a simple way to listen to
minecraft events in javascript.

### events.on() static method

This method is used to register event listeners. This method is called by all of the Event Helper methods. 
The `events` object has functions for registering listeners for each type of event. For example, you can register a block-break listener using events.on:

```javascript
events.on( Packages.net.canarymod.hook.player.BlockDestroyHook, function( evt, cancel ) { 
  echo(evt.player, evt.player.name + ' broke a block!');
} );
```

or you can (and probably should) use the more succinct:

```javascript
events.blockDestroy( function( evt, cancel ) { 
  echo(evt.player, evt.player.name + ' broke a block!');
} );
```

The events.on method can be used to register standard CanaryMod/Bukkit
events and can also be used to register non-standard events - that is
- events provided by plugins.

#### Parameters

 * eventType - A Java class. See the [CanaryMod Hook API][cmEvtApi] or [Bukkit Event API][buk] for details of the many event types.  

 * callback - A function which will be called whenever the event
   fires. The callback in turn takes 2 parameters: 
   
   - event : the event  fired
   - cancel : a function which if invoked will cancel the  event - not all event types are cancelable; this function only cancels cancelable events).

 * priority (optional - default: "CRITICAL" for CanaryMod or "HIGHEST" for Bukkit) - 
   The priority the listener/callback takes over other listeners to the same event. 
   Possible values for CanaryMod are "CRITICAL", "HIGH", "LOW", "NORMAL" and "PASSIVE".
   For an explanation of what the different CanaryMod Hook priorities 
   mean, refer to CanaryMod's [Hook Priority class][cmPriority]. 
   Possible values for Bukkit are "HIGH", "HIGHEST", "LOW", "LOWEST", "NORMAL", "MONITOR". 
   For an explanation of what the different Bukkit Event priorities 
   mean, refer to bukkit's [Event API Reference][buk2]. 

#### Returns

An object which can be used to unregister the listener. 

#### Example:

The following code will print a message on screen every time a block is broken in the game

```javascript
events.on( Packages.net.canarymod.hook.player.BlockDestroyHook, function( evt, cancel ) { 
  echo(evt.player, evt.player.name + ' broke a block!');
} );
```

To handle an event only once and unregister from further events...

```javascript    
events.on( Packages.net.canarymod.hook.player.BlockDestroyHook, function( evt, cancel ) { 
  echo( evt.player, evt.player.name + ' broke a block!');
  this.unregister();
} );
```

The `this` keyword when used inside the callback function refers to
the Listener object created by ScriptCraft. It has 2 methods
`unregister()` which can be used to stop listening and `cancel()`
which can be used to cancel the current event. The object returned by
`events.on()` only has the `unregister()` method, the `cancel()`
method is only available from within the event handling function.

To unregister a listener *outside* of the listener function...

```javascript    
var myBlockBreakListener = events.on( Packages.net.canarymod.hook.player.BlockDestroyHook, function( evt ) { ... } );
...
myBlockBreakListener.unregister();
```

[buk2]: http://wiki.bukkit.org/Event_API_Reference
[buk]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/event/Event.html
[cmEvtApi]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/hook/Hook.html
[cmPriority]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/plugin/Priority.html

***/
var helper;
/*global __plugin, module, require*/
if (__plugin.canary){
  module.exports = require('events-canary');
  helper = require('events-helper-canary');
  // backwards-compatibility with canarymod 1.7.9 for book listings
  if (helper.connection && !helper.connect){
    helper.connect = helper.connection;
  }
} else {
  module.exports = require('events-bukkit');
  helper = require('events-helper-bukkit');
}
for ( var func in helper ) {
  module.exports[func] = helper[func];
}
