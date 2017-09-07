# ScriptCraft - Modding Minecraft with JavaScript

## Description

Anything you can do using the SpigotMC API in Java, you can do using ScriptCraft in JavaScript.

ScriptCraft is a plugin for Minecraft Servers which lets operators, administrators and plug-in authors customize the game using JavaScript.  ScriptCraft makes it easier to create your own mods. Mods can be written in JavaScript and can use the full [SpigotMC API][spigot].

ScriptCraft is used in code camps, schools, and with families at home, to learn programming in a fun and familiar environment.

The ScriptCraft plugin also lets you enter JavaScript commands at the in-game prompt.  To bring up the in-game prompt press the `/` key then type `js ` followed by any JavaScript statement.  For example: `/js 1 + 1` will print 2 ... but it's a lot more fun to generate a building from the command-line, or to blow up a mountain of TNT ...

ScriptCraft also includes many objects and functions to make building and modding easier using JavaScript. For example, the JavaScript `Drone` object bundled with ScriptCraft provides an easy way to build at-scale in Minecraft.

More introductory info is found below.

## Latest Updates

Branch "Bad-Zombie" is the working name of the first of several v3.2+ catch-up builds intended to move forward from production version 3.2.0 from 2016. Watch the branch updates here for details of changes. While the branch remains "Bad Zombie", the point-releases are moving through 3.2.2.X. When this release goes production after beta and adequate feedback, this will become the new v3.3.0.

**This v3.2.2.8 is a BETA release**
Please post all issues with the production ScriptCraft release to the [official repo][repo].
However this release is now BETA quality and may be installed in test environments. If you do install and run this, please post all feedback to the [Issue tracker here][tgtracker] or to the [Google Group][scforum].

See the new [Dependencies][deps] documentation which has a general-purpose explanation of how plugins work with Minecraft and where ScriptCraft and Spigot fit in the structure.

CanaryMod docs have been removed from this release. CanaryMod is no longer available. There are still many references to CanaryMod but Bukkit/CraftBukkit/Spigot is the only server currently supported.

## Get Social / Stay Informed

