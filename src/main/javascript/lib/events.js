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


 * eventName - A string or java class. If a string is supplied it must
   be part of the Bukkit event class name.  See [Bukkit API][buk] for
   details of the many bukkit event types. When a string is supplied
   there is no need to provide the full class name - you should omit
   the 'org.bukkit.event' prefix. e.g. if the string
   "block.BlockBreakEvent" is supplied then it's converted to the
   org.bukkit.event.block.BlockBreakEvent class .
 
   If a java class is provided (say in the case where you've defined
   your own custom event) then provide the full class name (without
   enclosing quotes).

 * callback - A function which will be called whenever the event
   fires. The callback should take 2 parameters, listener (the Bukkit
   registered listener for this callback) and event (the event fired).

 * priority (optional - default: "HIGHEST") - The priority the
   listener/callback takes over other listeners to the same
   event. Possible values are "HIGH", "HIGHEST", "LOW", "LOWEST",
   "NORMAL", "MONITOR". For an explanation of what the different
   priorities mean refer to bukkit's [Event API Reference][buk2].

#### Returns

An org.bukkit.plugin.RegisteredListener object which can be used to
unregister the listener. This same object is passed to the callback
function each time the event is fired.

#### Example:

The following code will print a message on screen every time a block is broken in the game

    events.on('block.BlockBreakEvent', function(listener, evt){ 
        evt.player.sendMessage( evt.player.name + ' broke a block!');
    });

To handle an event only once and unregister from further events...
    
    events.on('block.BlockBreakEvent', function(listener, evt){ 
        evt.player.sendMessage( evt.player.name + ' broke a block!');
        evt.handlers.unregister(listener);
    });

To unregister a listener *outside* of the listener function...

    var myBlockBreakListener = events.on('block.BlockBreakEvent',function(l,e){ ... });
    ...
    var handlers = org.bukkit.event.block.BlockBreakEvent.getHandlerList();
    handlers.unregister(myBlockBreakListener);

To listen for events using a full class name as the `eventName` parameter...

    events.on(org.bukkit.event.block.BlockBreakEvent, function(listener, evt){ 
        evt.player.sendMessage( evt.player.name + ' broke a block!');
    });

[buk2]: http://wiki.bukkit.org/Event_API_Reference
[buk]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/event/Event.html

***/

var bkEvent = org.bukkit.event;
var bkEvtExecutor = org.bukkit.plugin.EventExecutor;
var bkRegListener = org.bukkit.plugin.RegisteredListener;

exports.on = function( 
    /* String or java Class */
    eventType, 
    /* function( registeredListener, event) */ 
    handler,   
    /* (optional) String (HIGH, HIGHEST, LOW, LOWEST, NORMAL, MONITOR), */
    priority   ) {

    if (typeof priority == "undefined"){
        priority = bkEvent.EventPriority.HIGHEST;
    }else{
        priority = bkEvent.EventPriority[priority];
    }
    if (typeof eventType == "string"){
        /*
          Nashorn doesn't support bracket notation for accessing packages. 
          E.g. java.net will work but java['net'] won't. 
          
          https://bugs.openjdk.java.net/browse/JDK-8031715
        */
        if (typeof Java != 'undefined'){
            // nashorn environment
            eventType = Java.type('org.bukkit.event.' + eventType);
        } else {
            eventType = eval('org.bukkit.event.' + eventType);
        }
    }
    var handlerList = eventType.getHandlerList();
    var listener = {};
    var eventExecutor = new bkEvtExecutor(){
        execute: function(l,e){
            handler(listener.reg,e);
        } 
    };
    /* 
       wph 20130222 issue #64 bad interaction with Essentials plugin
       if another plugin tries to unregister a Listener (not a Plugin or a RegisteredListener)
       then BOOM! the other plugin will throw an error because Rhino can't coerce an
       equals() method from an Interface.
       The workaround is to make the ScriptCraftPlugin java class a Listener.
       Should only unregister() registered plugins in ScriptCraft js code.
    */
    listener.reg = new bkRegListener( __plugin, eventExecutor, priority, __plugin, true);
    handlerList.register(listener.reg);
    return listener.reg;
};
