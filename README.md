# Let's begin &hellip;
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/walterhiggins/ScriptCraft?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

I created ScriptCraft to make it easier for younger programmers to
create their own Minecraft Mods. Mods are written using the
JavaScript programming language. Once the ScriptCraft mod is
installed, you can add your own new Mods by adding JavaScript (.js)
files in a directory.

 * If you're new to programming and want to start modding Minecraft, then [Start Here][yp].
 * If you've already used [Scratch][scr], have attended a few
   [CoderDojo][cd] sessions, or have already dabbled with JavaScript,
   then [Start Here][cda].
 * Watch some [demos][ytpl] of what you can do with ScriptCraft.

This is a simple mod in a file called greet.js in the scriptcraft/plugins directory &hellip;

```javascript
function greet( player ) {
  echo( player, 'Hello ' + player.name );
}
exports.greet = greet;
```

At the in-game prompt, type:

```javascript
/js greet(self)
```

Anything you can do using the CanaryMod or CraftBukkit APIs in Java,
you can do using ScriptCraft in JavaScript.

# Description

ScriptCraft is a plugin for Minecraft Servers which lets operators,
administrators and plug-in authors customize the game using
JavaScript.  ScriptCraft makes it easier to create your own mods. Mods
can be written in Javscript and can use the full [CanaryMod API][cm]
or [Bukkit API][bukkit]. ScriptCraft works with all of the following Minecraft Server software:

* [CanaryMod][cm] (Recommended)
* [SpigotMC][spigot] (Bukkit-compatible)
* [GlowStone][gs] (Bukkit-compatible)

[spigot]: http://www.spigotmc.org/
[gs]: http://www.glowstone.net/

I recommend using CanaryMod because CraftBukkit is no longer being
actively developed due to a legal dispute. The ScriptCraft mod also
lets you enter javascript commands at the in-game prompt.  To bring up
the in-game prompt press the `/` key then type `js ` followed by any
javascript statement.  For example: `/js 1 + 1` will print 2.

ScriptCraft also includes many objects and functions to make building
and modding easier using JavaScript. The JavaScript `Drone` object
bundled with ScriptCraft provides an easy way to build at-scale in
Minecraft. See the attached [temple.js][temple] file for an example
of how you can use the sample Drone plugin to create new buildings in
Minecraft.

[drone]: https://github.com/walterhiggins/ScriptCraft/tree/master/src/main/javascript/drone/drone.js
[cottage]: https://github.com/walterhiggins/ScriptCraft/tree/master/src/main/js/plugins/drone/contrib/cottage.js
[temple]: https://github.com/walterhiggins/ScriptCraft/blob/master/src/main/js/plugins/drone/contrib/temple.js
[bukkit]: http://dl.bukkit.org/
[cm]: http://canarymod.net/

# Prerequisites

* You will need to have Java version 6 or later installed on your
  machine. Check the version by typing `java -version` at a command
  prompt.

* You will need to [install CanaryMod][ic] on your
  machine. CanaryMod is a customized version of Minecraft Server that
  makes it easy to install plugins and customize Minecraft.  You can
  [download the CanaryMod server here.][ic]

# Installation

If you don't want to compile from source, you can [download the
compiled plugin here][dl] and copy it to the CanaryMod plugins directory.

# Post Install

Once installed, a new scriptcraft/plugins directory is automatically
created.  All files in the scriptcraft/plugins directory will be
automatically loaded when the server starts.  *Only players who are
ops can use this plugin.* You can grant a player `op` privileges by
typing 'op <username>' at the server console prompt or by adding the
player's username to the ops.txt file in your server directory.

Launch the server, then launch the Minecraft client and create a new
server connection. The IP address will be `localhost` . Once you've
connected to your server and have entered the game, look at a
ground-level block and type &hellip;

    /js up().box( blocks.wool.black, 4, 9, 1 )

&hellip; This will create a black monolith structure 4 blocks wide by 9
blocks high by 1 block long.  Take a look at the
src/main/javascript/drone/drone.js file to see what ScriptCraft's
drone can do.  If you're interested in customizing minecraft beyond
just creating new buildings, take a look at [the homes mod][homes] for an example of how to create a more fully-featured JavaScript plugin for Minecraft.

A JavaScript mod for minecraft is just a JavaScript source file (.js)
located in the scriptcraft/plugins directory. All .js files in this
directory will be automatically loaded when the server starts. To get
started writing your own mod, take a look at some of the
[examples][examples].

[homes]: src/main/js/plugins/homes/homes.js
[examples]: src/main/js/plugins/examples/

# Additional information

