# ScriptCraft - Modding Minecraft with JavaScript

Branch ~~"Anxious-Villager"~~ "Bad-Zombie" is the first of several v3.2+ catch-up branches intended to move forward from production version 3.2.0 from 2016. Watch the branch updates here for details of changes. (Anxious-Villager got broken in the repo...)

### This is NOT a production release and should NOT be installed #

Please post all ScriptCraft issues to the [official repo][repo]

[repo]: https://github.com/walterhiggins/ScriptCraft/issues

Visit the [Gitter Chatroom](https://gitter.im/walterhiggins/ScriptCraft?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) to discuss this plugin.
Or visit the [ScriptCraft forum][scforum].
To keep up with changes, see [Tony's blog][blogt].

### Introduction

ScriptCraft, also known as ScriptCraftJS, lets you write Minecraft plugins using JavaScript - a
programming language that's relatively easy to learn and use.
ScriptCraft is a Minecraft Server plugin which means it must be used
with a Minecraft server. Once you've downloaded and installed the
Minecraft Server, then installed the ScriptCraft Plugin, you can write
your own Minecraft plugins using JavaScript.

Walter Higgins created ScriptCraft to make it easier for younger programmers to
create their own Minecraft Mods/Plugins. Mods are written using the
JavaScript programming language. Once the ScriptCraft plugin is
installed, you can add your own new plugins by adding JavaScript (.js)
files in a directory.

 * If you're new to programming and want to start modding Minecraft, then [Start Here][yp].
 * If you've already used [Scratch][scr], have attended a few
   [CoderDojo][cd] sessions, or have already dabbled with JavaScript,
   then [Start Here][cda].
 * Watch some [demos][ytpl] of what you can do with ScriptCraft.

This is a simple mod in a file called greet.js in the scriptcraft/plugins directory:

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

Anything you can do using the Spigot or CanaryMod APIs in Java,
you can do using ScriptCraft in JavaScript.

# Description

ScriptCraft is a plugin for Minecraft Servers which lets operators,
administrators and plug-in authors customize the game using
JavaScript.  ScriptCraft makes it easier to create your own mods. Mods
can be written in JavaScript and can use the full [SpigotMC
API][spigot] or [CanaryMod API][cm]. ScriptCraft works with all of the
following Minecraft Server software:

* [SpigotMC][spigot] (Recommended)
* [GlowStone][gs]
* [CanaryMod][cm]

[spigot]: http://www.spigotmc.org/
[gs]: http://www.glowstone.net/
[cm]: http://canarymod.net/

I recommend using SpigotMC because both CanaryMod and CraftBukkit are
no longer being actively developed. The ScriptCraft mod also lets you
enter javascript commands at the in-game prompt.  To bring up the
in-game prompt press the `/` key then type `js ` followed by any
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

# Prerequisites

ScriptCraft is a Minecraft Server Mod which only works with Minecraft
for Personal computers (Windows, Mac and Linux). It does not work with
X-BOX, Playstation, mobile, Windows10, or WiiU versions of the game.
You will need to have Java version 1.8 or later installed. Check the
version by typing `java -version` at a command prompt.

# Installation

Before installing ScriptCraft you must first install SpigotMC which is
a special version of Minecraft Server that makes it easy to customize
the game.

## Installing and Running SpigotMC

Follow these steps to download and install SpigotMC v1.12.1+.

1. Download Spigot's [BuildTools.jar][spigotdl]
2. Save the BuildTools.jar file to a new directory called spigotmc.
3. Open a terminal (Mac and Linux) or command prompt (windows) window and type `java -jar BuildTools.jar`. This will kick off a long series of commands to "build" SpigotMC.
4. When the build is done, there will be a new file beginning with `spigot` and ending in `.jar` in the spigotmc directory. Run this file by typing `java -jar spigot.jar` (it might not be that exact name - you can list files in the directory by typing `dir` (Windows) or `ls` (Mac and Linux).
5. The server will start up then shut down very shortly afterwards. You'll need to edit a file called `eula.txt` - change `eula=false` to `eula=true` and save the file.
6. Run the `java -jar spigot.jar` command again - this time the server will start up. Shut it down by typing `stop` at the server prompt.

## Installing ScriptCraft

Follow these steps to download and install ScriptCraft.

1. Download the [scriptcraft.jar][dl] plugin and save it to the `plugins` directory and restart the server by typing `java -jar spigot.jar`.
2. At the server prompt type `js 1 + 1` and hit enter. The result `2` should be displayed.

Congratulations - you've just installed your Custom Minecraft Server and are ready to begin writing your first mod!

# Post Install

Once installed, a new `scriptcraft/plugins` directory is automatically
created.  All files in the `scriptcraft/plugins` directory will be
automatically loaded when the server starts.  *Only players who are
ops can use this plugin.* You can grant a player `op` privileges by
typing 'op <username>' (replacing <username> with your own Minecraft
user name) at the server console prompt or by adding the player's
username to the ops.txt file in your server directory.

Launch the server, then launch the Minecraft client and create a new
server connection. The IP address will be `localhost` . Once you've
connected to your server and have entered the game, look at a
ground-level block and type:

    /js up().box( blocks.wool.black, 4, 9, 1 )

&hellip; This will create a black monolith structure 4 blocks wide by 9
blocks high by 1 block long.  Take a look at the
`src/main/javascript/drone/drone.js` file to see what ScriptCraft's
drone can do.

If you're interested in customizing Minecraft beyond just creating new buildings, take a look at [the homes mod][homes] for an example of how to create a more fully-featured JavaScript plugin for Minecraft.

## Your first mod - Howling blocks
Listed below is a simple mod that will make blocks 'Howl' when they're broken.

``` javascript
// copy and paste this code to a new file named 'scriptcraft/plugins/howling-blocks.js'
var sounds = require('sounds');
function howl(event){
  sounds.entityWolfHowl( event.block );
}
events.blockBreak( howl );
```

If you're using CanaryMod instead of SpigotMC you can [download the equivalent code](https://gist.github.com/walterhiggins/69cddd15160d803fb096).
(Note that ScriptCraft will not support CanaryMod in the v4.0 release.)

A JavaScript plugin for Minecraft is just a JavaScript source file (.js)
located in the `scriptcraft/plugins` directory. All .js files in this
directory will be automatically loaded when the server starts.

To get started writing your own plugin, take a look at some of the
[examples][examples].

[homes]: src/main/js/plugins/homes/homes.js
[examples]: src/main/js/plugins/examples/

# Additional information

Because the SpigotMC API is open, all of the SpigotMC API is accessible
via JavaScript once the ScriptCraft plugin is loaded. There are a
couple of useful Java objects exposed via JavaScript in the
ScriptCraft plugin:

 * `__plugin` &ndash; the ScriptCraft Plugin itself. This is a useful
   starting point for accessing other SpigotMC objects. The `__plugin`
   object is of type [org.bukkit.plugin.Plugin][api] and all
   of its properties and methods are accessible. For example: `js
   __plugin.name` returns the plugin's name
   (JavaScript is more concise than the equivalent Java code:
   `__plugin.getName()` ).

 * `server` &ndash; The top-level org.bukkit.Server object. See the [SpigotMC API docs][spigotapi] for reference.

 * `self` &ndash; The player/command-block or server console operator who
   invoked the `/js` command. Again, this is a good jumping off point for
   diving into the SpigotMC API.

[dl]: http://scriptcraftjs.org/download/latest
[api]: https://hub.spigotmc.org/javadocs/spigot/
[ic]: http://canarymod.net/releases
[spigotdl]: https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
[cmapi]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/
[spigotapi]: https://hub.spigotmc.org/javadocs/spigot/

# Contributing

If you would like to contribute source code and/or documentation changes please [read contributing.md][contrib]

## Status

Travis build status disabled for this repo. See .md comments.

<!--
[![Travis Build Status](https://api.travis-ci.org/walterhiggins/ScriptCraft.png)](http://travis-ci.org/walterhiggins/ScriptCraft)
-->

# Bukkit Configuration
## (You can ignore this if using CanaryMod ... but CanaryMod will no longer be supported in an upcoming major release of ScriptCraft.)

ScriptCraft works with the Bukkit/Spigot Mod and uses the Bukkit Configuration
API. On first loading, ScriptCraft will create a `config.yml` file in
the `plugins/scriptcraft` directory. This file looks like this:

    extract-js:
      plugins: true
      modules: true
      lib: true

This file allows ScriptCraft admins to turn on or off re-unzipping of the `modules`,
`plugins` and `lib` folders when deploying a new version of
ScriptCraft. It's strongly recommended that the `lib` directory always
be set to true to get the latest core ScriptCraft code . The modules
and plugins directories are optional and not part of ScriptCraft core.

# Further Reading

ScriptCraft has [its own website][website] with further information.

 * To get started using ScriptCraft to Learn JavaScript, read [The Young Person's Guide to Programming in Minecraft][yp].
 * The ScriptCraft [API documentation][api].
 * To delve deeper into creating your own Minecraft mod for use by others, read [Creating a complete Minecraft Mod in JavaScript][mm].
 * Take a look at some [examples][ex].
 * Buy the Official ScriptCraft Book [A Beginner's Guide to Writing Minecraft Plugins in JavaScript][book].

<a href="http://www.amazon.co.uk/gp/product/0133930149/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0133930149&linkCode=as2&tag=walthigg-21&linkId=P3LLGB3WTATW57AZ"><img border="0" src="http://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0133930149&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=walthigg-21" ></a><img src="http://ir-uk.amazon-adsystem.com/e/ir?t=walthigg-21&l=as2&o=2&a=0133930149" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

You can find more information about [ScriptCraft on Walter's blog][blogw] and on [Tony's blog][blogt].

# Additional Resources

CoderDojo Athenry have some [excellent tutorials][cda] for younger
programmers who have used [Scratch][scr] and are interested in Modding
Minecraft using JavaScript.  In particular, they have an excellent
[Scratch - to - JavaScript][sj] tutorial which explains Scratch
programs and how to do the same thing in JavaScript.

The series of [tutorials provided by CoderDojo Athenry][cda] is highly recommended.

Developer Chris Cacciatore has created some interesting tools using ScriptCraft:

 * [A wolf-bot][wb]
 * [L-Systems (Large-scale fractal structures in Minecraft)][ls]

# Docker

To launch a container with SpigotMC and ScriptCraft you can just do

      docker run -p 25565:25565 -it tclavier/scriptcraft

You can find all files used to build this container in github project: [docker-scriptcraft](https://github.com/tclavier/docker-scriptcraft)


[wb]: https://github.com/cacciatc/wolfbot
[ls]: https://github.com/cacciatc/scriptcraft-lsystems

[blogw]: http://walterhiggins.net/blog/cat-index-scriptcraft.html
[blogt]: https://tonygravagno.tumblr.com/post/164339922687/what-is-scriptcraftjs-answer-1
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
