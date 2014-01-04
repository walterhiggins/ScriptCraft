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

 2. It uses ScriptCraft's `events.on()` function to add a new *Event
    Handler*. An *Event Handler* is a just a function which gets
    called whenever a particular *event* happens in the game. The
    function defined below will only be executed whenever a player
    joins the game. This style of program is sometimes refered to as
    *Event-Driven Programming*.

Adding new *Event Handlers* in ScriptCraft is relatively easy. Use the
`events.on()` function to add a new event handler. It takes 2
parameters...

 1. The Event Name, in this case `'player.PlayerJoinEvent'`. You can
    browse [all possible Bukkit events][bkevts] (click the 'Next
    Package' and 'Previous Package' links to browse).

 2. The event handling function (also sometimes refered to as a
    'callback'). In ScriptCraft, this function takes 2 parameters, a
    listener object and an event object. All of the information about
    the event is in the event object.

In the example below, if a player joins the server and is an operator,
then the ScriptCraft plugin information will be displayed to that
player.

What's also notable about this example is how it uses the [Bukkit
API][bkapi]. The code...

    if (event.player.op)

... is a succinct way of accessing object properties which in Java
would have to be written as ...

    if (event.getPlayer().isOp())

... ScriptCraft uses a special version of JavaScript which comes
bundled with Java (Minecraft is written in Java) and JavaScript in
Java can access properties of Java objects more succinctly than in
Java itself. What this means in practice is that when you're perusing
the [Bukkit API Reference][bkapi] and come across a method like
[Player.getAllowFlight()][bkgaf], you can write code like this...

    var allowFlight = player.getAllowFlight(); // java style

... or the more succinct ...

    var allowFlight = player.allowFlight; // javascript style

... Which style you choose is up to you but `player.allowFlight` is
cleaner and more readable. Similarly where you see a method like
[Player.setAllowFlight()][bksaf], you can write ...

    player.setAllowFlight(true); // java style

... or the more readable...

    player.allowFlight = true; // javascript style

... Which style you choose is up to you.

[bkevts]: http://jd.bukkit.org/dev/apidocs/org/bukkit/event/package-summary.html
[bkgaf]: http://jd.bukkit.org/dev/apidocs/org/bukkit/entity/Player.html#getAllowFlight()
[bksaf]: http://jd.bukkit.org/dev/apidocs/org/bukkit/entity/Player.html#setAllowFlight()
[bkapi]: http://jd.bukkit.org/dev/apidocs/

    events.on('player.PlayerJoinEvent', function (listener, event){
        if (event.player.op) {
            event.player.sendMessage('Welcome to ' + __plugin);
        }
    });

***/
events.on('player.PlayerJoinEvent', function (listener, event){
    if (event.player.op) {
        event.player.sendMessage('Welcome to ' + __plugin);
    }
});
