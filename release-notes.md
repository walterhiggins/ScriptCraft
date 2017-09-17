RELEASE NOTES
=============

See the new [Help][help] doc for links to a large number of information resources.

[help]: docs/Help.md

3.2.3.4 ("Bad Zombie BETA")-2017-09-16
---------------------------------

1. Added blocks, PR#326 by CGMartin.
2. Fix to watcher, PR#328 by CGMartin.

3.2.3.3 ("Bad Zombie BETA")-2017-09-14
---------------------------------

1. Corrections/improvements in Installation.md and FAQ.

3.2.3.2 ("Bad Zombie BETA")-2017-09-10
---------------------------------

1. Fix: removed diagnostic output generated into helper .js code. Release bump required to get new JAR to unpack/load in server.

3.2.3.1 ("Bad Zombie BETA")-2017-09-10
---------------------------------

v3.2.3 begins the Release Candidate process. Changes are now frozen except for doc updates, minor typos, fixes reported during this BETA process. From 3.2.3.x the production release will be 3.3.0.

1. Lots of doc changes, link additions and corrections. Details in the commit diffs.
1. Significant FAQ update.
1. Moved installation details from YPG to Installation doc. (Need to test to ensure that links in all docs are accessible in various use cases.)

3.2.2.8a ("Bad Zombie")-2017-09-07
---------------------------------

