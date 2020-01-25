'use strict';
/*global events, echo, isOp, __plugin*/
/*************************************************************************
## Example Plugin #7 - Listening for events, Greet players when they join the game.

A simple event-driven minecraft plugin. How to handle Events.

This example demonstrates event-driven programming. The code below
will display the version of ScriptCraft every time an operator joins
the game. This module is notable from previous modules for the
following reasons...

 1. It does not export any functions or variables. That's fine. Not
    all modules need export stuff. Code in this module will be
    executed when the module is first loaded. Because it is in the
    `/scriptcraft/plugins` directory, it will be loaded automatically
    when the server starts up.

 2. It uses ScriptCraft's `events` module to add a new *Event
    Handler*. An *Event Handler* is a function that gets
    called whenever a particular *event* happens in the game. The
    function defined below will only be executed whenever a player
    joins the game. This style of program is sometimes refered to as
    *Event-Driven Programming*.

Adding new *Event Handlers* in ScriptCraft is relatively easy. Use one
of the `events` module's functions to add a new event handler. The
events module has many functions - one for each type of event. Each
function takes a single parameter:

 * The event handling function (also sometimes refered to as a
   'callback'). In ScriptCraft, this function takes a single
   parameter, an event object. All of the information about the event
   is in the event object.

In the example below, if a player joins the server and is an operator,
then the ScriptCraft plugin information will be displayed to that
player.

```javascript
function onJoin( event ){
  if ( isOp(event.player) ) {
    echo( event.player, 'Welcome to ' + __plugin );
  }
}
events.connection( onJoin );
```
First the onJoin() function is defined, this is our event handler -
the function we wish to be called every time some new player joins the
game. Then we hook up - or register - that function using the
events.connection() function. The events.connection function is the
function responsible for adding new *connection* event handlers - that
is - functions which should be invoked when there's a new *connection*
event in the game. A new *connection* event is fired whenever a player
joins the game. There are many other types of events you can handle in
Minecraft. You can see [a full list of events here][cmEvtList].

[cmEvtList]: #events-helper-module-canary-version
***/

// wph 20140927 - event handler registration differs depending on framework.
function onJoin(event) {
  if (isOp(event.player)) {
    echo(event.player, 'Welcome to ' + __plugin);
  }
}
if (__plugin.canary) {
  // canarymod
  events.connection(onJoin);
} else {
  // bukkit
  events.playerJoin(onJoin);
}
