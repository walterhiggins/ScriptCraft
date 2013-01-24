Bukkit Support
==============

I've created a Bukkit Plugin version of ScriptCraft. Because the Bukkit API is open, it's possible to do a whole lot more in the Bukkit Plugin version than in the original MCP (Minecraft Coder Pack) version.
The Bukkit Plugin version is also *much easer to install*.

Prerequisites
=============
You will need to have Java version 6 or 7 installed on your machine. Check the version by typing `java -version` at a command prompt.
You will need to [install Bukkit][ib] on your machine. Bukkit is a version of Minecraft (server) that makes it easy to install plugins and customize Minecraft.
You can [download the CraftBukkit server here.][cbdl]

Installation
============
If you don't want to compile from source, you can [download the compiled plugin here][dl] and copy it the craftbukkit's plugins directory.

Post Install
============
Once installed, a new js-plugins directory is automatically created in the same directory as the plugins folder.
All files in the js-plugins directory will be automatically loaded when CraftBukkit starts.
*Only players who are ops can use this plugin.* You can grant a player `op` privileges by adding them to the ops.txt file in your craftbukkit directory.

Launch CraftBukkit, then launch the Minecraft client and create a new server connection. The IP address will be `localhost` . Once you've connected to your bukkit server and have entered the game, look at a ground-level block and type ...

    /js dancefloor().up().box('35:15', 4, 9, 1)

... This will create a black monolith structure 4 blocks wide by 9 blocks high by 1 block long.
Take a look at the js-plugins/drone/drone.js file to see what ScriptCraft's drone can do.
If you're interested in customizing minecraft beyond just creating new buildings, take a look at bukkit/event.js.

Additional information
======================
Because the Bukkit API is open, all of the Bukkit API is accessible via javascript once the ScriptCraft plugin is loaded. For example, in addition to the functions provided in the MCP version of ScriptCraft, there are a couple of useful Java objects exposed via javascript in the Bukkit ScriptCraft plugin...

 * `__plugin` - the ScriptCraft Plugin itself. This is a useful starting point for accessing other Bukkit objects. The `__plugin` object is of type [org.bukkit.plugin.java.JavaPlugin][api] and all of its properties and methods are accessible. For example... `js plugin.getServer().getMotd()` returns the server's message of the day.
 * `__self` - The player/command-block or server console operator who invoked the js command. Again, this is a good jumping off point for diving into the Bukkit API.

[dl]: http://walterhiggins.net/blog/files/scriptcraft/
[api]: http://jd.bukkit.org/apidocs/org/bukkit/plugin/java/JavaPlugin.html
[ib]: http://wiki.bukkit.org/Setting_up_a_server
[cbdl]: http://dl.bukkit.org/downloads/craftbukkit/