1. *Developers!* : The root-level `contributing.md` doc has been updated and promoted to a first-class citizen and now resides in /doc as `Contributing.md`.
1. Added Dependencies.md.
1. Spigot.jar removed from the published repo. The documentation is now adequate for building a new/current .jar.
1. Removed CanaryMod jar in last commit but replaced it for now just to build.
1. Fixed some doc notes that lost formatting with default JS code formatting, also trivial typos.
1. The Drone.MAX_VOLUME value has been temporarily reduced from 1 million to 216 thousand due to server crashes. See comments in src/main/js/modules/drone/index.js and change if your server can support it. See [issue](https://github.com/walterhiggins/ScriptCraft/issues/337).
1. The final scriptcraft.jar file is now auto-copied to the /latest_jar folder. This is the file to drop into /plugins to install ScriptCraftJS.
1. Re-arranged README a bit, reduced size (cuz no one likes a long README), moved some info to Installation.md doc and elsewhere.
1. Other small changes.
1. Travis:
    1. On submitting the pull request to Walter's repo, Travis CI kicked in. While I was getting a good build in my (Tony) repo, Travis failed in Walter's. This happens when the Spigot.jar is removed. Rather than getting Travis to build a new Spigot.jar, or putting the file back into the repo, Travis is now pulling from a hard-coded DropBox file. So the repo still doesn't have the file, but Travis still gets a good build. That temporary solution will be modified later.
    1. Modified Travis CI to use latest JDK8 from Oracle and OpenJDK.
    1. If there is a failure, Travis will dump the .log files so we can see what went wrong.

3.2.2.7 ("Bad Zombie")-2017-09-03
---------------------------------

1. More doc updates.
1. Added support for blocking out doc text using BEGIN/END comments
1. CanaryMod sections are no longer in docs, using above BEGIN/END, Canary will be removed in v4.
1. Cow-Clicker from docs using above BEGIN/END, needs to be tested in Spigot for next release.
1. Added conditionals in build.xml to skip some processing related to CanaryMod.

3.2.2.6 ("Bad Zombie")-2017-09-01
---------------------------------

1. Added/updated **many** documentation pages.
    * Installation.md
    * UNInstallation.md
    * Help.md
    * StartStop.md
    * Permissions.md
1. Removed startup messages added for testing.
1. Changed messages in scripts from "not Yet supported for Canary" to simply "not supported for Canary" ... if it's not supported now for Canary then it will not be since support for Canary will be removed in v4.0.
1. Fixed issue where script formatting broke generated documentation.

3.2.2.5 ("Bad Zombie")-2017-08-24
---------------------------------

Cosmetic change : All .js JavaScript files have been formatted consistently. As noted below this might not be preferable formatting for everyone, but it is completely standardized throughout the app now.

3.2.2.4 ("Bad Zombie")-2017-08-23
---------------------------------

1. Fixed issue where install/startup failed due to variable issue.
1. Fixed regression where plugins folder got new folder "ScriptCraftJS" rather than long-time documented "scriptcraft". (Would be nice not to be forced to stay this way, see resources/plugin.yml)
1. This release is now Nashorn-specific and will not work with Rhino, JDK 1.7, or Canary.
1. ~~New issue has somehow been introduced where documentation includes the full scriptcraft.js file.~~
1. Coding and building with NetBeans 8.2, I've re-fit the IDE with a new JavaScript code formatter that doesn't destroy the in-line comments. The next builds will have a lot of code formatting differences. These will be appealing for some, disagreeable to others, but I believe the code base is better with frequent formatting, we can discuss the nuances of style sometime later.

Status: At least it installs and runs. This release can be installed in a new environment:

1. You must be running Java 1.8 with Spigot 1.12.1.
1. **Get a full backup!** This alpha build is not for someone who is worried about a damaged world or lost scripts.
1. Stop your server
1. Delete plugins/scripcraft folder
1. Delete root /scriptcraft folder
1. Overwrite plugins/scriptcraft.jar with the file from this repo: /latest_jar/scriptcraft.jar
1. Start your server
1. Watch the console and please copy/paste/report issues.
1. In the console, try "js 2+2". If the console window shows "4", it's working. Go ahead and see what breaks.

3.2.2bz Release (2017 08 23)
----------------------------

1. Spaces added in code formatting cause doc generation to fail. generateTOC.js now allows 0+ spaces in code comments for ## and ### doc headers.
1. Corrected a few more typos, 'minecraft' to 'Minecraft', and a few ScriptCraft to ScriptCraftJS.
1. Verified completion of issue #338, closed pull request. Contribution by rmariuzzo.
1. Drone can now turn in a counter-clockwise direction with a negative count. Contribution by AndersBillLinden in pull #336.
1. Added doc information about how to create upside down stairs. Contribution by AndersBillLinden in pull #331.
1. In classroom mode, students can now unregister their listeners from outside the listener function. Contribution by cgmartin in pull #327.
1. The Drone constructor now accepts another Drone object, which includes all of the parameters required to clone to new Drone. Contribution by softwaremaverick in pull #323.
1. Started new Installation.md with more up-to-date notes on initial installation.
1. Started new Dependencies.md which explains the history of Canary, Bukkit, Spigot, etc and why we do or do not support various packages. (File is not yet included in this build.)

~~FIX: Issue with variable causes install to fail. **Do not install.**~~

3.2.2bz Release (2017 08 18)
--------------------------

Work in Progress : ~~"Anxious-Villager"~~ "Bad-Zombie"
(Not for beta/production use!)
**This build has not been run in even a test environment yet!**

1. Bug fixes and updated from Spigot 1.11.2 to Spigot 1.12.1.
    (org.bukkit.craftbukkit.v1_12_R1)
1. Minor doc updates.
1. Added some in-line code comments.
1. Some new blocks.
1. Changes to build.xml for ant.
1. Change in doc generation for Windows development.
1. Moved JDK version reference from build.xml to build.properties.
1. Updated license.txt to 2017.
1. Some code looks changed. In some places it has, but in others it's only been reformatted and minor typos have been corrected.
1. Modified .gitignore to serve as a backup for now, but  GH project shouldn't include build config data.


**TODO for Bad-Zombie:**

1. Check build.local.properties.
1. Check docker info in README.txt
1. Do we need CopyLibs?
1. Look at FAQ

3.2.1 Release (2016 12 23)
--------------------------

Bug fixes and updated from Spigot 1.9 to Spigot 1.11.2

3.2.0 Release (2016 03 20)
--------------------------

Bug fixes and updated from Spigot 1.8.8 to Spigot 1.9

Fixed issues #256 and #287

3.1.12 Release (2015 12 30)
---------------------------

Added new modules

* lightning

The entities module and lightning module are now documented.

To make lightning strikes when and where any arrow lands:

    var lightning = require('lightning');
    events.projectileHit( function( event ) {
      if (entities.arrow( event.projectile )
        lightning( event.projectile );
    });

3.1.11 Release (2015 11 21)
---------------------------

Added new modules

* entities
* spawn

And new Drone function `spawn()`

To use:
Point at a block then type...
```
/js spawn('ZOMBIE').fwd().times(5).right().back(5).times(6)
```

... unleash a horde of zombies (in 5x6 grid formation).

3.1.10 Release (2015 08 16)
---------------------------
Bug fix: modules/bukkit/sounds.js now works (fixed for Bukkit/SpigotMC/Glowstone)

3.1.9 Release (2015 08 01)
--------------------------
Bug fix: minigames/scoreboard.js module's updatePlayerScore() function did not work with latest version of CanaryMod.
Using /scoreboard command instead. See https://github.com/walterhiggins/ScriptCraft/issues/261

3.1.8 Release (2015 06 07)
--------------------------
Bug fix: Fixes drone on Spigot 1.8.7 with JDK 7 see
https://github.com/walterhiggins/ScriptCraft/issues/254


3.1.7 Release (2015 06 07)
--------------------------
Added workaround for https://bugs.openjdk.java.net/browse/JDK-8072596 to recipes module.

3.1.6 Release (2015 05 31)
--------------------------
Provide more helpful error messages when trying to require modules which don't exist e.g.
require('greetings') should fail but indicate if there's a 'greeting' module present instead.

Fixes problem with Fireworks module on Mac OS.

3.1.5 Release (2015 05 31)
--------------------------
CanaryMod version : Add events.connect as synonym for events.connnection for backward-compatibility
with 1.7.9 and book listings.

3.1.4 Release (2015 05 09)
--------------------------
Various bug fixes and new 'inventory' module.

3.1.3 Release (2015 03 02)
--------------------------
Various bug fixes.

3.1.2 Release (2015 02 16)
--------------------------
Bug fix release. Fixes bug #213 (http.request fixed for CanaryMod)
New blocks.slime and other block types.
Various other fixes. See https://github.com/walterhiggins/ScriptCraft/compare/3.1.1...3.1.2

3.1.1 Release (2015 01 24)
--------------------------
This is a bug fix release.
See https://github.com/walterhiggins/ScriptCraft/compare/3.1.0...master for bug fix details.

3.1.0 Release (2015 01 11)
--------------------------
Fixes issue #197

Extending Drone has been made easier. Drone is now a module so it can be required like this:

    var Drone = require('drone');
    Drone.extend(function myExtension(){ } );

There have been a number of documentation updates.
The Drone.copy() and Drone.paste() methods are deprecated.

New utils methods:

* utils.time(world) returns the time of day (in minecraft ticks) for a world
* utils.time24(world) returns the time of day (in minutes) for a world

The Arrows and Signs plugins have now been updated to support CanaryMod.

3.0.3 Release (2015 01 03)
--------------------------
Additional support for Drone methods in 1.7.10 and 1.8.
Fixes issues:

* 177: https://github.com/walterhiggins/ScriptCraft/issues/177
* 185: https://github.com/walterhiggins/ScriptCraft/issues/185
* 188: https://github.com/walterhiggins/ScriptCraft/issues/188

3.0.2 Release (2014 12 28)
--------------------------
This version includes fixes for CraftBukkit (1.7.X) and also fixes
problems on Mac OS X and includes some support for Drone methods in
Minecraft 1.8 (CanaryMod 1.2)

3.0.0 Release (2014 11 09)
----------------------------------
In September 2014, development of CraftBukkit was discontinued due to
a DMCA takedown notice.  ScriptCraft has since switched from
CraftBukkit to CanaryMod as the underlying framework.  ScriptCraft
continues to run on CraftBukkit but - for the immediate future -
future development efforts will be to ensure it works primarily on
CanaryMod.  When other frameworks like SpongePowered become available,

I hope to eventually support those too.

The biggest change in 3.0.0 is the removal of the short name event
registration function.

This will no longer work:

    events.on('block.BlockBreakEvent', function( event ) { ... });

Instead use this:

    events.blockDestroy( function( event ) { ... });

or

    events.on(net.canarymod.hook.block.BlockDestroyHook, function( event ) { ... });


2014 08 23
----------
Chessboard was broken, is now fixed.
Rainbows are now made from stained glass. Full range of stained_glass
colors is available in blocks variable.
SnowballFight mini-game has been removed. An improved version will be
available soon online.
chat plugin has been removed - will be available in another github repo soon.

2014 06 14
----------
Fix issue #140 - fails to build for JRE7
Changed command() documentation to conform with new way of using (passing a named function)

2014 05 31
----------
Fix bug in persistence module. Private load function wasn't returning result of scload.

2014 05 29
----------
Fix tab completion for /jsp command so that it conforms with tab completion norms in minecraft.
/jsp ice<TAB> completes to /jsp icecream
Hitting TAB again has no effect. Player must type space then hit TAB to get list of flavors.
This is consistent with how MC treats other commands for tab completion.

2014 05 19
----------
Improved Tab Completion to work with Java Enums too.

2014 05 12
----------
Turn off modality for conversations which are started via the 'input' module.
(with modality on, player.sendMessage() is suppressed but player.sendRawMessage() isn't.
 turning modality off as devs would expect player.sendMessage() to work - I did anyway)


2014 05 10
----------
Further simplification of events handling. The events.on() function
can still be used but additional functions are now provided for each
type of event.  For example, to register a custom player-join event
handler...

    events.playerJoin(function(event){
       event.player.sendMessage('welcome!');
    });

Added new sounds module for simpler sounds playback and in-game tab completion.
All of the org.bukkit.Sound enum values are attached to the sounds module.

2014 04 13
----------
Added asynchronous `input()` function module.

Version 2.0.6 (2014 03 15)
--------------------------
## Simplified Event handling code.

The callback function for event handling now only takes 1 single
parameter, the event which triggered the callback. The listener object
is bound to the callback function so within the callback function
`this` refers to the listener object. Unregistering listeners has also
been greatly simplified.  You can have an event handler which fires
only once by unregistering itself within the callback like this...

    events.on('player.PlayerJoinEvent', function( event ) {

       // do something
       event.player.sendMessage( "You're the first player to join" );

       // unregister so this function is called only once ever.
       this.unregister();

    });

The `events.on()` function also returns the same listener object as
`this` refered to inside the callback. The listener object has a
single method `unregister()` which can be called to stop listening for
the event.

# 2014 03 12

Added Drone.MAX_VOLUME and Drone.MAX_SIDE properties to specify limits
on size of Drone ops.  This is to stop individual players from hogging
the CPU in a classrom environment.

# 2014 03 08

Fixed issues #115 #122 #123

Improved background processing of Drone build commands.

# 2014 02 19

## Version 2.0.5

Asynchronous building. Drone now builds asynchronously.
Fixed Issue #119 (exceptions on reload/stop)

# 2014 02 11

## Version 2.0.4

Various bug fixes, enhanced classroom module and improved error logging on startup.

# 2014 01 17

Added support for communication with Arduino and other devices which
use the [MQTT protocol][mqtt] via a new `sc-mqtt` module. This module
requires a separate sc-mqtt.jar file downloadable from
<http://scriptcraftjs.org/download/extras/mqtt> which must be included
in the CraftBukkit classpath. If using MQTT in ScriptCraft, then
Craftbukkit should be launched like this...

    java -classpath craftbukkit.jar;sc-mqtt.jar org.bukkit.craftbukkit.Main

You can use the new `sc-mqtt` module like this to send and receive
messages between minecraft and an Arduino. For example to send a
message to the MQTT broker whenever a player breaks a block...

    var mqtt = require('sc-mqtt');
    var client = mqtt.client('tcp://localhost:1883','scripcraft');
    client.connect();

    events.on('block.BlockBreakEvent', function(listener, event){
        client.publish('minecraft','block-broken');
    });

To have minecraft react to inputs from an MQTT broker...

    var mqtt = require('sc-mqtt');
    var client = mqtt.client('tcp://localhost:1883','scripcraft');
    client.connect();
    client.onMessageArrived(function(topic, message){
        var payload = message.payload;
        if (topic == 'arduino'){
           // do something with payload.
        }
    });

[mqtt]: http://mqtt.org/
# 2014 01 14

Added config.yml file for configuration options. This file allows
scriptcraft admins to turn on or off re-unzipping of the modules,
plugins and lib folders when deploying a new version of
scriptcraft. It's strongly recommended that the lib directory always
be set to true to get the latest core scriptcraft code . The modules
and plugins directories are optional and not part of scriptcraft core.
The config.yml file looks like this...

    extract-js:
      plugins: true
      modules: true
      lib: true

# 2014 01 13

Bug Fix: Make ScriptCraft work with Nashorn javascript engine bundled with Java 8
<https://github.com/walterhiggins/ScriptCraft/issues/112>

# 2014 01 12

## Important
The ScriptCraft.jar file has been renamed scriptcraft.jar (see bug fix
details below). This means that you will have to remove the existing
`plugins/ScriptCraft.jar` file if present.

Bug Fix: On Mac OS, the plugins/scriptcraft directory is copied to
plugins/ScriptCraftPlugin the 2nd time ScriptCraftPlugin is loaded.
This has been fixed by changing the plugin name from ScriptCraftPlugin
to scriptcraft.  The jar file has also been rename from
ScriptCraft.jar to scriptcraft.jar.

New command: `jsp spawn` lets in-game operators spawn any type of
entity. For example `/jsp spawn cow` will spawn a cow at the in-game
operator's current location.

New minigame: Cow Clicker. A simple demonstration of using Bukkit's
Scoreboard API. Players click cows to score points. Scores are
displayed in a side bar on screen. Players join or leave the game by
typing `/jsp cowclicker` at the in-game prompt.

# 2014 01 05

Bug Fix: On Mac OS, alias plugin caused Exceptions due to missing
.trim() function on String.

Changed target for compilation to 1.6 so that ScriptCraft will work
with both java 1.6 and 1.7.

Added documentation for the Signs module.

# 2014 01 02

Added a warning in console at start-up if legacy directories are detected.
Added 'use strict' to core modules.
Bug Fix; Signs were not being saved. (introduced with recent change to JSONifying Location)

# 2014 01 01

'Buddha' Release - towards a total annihilation of the 'self' variable.
The 'self' variable should only be used at the in-game or server
console command prompts and should not be used in modules or in
multi-threaded code.

Moved scriptcraft directory from {craftbukkit-root}/scriptcraft to
{craftbukkit-root}/plugins/scriptcraft because this seems to be where
other plugins create plugin-specific directories on the filesystem.

Documentation updates. Added new sections to the Young Persons Guide
to Modding Minecraft.

# 2013 12 30

Removing coffeescript support because coffeescript.js will not
compile/evaluate (generated bytecode exceeds 64K limit).

Updated plugin to remove `self` variable once the `js` command
evaluation has completed (limits the scope of the `self` variable to
just command-prompt evaluation).

# 2013 12 29

Bug Fix: [Can't get Scriptcraft core libraries working][bug103].

[bug103]: https://github.com/walterhiggins/ScriptCraft/issues/103

Bug Fix; Server console errors when empty commands submitted.

Added more example modules.

# 2013 12 28

Documented the 'homes' module other tweaks to documentation.

# 2013 12 27

## Updated 'jsp alias' command.

The 'jsp alias' command now lets players define their own shortcuts
which don't require the 'jsp ' prefix.

### Example

At the in-game prompt use the following command to create a new alias
`cw` (short for change Clock & Weather) which will change the time and
weather using a single statement.

    /jsp alias set cw = time set {1} ; weather {2}

This creates a new cw alias which takes 2 parameters, time and weather
and passes them to the 'time set' and 'weather' commands. You use the
alias like this...

    /cw 4000 sun

... which in turn gets converted into these 2 commands...

    /time set 4000
    /weather sun

Aliases can be set on a per-player basis or can be set globally (for
all players). Aliases are automatically saved and restore on server
shutdown/startup.

## Added console global variable.

ScriptCraft now has a `console` global variable which can be used for
logging (to the server console). The `console` variable uses the
ScriptCraft plugin Logger object. You use the console object in your
javascript modules like this...

    console.info('Hello %s, %s', 'World', 'Universe');

... or simply...

    console.warn('Hello World');

# 2013 12 26

Made the `events` variable global because it is use by modules and
plugins. This means there is no longer any need to explicitly
`require('events')` since `events` is now a free variable in the
global namespace.

# 2013 12 25

Added the 'commando' module.

# 2013 12 24

## 'Modules' release

### Modules in ScriptCraft

ScriptCraft now has a simple module loading system. ScriptCraft now
uses the [CommonJS module contract][cjsmod] - that is - the same
module system used by Node.js. All of the javascript code which comes
bundled with ScriptCraft has been modified so that it conforms to the
CommonJS module system.

### What this means for plugins you've developed using ScriptCraft

If you have written plugins using a previous version of ScriptCraft then you have 2 options...

 1. Continue using the previous version of ScriptCraft.
 2. Update your plugins to work with the ScriptCraft 'Modules' release.

... Option 2 should be relatively straightforward if you follow these steps...

 1. Copy your own custom plugins from the `js-plugins` directory to the new `scriptcraft/plugins` directory.
 2. In your javascript code any functions, objects or variables which
    you want to expose for use by others should be exposed using the
    special `exports` variable. All other code within your .js files will
    now be private by default. See below for details on how
    CommonJS/Node.js modules work.

If you have any questions or concerns or need help converting your
existing JavaScript plugin, contact please post questions on the
[ScriptCraft forum][scforum] or open an issue on the [Github
project][github]

[github]: http://github.com/walterhiggins/ScriptCraft
[scforum]: https://groups.google.com/forum/?fromgroups=#!forum/scriptcraft---scripting-minecraft

In ScriptCraft, files and modules are in one-to-one correspondence. As
an example, foo.js loads the module circle.js in the same directory.
*ScriptCraft now uses the same module system as Node.js - see [Node.js
Modules][njsmod] for more details.*

[njsmod]: http://nodejs.org/api/modules.html
[cjsmod]: http://wiki.commonjs.org/wiki/Modules/1.1.1

The contents of foo.js:

    var circle = require('./circle.js');
    echo( 'The area of a circle of radius 4 is '
               + circle.area(4));

The contents of circle.js:

    var PI = Math.PI;

    exports.area = function (r) {
      return PI * r * r;
    };

    exports.circumference = function (r) {
      return 2 * PI * r;
    };

The module circle.js has exported the functions area() and
circumference(). To add functions and objects to the root of your
module, you can add them to the special exports object.

Variables local to the module will be private, as though the module
was wrapped in a function. In this example the variable PI is private
to circle.js.

If you want the root of your module's export to be a function (such as
a constructor) or if you want to export a complete object in one
assignment instead of building it one property at a time, assign it to
module.exports instead of exports.

#### Module Loading

When the ScriptCraft Java plugin is first installed, a new
subdirectory is created in the craftbukkit directory. If your
craftbukkit directory is called 'craftbukkit' then the new
subdirectories will be ...

 * craftbukkit/scriptcraft/
 * craftbukkit/scriptcraft/plugins
 * craftbukkit/scriptcraft/modules
 * craftbukkit/scriptcraft/lib

... The `plugins`, `modules` and `lib` directories each serve a different purpose.

##### The plugins directory

At server startup the ScriptCraft Java plugin is loaded and begins
automatically loading and executing all of the modules (javascript
files with the extension `.js`) it finds in the `scriptcraft/plugins`
directory. All modules in the plugins directory are automatically
loaded into the `global` namespace. What this means is that anything a
module in the `plugins` directory exports becomes a global
variable. For example, if you have a module greeting.js in the plugins
directory....

    exports.greet = function() {
        echo('Hello ' + self.name);
    };

... then `greet` becomes a global function and can be used at the
in-game (or server) command prompt like so...

    /js greet()

... This differs from how modules (in NodeJS and commonJS
environments) normally work. If you want your module to be exported
globally, put it in the `plugins` directory. If you don't want your
module to be exported globally but only want it to be used by other
modules, then put it in the `modules` directory instead. If you've
used previous versions of ScriptCraft and have put your custom
javascript modules in the `js-plugins` directory, then put them in the
`scriptcraft/plugins` directory. To summarise, modules in this directory are ...

 * Automatically loaded and run at server startup.
 * Anything exported by modules becomes a global variable.

##### The modules directory

The module directory is where you should place your modules if you
don't want to export globally. In javascript, it's considered best
practice not to have too many global variables, so if you want to
develop modules for others to use, or want to develop more complex
mods then your modules should be placed in the `modules` directory.
*Modules in the `modules` directory are not automatically loaded at
startup*, instead, they are loaded and used by other modules/plugins
using the standard `require()` function.  This is the key difference
between modules in the `plugins` directory and modules in the
`modules` directory. Modules in the `plugins` directory are
automatically loaded and exported in to the global namespace at server
startup, modules in the `modules` directory are not.

##### The lib directory

Modules in the `lib` directory are for use by ScriptCraft and some
core functions for use by module and plugin developers are also
provided. The `lib` directory is for internal use by ScriptCraft.
Modules in this directory are not automatically loaded nor are they
globally exported.
