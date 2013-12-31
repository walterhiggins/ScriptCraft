# Let's begin...

I created ScriptCraft to make it easier for younger programmers to
create their own Minecraft Mods. ScriptCraft makes it easier for new
programmers to create Minecraft mods. Mods are written using the
Javascript programming language and once the ScriptCraft mod is
installed, you can add your own new Mods by adding Javascript (.js)
files in a directory.

 * If you're new to programming and want to start modding Minecraft, then [Start Here][ypgpm].
 * If you've already used [Scratch][scr], have attended a few
   [CoderDojo][cd] sessions, or have already dabbled with Javascript,
   then [Start Here][cda].
 * Watch some [demos][ytpl] of what you can do with ScriptCraft.

# Description

ScriptCraft is a plugin for Minecraft Servers which lets operators,
administrators and plug-in authors customize the game using
Javascript.  ScriptCraft makes it easier to create your own mods. Mods
can be written in Javscript and can use the full Bukkit API.  The
ScriptCraft mod also lets you enter javascript commands at the in-game
prompt.  To bring up the in-game prompt press the `/` key then type
`js ` followed by any javascript statement.  E.g. `/js 1+1` will print
2.

ScriptCraft also includes many objects and functions to make building
and modding easier using Javascript. The Javascript `Drone` object
bundled with ScriptCraft provides an easy way to build at-scale in
Minecraft. See the attached [cottage.js][cottage] file for an example
of how you can use the sample Drone plugin to create new buildings in
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

[ho]: blob/master/src/main/javascript/plugins/homes/homes.js
[ch]: blob/master/src/main/javascript/plugins/chat/color.js
[ar]: blob/master/src/main/javascript/plugins/arrows/arrows.js
[si]: blob/master/src/main/javascript/modules/signs/menu.js

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
via javascript once the ScriptCraft plugin is loaded. There are a
couple of useful Java objects exposed via javascript in the Bukkit
ScriptCraft plugin...

 * `__plugin` - the ScriptCraft Plugin itself. This is a useful
   starting point for accessing other Bukkit objects. The `__plugin`
   object is of type [org.bukkit.plugin.java.JavaPlugin][api] and all
   of its properties and methods are accessible. For example... `js
   __plugin.server.motd` returns the server's message of the day
   (javascript is more concise than the equivalent java code:
   __plugin.getServer().getMotd() ).

 * `server` - The top-level org.bukkit.Server object. See the [Bukkit API docs][bukapi] for reference.

 * `self` - The player/command-block or server console operator who
   invoked the `/js` command. Again, this is a good jumping off point for
   diving into the Bukkit API.

[dl]: http://scriptcraftjs.org/download
[api]: http://jd.bukkit.org/apidocs/org/bukkit/plugin/java/JavaPlugin.html
[ib]: http://wiki.bukkit.org/Setting_up_a_server
[cbdl]: http://dl.bukkit.org/downloads/craftbukkit/
[bukapi]: http://jd.bukkit.org/apidocs/

Further Reading
===============

ScriptCraft has [its own website][website] with further information.

 * To get started using ScriptCraft to Learn Javascript, read [The Young Person's Guide to Programming in Minecraft][yp].
 * The ScriptCraft [API documentation][api].
 * To delve deeper into creating your own minecraft mod for use by others, read [Creating a complete Minecraft Mod in  Javascript][mm].
 * Take a look at some [examples][ex]

You can find more information about [ScriptCraft on my blog][blog].

[blog]: http://walterhiggins.net/blog/cat-index-scriptcraft.html
[buk]: https://github.com/walterhiggins/ScriptCraft/blob/master/bukkit.md
[yp]: docs/YoungPersonsGuideToProgrammingMinecraft.md
[mm]: docs/Anatomy-of-a-Plugin.md
[api]: https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md
[website]: http://scriptcraftjs.org/
[ypgpm]: docs/YoungPersonsGuideToProgrammingMinecraft.md
[cd]: http://coderdojo.com/
[scr]: http://scratch.mit.edu/
[cda]: http://cdathenry.wordpress.com/category/modderdojo/
[ytpl]: http://www.youtube.com/watch?v=DDp20SKm43Y&list=PL4Tw0AgXQZH5BiFHqD2hXyXQi0-qFbGp_
[ex]: ./tree/master/src/main/javascript/plugins/examples
