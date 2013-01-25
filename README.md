ScriptCraft
===========
A Minecraft mod that lets you create mods using Javascript.

Description
===========
ScriptCraft is a plugin for Minecraft Servers which lets
operators/administrators/plug-in authors customize the game using
Javascript.  ScriptCraft makes it easier to create your own mods. Mods
can be written in Javscript and use the full Bukkit API.  The
ScriptCraft mod also lets you enter javascript commands at the in-game
prompt.  To bring up the in-game prompt press the `/` key then type
`js ` followed by any javascript statement.  E.g. `/js 1+1` will print
2.

ScriptCraft also includes many objects and functions to make building and modding easier using Javascript.

 * echo( message ) - displays a message on the player's screen. e.g. `/js echo( 1 + 3 )` or `/js echo ("Hello World")`
 * getMousePos() - A function which returns the current position of the cross-hairs (if a block is targeted)
 * getPlayerPos() - A function which returns the current position of the player.
 * putBlock( x, y, z, blockId, metaData ) - A function which lets you place a block anywhere (if no coordinates are given the block the player is currently looking at is replaced).
 * getBlock( x, y, z ) - returns the blockId and metadata at the given location (if no coordinates are given the cross-hair location is used)
 * putSign( String[] texts, x, y, z, blockId, metaData ) - A function which lets you place a sign.

The above primitives can be used to create buildings which would
otherwise be time-consuming to create manually.  It is highly
recommended using the attached [drone][drone] javascript plugin which
provides a fluent API for building.  The Javascript `Drone` class
provides a much richer API which can be used to construct
buildings. See the attached [cottage.js][cottage] file for an example
of you can use the sample Drone plugin to create new buildings in
Minecraft.

[drone]: https://github.com/walterhiggins/ScriptCraft/tree/master/src/main/javascript/drone/drone.js
[cottage]: https://github.com/walterhiggins/ScriptCraft/tree/master/src/main/javascript//drone/cottage.js

Prerequisites
=============
You will need to have Java version 6 or 7 installed on your
machine. Check the version by typing `java -version` at a command
prompt.  You will need to [install Bukkit][ib] on your machine. Bukkit
is a version of Minecraft (server) that makes it easy to install
plugins and customize Minecraft.  You can [download the CraftBukkit
server here.][cbdl]

Installation
============
If you don't want to compile from source, you can [download the
compiled plugin here][dl] and copy it the craftbukkit's plugins
directory.

Post Install
============
Once installed, a new js-plugins directory is automatically created in
the same directory as the plugins folder.  All files in the js-plugins
directory will be automatically loaded when CraftBukkit starts.  *Only
players who are ops can use this plugin.* You can grant a player `op`
privileges by typing 'op <username>' at the server console prompt or
by adding the player's username to the ops.txt file in your
craftbukkit directory.

Launch CraftBukkit, then launch the Minecraft client and create a new
server connection. The IP address will be `localhost` . Once you've
connected to your bukkit server and have entered the game, look at a
ground-level block and type ...

    /js up().box('35:15', 4, 9, 1)

... This will create a black monolith structure 4 blocks wide by 9
blocks high by 1 block long.  Take a look at the
src/main/javascript/drone/drone.js file to see what ScriptCraft's
drone can do.  If you're interested in customizing minecraft beyond
just creating new buildings, take a look at [./homes/homes.js][homes]
and [./chat/color.js][chatcolor] for examples of how to create a
javascript plugin for Minecraft.

[ho]: blob/master/src/main/javascript/homes/homes.js
[ch]: blob/master/src/main/javascript/chat/color.js
[ar]: blob/master/src/main/javascript/arrows/arrows.js
[si]: blob/master/src/main/javascript/signs/menu.js

A Javascript mod for minecraft is just a javascript source file (.js)
located in the craftbukkit/js-plugins directory. All .js files in this
directory will be automatically loaded when the craftbukkit server
starts. To get started writing your own mod, first take a look at some
of the existing mods in the [homes][ho], [chat][ch], [arrows][ar] and
[signs][si] directories. The chat/color.js mod is probably the
simplest mod to get started with.

Additional information
======================
Because the Bukkit API is open, all of the Bukkit API is accessible
via javascript once the ScriptCraft plugin is loaded. For example, in
addition to the functions provided in the MCP version of ScriptCraft,
there are a couple of useful Java objects exposed via javascript in
the Bukkit ScriptCraft plugin...

 * `__plugin` - the ScriptCraft Plugin itself. This is a useful starting point for accessing other Bukkit objects. The `__plugin` object is of type [org.bukkit.plugin.java.JavaPlugin][api] and all of its properties and methods are accessible. For example... `js __plugin.server.motd` returns the server's message of the day (javascript is more concise than the equivalent java code: __plugin.getServer().getMotd() ).
 * `self` - The player/command-block or server console operator who invoked the js command. Again, this is a good jumping off point for diving into the Bukkit API.
 * `bukkit` - The top-level Bukkit object. See the [Bukkit API docs][bukapi] for reference.

[dl]: http://walterhiggins.net/blog/files/scriptcraft/
[api]: http://jd.bukkit.org/apidocs/org/bukkit/plugin/java/JavaPlugin.html
[ib]: http://wiki.bukkit.org/Setting_up_a_server
[cbdl]: http://dl.bukkit.org/downloads/craftbukkit/
[bukapi]: http://jd.bukkit.org/apidocs/

Further Reading
===============

 * If you want to get started using ScriptCraft to Learn Javascript I recommend [reading this][yp].
 * If you want to delve deeper into creating your own minecraft mod, I recommend [reading this][mm].

You can find more information about [ScriptCraft on my blog][blog].

[blog]: http://walterhiggins.net/blog/cat-index-scriptcraft.html
[buk]: https://github.com/walterhiggins/ScriptCraft/blob/master/bukkit.md
[yp]: http://walterhiggins.net/blog/YoungPersonProgrammingMinecraft
[mm]: http://walterhiggins.net/blog/ScriptCraft-1-Month-later