Because the CanaryMod API is open, all of the CanaryMod API is accessible
via javascript once the ScriptCraft plugin is loaded. There are a
couple of useful Java objects exposed via javascript in the
ScriptCraft plugin &hellip;

 * `__plugin` &ndash; the ScriptCraft Plugin itself. This is a useful
   starting point for accessing other CanaryMod objects. The `__plugin`
   object is of type [net.canarymod.plugin.Plugin][api] and all
   of its properties and methods are accessible. For example &hellip; `js
   __plugin.name` returns the plugin's name
   (JavaScript is more concise than the equivalent Java code:
   `__plugin.getName()` ).

 * `server` &ndash; The top-level net.canarymod.Server object. See the [CanaryMod API docs][cmapi] for reference.

 * `self` &ndash; The player/command-block or server console operator who
   invoked the `/js` command. Again, this is a good jumping off point for
   diving into the CanaryMod API.

[dl]: http://scriptcraftjs.org/download/latest
[api]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/
[ic]: http://canarymod.net/releases
[cmapi]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/

# Contributing

If you would like to contribute source code and/or documentation changes please [read contributing.md][contrib]

## Status

[![Travis Build Status](https://api.travis-ci.org/walterhiggins/ScriptCraft.png)](http://travis-ci.org/walterhiggins/ScriptCraft)

# Bukkit Configuration 
## (You can ignore this if using CanaryMod)

ScriptCraft also works with Bukkit Plugin and uses the Bukkit Configuration
API. On first loading, ScriptCraft will create a config.yml file in
the plugins/scriptcraft/ directory. This file looks like this &hellip;

    extract-js:
      plugins: true
      modules: true
      lib: true

This file allows scriptcraft admins to turn on or off re-unzipping of the `modules`,
`plugins` and `lib` folders when deploying a new version of
ScriptCraft. It's strongly recommended that the `lib` directory always
be set to true to get the latest core ScriptCraft code . The modules
and plugins directories are optional and not part of ScriptCraft core.

# Further Reading

ScriptCraft has [its own website][website] with further information.

 * To get started using ScriptCraft to Learn JavaScript, read [The Young Person's Guide to Programming in Minecraft][yp].
 * The ScriptCraft [API documentation][api].
 * To delve deeper into creating your own minecraft mod for use by others, read [Creating a complete Minecraft Mod in JavaScript][mm].
 * Take a look at some [examples][ex]
 * Buy the Official ScriptCraft Book [A Beginner's Guide to Writing Minecraft Plugins in Javascript][book]

<a href="http://www.amazon.co.uk/gp/product/0133930149/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0133930149&linkCode=as2&tag=walthigg-21&linkId=P3LLGB3WTATW57AZ"><img border="0" src="http://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0133930149&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=walthigg-21" ></a><img src="http://ir-uk.amazon-adsystem.com/e/ir?t=walthigg-21&l=as2&o=2&a=0133930149" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

You can find more information about [ScriptCraft on my blog][blog].

# Additional Resources

CoderDojo Athenry have some [excellent tutorials][cda] for younger
programmers who have used [Scratch][scr] and are interested in Modding
Minecraft using JavaScript.  In particular, they have an excellent
[Scratch - to - JavaScript][sj] tutorial which explains Scratch
programs and how to do the same thing in JavaScript.

I highly recommend the series of [tutorials provided by CoderDojo Athenry][cda].

Developer Chris Cacciatore has created some interesting tools using ScriptCraft &hellip;

 * [A wolf-bot][wb]
 * [L-Systems (Large-scale fractal structures in Minecraft)][ls] 

# Docker 

To launch a container with CanaryMod and ScriptCraft you can just do 

      docker run -p 25565:25565 -it tclavier/scriptcraft

You can find all files used to build this container in github project: [docker-scriptcraft](https://github.com/tclavier/docker-scriptcraft)

 
[wb]: https://github.com/cacciatc/wolfbot
[ls]: https://github.com/cacciatc/scriptcraft-lsystems

[blog]: http://walterhiggins.net/blog/cat-index-scriptcraft.html
[yp]: docs/YoungPersonsGuideToProgrammingMinecraft.md
[mm]: docs/Anatomy-of-a-Plugin.md
[api]: docs/API-Reference.md
[website]: http://scriptcraftjs.org/
[cd]: http://coderdojo.com/
[scr]: http://scratch.mit.edu/
[cda]: http://cdathenry.wordpress.com/category/modderdojo/
[ytpl]: http://www.youtube.com/watch?v=DDp20SKm43Y&list=PL4Tw0AgXQZH5BiFHqD2hXyXQi0-qFbGp_
[ex]: src/main/js/plugins/examples
[contrib]: contributing.md
[sj]: http://cdathenry.wordpress.com/2013/10/12/modderdojo-week-2-moving-from-scratch-to-javascript/
[book]: http://www.peachpit.com/store/beginners-guide-to-writing-minecraft-plugins-in-javascript-9780133930146