* Visit the [Gitter Chatroom][gitchat] to discuss this plugin.
* Or visit the [ScriptCraft Google Group/Forum][scforum].
* [Facebook][facebook]
* [Twitter][twitter] (Use hashtags #Minecraft and #JavaScript, and reference @ScriptCraftJS!)
* [YouTube vids][youtube]
* To keep up with changes, see [Tony's blog][blogt].
* See the new and updated [documentation][docs]

## Introduction

ScriptCraft, also known as ScriptCraftJS, lets you write Minecraft plugins using JavaScript - a programming language that's relatively easy to learn and use. ScriptCraft is a Minecraft Server plugin which means it must be used with a Minecraft server. Once you've downloaded and installed the Minecraft Server, then installed the ScriptCraft Plugin, you can write your own Minecraft plugins using JavaScript.

Walter Higgins created ScriptCraft to make it easier for younger programmers to create their own Minecraft Mods/Plugins. Mods are written using the JavaScript programming language. Once the ScriptCraft plugin is installed, you can add your own new plugins by adding JavaScript (.js) files in a directory.

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

## Prerequisites

ScriptCraft is a Minecraft Server plugin which only works with Minecraft for personal computers and hosted servers running Windows, Mac, or Linux. It does not work with X-BOX, Playstation, mobile, Windows10, or WiiU versions of the game. You will need to have Java version 1.8 or later installed. Check the Java version by typing `java -version` at a command prompt.

## Installation

Before installing ScriptCraft you must first install or build SpigotMC which is a special version of Minecraft Server that makes it easy to customize the game.

See the [Installation][installation] doc for details on installing Spigot and ScriptCraft.

## Your first mod - Howling blocks
Listed below is a simple mod that will make blocks 'Howl' when they're broken.

```javascript
// copy and paste this code to a new file named 'scriptcraft/plugins/howling-blocks.js'
var sounds = require('sounds');
function howl(event){
  sounds.entityWolfHowl( event.block );
}
events.blockBreak( howl );
```

A JavaScript plugin for Minecraft is just a JavaScript source file (.js) located in the `scriptcraft/plugins` directory. All .js files in this directory will be automatically loaded when the server starts.

To get started writing your own plugin, take a look at some of the [examples][examples].

## Additional information

Because the SpigotMC API is open, all of the SpigotMC API is accessible via JavaScript once the ScriptCraft plugin is loaded. There are a couple of useful Java objects exposed via JavaScript in the ScriptCraft plugin:

 * `__plugin` &ndash; the ScriptCraft Plugin itself. This is a useful
   starting point for accessing other SpigotMC objects. The `__plugin`
   object is of type [org.bukkit.plugin.Plugin][spigotapi] and all
   of its properties and methods are accessible. For example: `js
   __plugin.name` returns the plugin's name
   (JavaScript is more concise than the equivalent Java code:
   `__plugin.getName()` ).

 * `server` &ndash; The top-level org.bukkit.Server object. See the [SpigotMC API docs][spigotapi] for reference.

 * `self` &ndash; The player/command-block or server console operator who
   invoked the `/js` command. Again, this is a good jumping off point for
   diving into the SpigotMC API.

## Contributing

If you would like to contribute source code and/or documentation changes, or you would simply like to build and experiment with the code please [read Contributing.md][contrib]

## Status

Travis build status disabled for this repo. See .md comments.

<!--
[![Travis Build Status](https://api.travis-ci.org/walterhiggins/ScriptCraft.png)](http://travis-ci.org/walterhiggins/ScriptCraft)
-->

## Further Reading

ScriptCraft has [its own website][website] with further information.

 * To get started using ScriptCraft to Learn JavaScript, read [The Young Person's Guide to Programming in Minecraft][yp].
 * The ScriptCraft [API documentation][api].
 * To delve deeper into creating your own Minecraft plugins for use by others, read [Creating a complete Minecraft Mod in JavaScript][mm].
 * Take a look at some [examples][examples].
 * Buy the Official ScriptCraft Book [A Beginner's Guide to Writing Minecraft Plugins in JavaScript][book].

<a href="http://www.amazon.co.uk/gp/product/0133930149/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0133930149&linkCode=as2&tag=walthigg-21&linkId=P3LLGB3WTATW57AZ"><img border="0" src="http://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0133930149&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=walthigg-21" ></a><img src="http://ir-uk.amazon-adsystem.com/e/ir?t=walthigg-21&l=as2&o=2&a=0133930149" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

You can find more information about [ScriptCraft on Walter's blog][blogw] and on [Tony's blog][blogt].

# Additional Resources

CoderDojo Athenry have some [excellent tutorials][cda] for younger programmers who have used [Scratch][scr] and are interested in Modding Minecraft using JavaScript.  In particular, they have an excellent [Scratch - to - JavaScript][sj] tutorial which explains Scratch programs and how to do the same thing in JavaScript.

The series of [tutorials provided by CoderDojo Athenry][cda] is highly recommended.

Developer Chris Cacciatore has created some interesting tools using ScriptCraft:

 * [A wolf-bot][wb]
 * [L-Systems (Large-scale fractal structures in Minecraft)][ls]

# Docker

To launch a container with SpigotMC and ScriptCraft you can just do

      docker run -p 25565:25565 -it tclavier/scriptcraft

You can find all files used to build this container in github project: [docker-scriptcraft](https://github.com/tclavier/docker-scriptcraft) )( At this time that container includes an older version of Spigot 1.11 and ScriptCraft 3.2.1. The current platform is v1.12.1 with v3.2.2.X ("Bad Zombie").

[api]: docs/API-Reference.md
[blogt]: https://tonygravagno.tumblr.com/post/164339922687/what-is-scriptcraftjs-answer-1
[blogw]: http://walterhiggins.net/blog/cat-index-scriptcraft.html
[book]: http://www.peachpit.com/store/beginners-guide-to-writing-minecraft-plugins-in-javascript-9780133930146
[bukkit]: http://dl.bukkit.org/
[cd]: http://coderdojo.com/
[cda]: http://cdathenry.wordpress.com/category/modderdojo/
[cm]: http://canarymod.net/
[cmapi]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/
[contrib]: contributing.md
[cottage]: https://github.com/walterhiggins/ScriptCraft/tree/master/src/main/js/plugins/drone/contrib/cottage.js
[deps]: docs/Dependencies.md
[dl]: latest_jar/
<!-- [dl]: http://scriptcraftjs.org/download/latest -->
[docs]: docs
[drone]: https://github.com/walterhiggins/ScriptCraft/tree/master/src/main/javascript/drone/drone.js
[examples]: src/main/js/plugins/examples/
[facebook]: https://facebook.com/ScriptCraftJS
[gitchat]: https://gitter.im/walterhiggins/ScriptCraft
[gs]: http://www.glowstone.net/
[homes]: src/main/js/plugins/homes/homes.js
[ic]: http://canarymod.net/releases
[installation]: docs/Installation.md
[ls]: https://github.com/cacciatc/scriptcraft-lsystems
[mm]: docs/Anatomy-of-a-Plugin.md
[permissions]: docs/Permissions.md
[repo]: https://github.com/walterhiggins/ScriptCraft/issues
[scforum]: https://groups.google.com/forum/?fromgroups=#!forum/scriptcraft---scripting-minecraft
[scr]: http://scratch.mit.edu/
[sj]: http://cdathenry.wordpress.com/2013/10/12/modderdojo-week-2-moving-from-scratch-to-javascript/
[spigot]: http://www.spigotmc.org/
[spigotapi]: https://hub.spigotmc.org/javadocs/spigot/
[spigotdl]: https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
[temple]: https://github.com/walterhiggins/ScriptCraft/blob/master/src/main/js/plugins/drone/contrib/temple.js
[tgtracker]: https://github.com/TonyGravagno/ScriptCraft/issues
[twitter]: https://twitter.com/ScriptCraftJS
[wb]: https://github.com/cacciatc/wolfbot
[website]: http://scriptcraftjs.org/
[youtube]: https://www.youtube.com/channel/UCAd_RkaScQWT-Bx0PwYzZPQ
[yp]: docs/YoungPersonsGuideToProgrammingMinecraft.md
[ytpl]: http://www.youtube.com/watch?v=DDp20SKm43Y&list=PL4Tw0AgXQZH5BiFHqD2hXyXQi0-qFbGp