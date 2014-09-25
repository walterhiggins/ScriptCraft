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

 * eventName - A java class. See [Bukkit API][buk] for
   details of the many bukkit event types. Provide the full class name (without
   enclosing quotes).

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
events.on( Packages.org.bukkit.event.block.BlockBreakEvent, function( evt ) { 
    evt.player.sendMessage( evt.player.name + ' broke a block!');
} );
```

To handle an event only once and unregister from further events...

```javascript    
events.on( Packages.org.bukkit.event.block.BlockBreakEvent, function( evt ) { 
    evt.player.sendMessage( evt.player.name + ' broke a block!');
    this.unregister();
} );
```

The `this` keyword when used inside the callback function refers to
the Listener object created by ScriptCraft. It has a single method
`unregister()` which can be used to stop listening. This is the same
object which is returned by the `events.on()` function.

To unregister a listener *outside* of the listener function...

```javascript    
var myBlockBreakListener = events.on( Packages.org.bukkit.event.block.BlockBreakEvent, function( evt ) { ... } );
...
myBlockBreakListener.unregister();
```
[buk2]: http://wiki.bukkit.org/Event_API_Reference
[buk]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/event/Event.html

***/
var helper = require('events-helper');
for ( var func in helper ) {
  exports[func] = helper[func];
};

var bkEventPriority = org.bukkit.event.EventPriority,
  bkEventExecutor = org.bukkit.plugin.EventExecutor,
  bkRegisteredListener = org.bukkit.plugin.RegisteredListener,
  bkEventPackage = 'org.bukkit.event.';

var nashorn = (typeof Java != 'undefined');

function getHandlerListForEventType( eventType ){
  var result = null;
  var clazz = null;
  if (nashorn) {
    
    //Nashorn doesn't like when getHandlerList is in a superclass of your event
    //so to avoid this problem, call getHandlerList using java.lang.reflect
    //methods
    clazz = eventType['class'];
    result = clazz.getMethod("getHandlerList").invoke(null);
    
  } else { 
    result = eventType.getHandlerList();
  }

  return result;
}
exports.on = function( 
  /* Java Class */
  eventType, 
  /* function( registeredListener, event) */ 
  handler,   
  /* (optional) String (HIGH, HIGHEST, LOW, LOWEST, NORMAL, MONITOR), */
  priority   ) {
  var handlerList,
    regd,
    eventExecutor;

  if ( typeof priority == 'undefined' ) {
    priority = bkEventPriority.HIGHEST;
  } else {
    priority = bkEventPriority[priority.toUpperCase().trim()];
  }
  handlerList = getHandlerListForEventType (eventType);

  var result = { };
  eventExecutor = new bkEventExecutor( {
    execute: function( l, evt ) {
      handler.call( result, evt );
    } 
  } );
  /* 
   wph 20130222 issue #64 bad interaction with Essentials plugin
   if another plugin tries to unregister a Listener (not a Plugin or a RegisteredListener)
   then BOOM! the other plugin will throw an error because Rhino can't coerce an
   equals() method from an Interface.
   The workaround is to make the ScriptCraftPlugin java class a Listener.
   Should only unregister() registered plugins in ScriptCraft js code.
   */
  regd = new bkRegisteredListener( __plugin, eventExecutor, priority, __plugin, true );
  handlerList.register( regd );
  result.unregister = function(){
    handlerList.unregister( regd );
  };
  return result;
};
