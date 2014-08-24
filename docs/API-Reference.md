# ScriptCraft API Reference

Walter Higgins

[walter.higgins@gmail.com][email]

[email]: mailto:walter.higgins@gmail.com?subject=ScriptCraft_API_Reference

## Table of Contents
 * [Modules in Scriptcraft](#modules-in-scriptcraft)
 * [Module Loading](#module-loading)
   * [The plugins directory](#the-plugins-directory)
   * [The modules directory](#the-modules-directory)
   * [The lib directory](#the-lib-directory)
   * [plugins sub-directories](#plugins-sub-directories)
 * [Global variables](#global-variables)
   * [__plugin variable](#__plugin-variable)
   * [server variable](#server-variable)
   * [self variable](#self-variable)
   * [config variable](#config-variable)
   * [events variable](#events-variable)
 * [Module variables](#module-variables)
   * [&#95;&#95;filename variable](#__filename-variable)
   * [&#95;&#95;dirname variable](#__dirname-variable)
 * [Global functions](#global-functions)
   * [echo function](#echo-function)
   * [require() function](#require-function)
   * [scload() function](#scload-function)
   * [scsave() function](#scsave-function)
   * [plugin() function](#plugin-function)
   * [command() function](#command-function)
   * [setTimeout() function](#settimeout-function)
   * [clearTimeout() function](#cleartimeout-function)
   * [setInterval() function](#setinterval-function)
   * [clearInterval() function](#clearinterval-function)
   * [refresh() function](#refresh-function)
   * [addUnloadHandler() function](#addunloadhandler-function)
 * [require - Node.js-style module loading in ScriptCraft](#require---nodejs-style-module-loading-in-scriptcraft)
   * [math.js](#mathjs)
   * [inc.js](#incjs)
   * [program.js](#programjs)
   * [Important](#important)
   * [module name resolution](#module-name-resolution)
 * [events Module](#events-module)
   * [events.on() static method](#eventson-static-method)
 * [console global variable](#console-global-variable)
   * [Example](#example)
   * [Using string substitutions](#using-string-substitutions)
 * [Events Helper Module](#events-helper-module)
   * [Usage](#usage)
   * [events.worldUnload()](#eventsworldunload)
   * [events.worldLoad()](#eventsworldload)
   * [events.chunkLoad()](#eventschunkload)
   * [events.chunkPopulate()](#eventschunkpopulate)
   * [events.portalCreate()](#eventsportalcreate)
   * [events.spawnChange()](#eventsspawnchange)
   * [events.chunkUnload()](#eventschunkunload)
   * [events.worldInit()](#eventsworldinit)
   * [events.horseJump()](#eventshorsejump)
   * [events.entityCombust()](#eventsentitycombust)
   * [events.entityRegainHealth()](#eventsentityregainhealth)
   * [events.entityCombustByBlock()](#eventsentitycombustbyblock)
   * [events.entityCombustByEntity()](#eventsentitycombustbyentity)
   * [events.playerLeashEntity()](#eventsplayerleashentity)
   * [events.pigZap()](#eventspigzap)
   * [events.itemDespawn()](#eventsitemdespawn)
   * [events.entityTarget()](#eventsentitytarget)
   * [events.slimeSplit()](#eventsslimesplit)
   * [events.entityChangeBlock()](#eventsentitychangeblock)
   * [events.entityPortalEnter()](#eventsentityportalenter)
   * [events.creeperPower()](#eventscreeperpower)
   * [events.entityDeath()](#eventsentitydeath)
   * [events.projectileHit()](#eventsprojectilehit)
   * [events.entityTame()](#eventsentitytame)
   * [events.potionSplash()](#eventspotionsplash)
   * [events.expBottle()](#eventsexpbottle)
   * [events.entityExplode()](#eventsentityexplode)
   * [events.creatureSpawn()](#eventscreaturespawn)
   * [events.foodLevelChange()](#eventsfoodlevelchange)
   * [events.entityInteract()](#eventsentityinteract)
   * [events.entityBreakDoor()](#eventsentitybreakdoor)
   * [events.entityCreatePortal()](#eventsentitycreateportal)
   * [events.sheepRegrowWool()](#eventssheepregrowwool)
   * [events.explosionPrime()](#eventsexplosionprime)
   * [events.entityUnleash()](#eventsentityunleash)
   * [events.entityShootBow()](#eventsentityshootbow)
   * [events.projectileLaunch()](#eventsprojectilelaunch)
   * [events.itemSpawn()](#eventsitemspawn)
   * [events.sheepDyeWool()](#eventssheepdyewool)
   * [events.entityTeleport()](#eventsentityteleport)
   * [events.blockFade()](#eventsblockfade)
   * [events.blockDamage()](#eventsblockdamage)
   * [events.blockPistonExtend()](#eventsblockpistonextend)
   * [events.blockExp()](#eventsblockexp)
   * [events.blockGrow()](#eventsblockgrow)
   * [events.blockPistonRetract()](#eventsblockpistonretract)
   * [events.blockDispense()](#eventsblockdispense)
   * [events.blockBreak()](#eventsblockbreak)
   * [events.paintingPlace()](#eventspaintingplace)
   * [events.lightningStrike()](#eventslightningstrike)
   * [events.vehicleEnter()](#eventsvehicleenter)
   * [events.vehicleMove()](#eventsvehiclemove)
   * [events.vehicleCreate()](#eventsvehiclecreate)
   * [events.asyncPlayerPreLogin()](#eventsasyncplayerprelogin)
   * [events.playerUnleashEntity()](#eventsplayerunleashentity)
   * [events.playerPreLogin()](#eventsplayerprelogin)
   * [events.inventoryPickupItem()](#eventsinventorypickupitem)
   * [events.inventoryMoveItem()](#eventsinventorymoveitem)
   * [events.furnaceBurn()](#eventsfurnaceburn)
   * [events.inventory()](#eventsinventory)
   * [events.brew()](#eventsbrew)
   * [events.furnaceExtract()](#eventsfurnaceextract)
   * [events.furnaceSmelt()](#eventsfurnacesmelt)
   * [events.inventoryClose()](#eventsinventoryclose)
   * [events.inventoryDrag()](#eventsinventorydrag)
   * [events.inventoryClick()](#eventsinventoryclick)
   * [events.inventoryCreative()](#eventsinventorycreative)
   * [events.hangingPlace()](#eventshangingplace)
   * [events.hangingBreak()](#eventshangingbreak)
   * [events.worldSave()](#eventsworldsave)
   * [events.structureGrow()](#eventsstructuregrow)
   * [events.entityDamage()](#eventsentitydamage)
   * [events.entityTargetLivingEntity()](#eventsentitytargetlivingentity)
   * [events.playerDeath()](#eventsplayerdeath)
   * [events.entityDamageByBlock()](#eventsentitydamagebyblock)
   * [events.entityDamageByEntity()](#eventsentitydamagebyentity)
   * [events.entityPortal()](#eventsentityportal)
   * [events.entityPortalExit()](#eventsentityportalexit)
   * [events.signChange()](#eventssignchange)
   * [events.leavesDecay()](#eventsleavesdecay)
   * [events.blockRedstone()](#eventsblockredstone)
   * [events.blockCanBuild()](#eventsblockcanbuild)
   * [events.blockBurn()](#eventsblockburn)
   * [events.blockPhysics()](#eventsblockphysics)
   * [events.blockIgnite()](#eventsblockignite)
   * [events.notePlay()](#eventsnoteplay)
   * [events.blockPlace()](#eventsblockplace)
   * [events.blockFromTo()](#eventsblockfromto)
   * [events.blockForm()](#eventsblockform)
   * [events.blockSpread()](#eventsblockspread)
   * [events.enchantItem()](#eventsenchantitem)
   * [events.prepareItemEnchant()](#eventsprepareitemenchant)
   * [events.paintingBreak()](#eventspaintingbreak)
   * [events.paintingBreakByEntity()](#eventspaintingbreakbyentity)
   * [events.weatherChange()](#eventsweatherchange)
   * [events.thunderChange()](#eventsthunderchange)
   * [events.vehicleEntityCollision()](#eventsvehicleentitycollision)
   * [events.vehicleBlockCollision()](#eventsvehicleblockcollision)
   * [events.vehicleExit()](#eventsvehicleexit)
   * [events.vehicleUpdate()](#eventsvehicleupdate)
   * [events.vehicleDamage()](#eventsvehicledamage)
   * [events.vehicleDestroy()](#eventsvehicledestroy)
   * [events.playerExpChange()](#eventsplayerexpchange)
   * [events.playerRespawn()](#eventsplayerrespawn)
   * [events.playerCommandPreprocess()](#eventsplayercommandpreprocess)
   * [events.playerPickupItem()](#eventsplayerpickupitem)
   * [events.playerInventory()](#eventsplayerinventory)
   * [events.playerFish()](#eventsplayerfish)
   * [events.playerBedEnter()](#eventsplayerbedenter)
   * [events.playerLogin()](#eventsplayerlogin)
   * [events.playerDropItem()](#eventsplayerdropitem)
   * [events.playerLevelChange()](#eventsplayerlevelchange)
   * [events.playerVelocity()](#eventsplayervelocity)
   * [events.playerInteract()](#eventsplayerinteract)
   * [events.playerQuit()](#eventsplayerquit)
   * [events.playerChatTabComplete()](#eventsplayerchattabcomplete)
   * [events.playerEggThrow()](#eventsplayereggthrow)
   * [events.playerChat()](#eventsplayerchat)
   * [events.playerAchievementAwarded()](#eventsplayerachievementawarded)
   * [events.playerBedLeave()](#eventsplayerbedleave)
   * [events.playerStatisticIncrement()](#eventsplayerstatisticincrement)
   * [events.playerToggleSprint()](#eventsplayertogglesprint)
   * [events.playerInteractEntity()](#eventsplayerinteractentity)
   * [events.playerEditBook()](#eventsplayereditbook)
   * [events.playerKick()](#eventsplayerkick)
   * [events.playerItemHeld()](#eventsplayeritemheld)
   * [events.playerItemConsume()](#eventsplayeritemconsume)
   * [events.playerGameModeChange()](#eventsplayergamemodechange)
   * [events.playerItemBreak()](#eventsplayeritembreak)
   * [events.playerToggleFlight()](#eventsplayertoggleflight)
   * [events.playerAnimation()](#eventsplayeranimation)
   * [events.asyncPlayerChat()](#eventsasyncplayerchat)
   * [events.playerRegisterChannel()](#eventsplayerregisterchannel)
   * [events.playerMove()](#eventsplayermove)
   * [events.playerTeleport()](#eventsplayerteleport)
   * [events.playerBucketFill()](#eventsplayerbucketfill)
   * [events.playerJoin()](#eventsplayerjoin)
   * [events.playerShearEntity()](#eventsplayershearentity)
   * [events.playerToggleSneak()](#eventsplayertogglesneak)
   * [events.playerChangedWorld()](#eventsplayerchangedworld)
   * [events.serverCommand()](#eventsservercommand)
   * [events.remoteServerCommand()](#eventsremoteservercommand)
   * [events.mapInitialize()](#eventsmapinitialize)
   * [events.serviceRegister()](#eventsserviceregister)
   * [events.serverListPing()](#eventsserverlistping)
   * [events.serviceUnregister()](#eventsserviceunregister)
   * [events.prepareItemCraft()](#eventsprepareitemcraft)
   * [events.inventoryOpen()](#eventsinventoryopen)
   * [events.craftItem()](#eventscraftitem)
   * [events.hangingBreakByEntity()](#eventshangingbreakbyentity)
   * [events.blockMultiPlace()](#eventsblockmultiplace)
   * [events.entityBlockForm()](#eventsentityblockform)
   * [events.playerBucketEmpty()](#eventsplayerbucketempty)
   * [events.playerPortal()](#eventsplayerportal)
   * [events.playerUnregisterChannel()](#eventsplayerunregisterchannel)
   * [events.pluginDisable()](#eventsplugindisable)
   * [events.pluginEnable()](#eventspluginenable)
 * [Blocks Module](#blocks-module)
   * [Examples](#examples)
 * [Fireworks Module](#fireworks-module)
   * [Examples](#examples-1)
 * [Asynchronous Input Module](#asynchronous-input-module)
 * [Http Module](#http-module)
   * [http.request() function](#httprequest-function)
 * [sc-mqtt module](#sc-mqtt-module)
   * [Usage](#usage-1)
 * [Signs Module](#signs-module)
   * [signs.menu() function](#signsmenu-function)
   * [signs.getTargetedBy() function](#signsgettargetedby-function)
 * [Sounds Module](#sounds-module)
   * [Usage:](#usage-2)
 * [Utilities Module](#utilities-module)
   * [utils.player() function](#utilsplayer-function)
   * [utils.locationToJSON() function](#utilslocationtojson-function)
   * [utils.locationToString() function](#utilslocationtostring-function)
   * [utils.locationFromJSON() function](#utilslocationfromjson-function)
   * [utils.getPlayerPos() function](#utilsgetplayerpos-function)
   * [utils.getMousePos() function](#utilsgetmousepos-function)
   * [utils.foreach() function](#utilsforeach-function)
   * [utils.nicely() function](#utilsnicely-function)
   * [utils.at() function](#utilsat-function)
   * [utils.find() function](#utilsfind-function)
   * [utils.serverAddress() function](#utilsserveraddress-function)
   * [utils.watchFile() function](#utilswatchfile-function)
   * [utils.watchDir() function](#utilswatchdir-function)
   * [utils.unwatchFile() function](#utilsunwatchfile-function)
   * [utils.unwatchDir() function](#utilsunwatchdir-function)
   * [utils.array() function](#utilsarray-function)
 * [Drone Plugin](#drone-plugin)
   * [Constructing a Drone Object](#constructing-a-drone-object)
   * [Drone.box() method](#dronebox-method)
   * [Drone.box0() method](#dronebox0-method)
   * [Drone.boxa() method](#droneboxa-method)
   * [Drone Movement](#drone-movement)
   * [Drone Positional Info](#drone-positional-info)
   * [Drone Markers](#drone-markers)
   * [Drone.prism() method](#droneprism-method)
   * [Drone.prism0() method](#droneprism0-method)
   * [Drone.cylinder() method](#dronecylinder-method)
   * [Drone.cylinder0() method](#dronecylinder0-method)
   * [Drone.arc() method](#dronearc-method)
   * [Drone.door() method](#dronedoor-method)
   * [Drone.door_iron() method](#dronedoor_iron-method)
   * [Drone.door2() method](#dronedoor2-method)
   * [Drone.door2_iron() method](#dronedoor2_iron-method)
   * [Drone.sign() method](#dronesign-method)
   * [Drone Trees methods](#drone-trees-methods)
   * [Drone.garden() method](#dronegarden-method)
   * [Drone.rand() method](#dronerand-method)
   * [Copy & Paste using Drone](#copy--paste-using-drone)
   * [Drone.copy() method](#dronecopy-method)
   * [Drone.paste() method](#dronepaste-method)
   * [Chaining](#chaining)
   * [Drone Properties](#drone-properties)
   * [Extending Drone](#extending-drone)
   * [Drone.extend() static method](#droneextend-static-method)
   * [Drone Constants](#drone-constants)
   * [Drone.times() Method](#dronetimes-method)
   * [Drone.blocktype() method](#droneblocktype-method)
   * [Drone.rainbow() method](#dronerainbow-method)
   * [Drone.sphere() method](#dronesphere-method)
   * [Drone.sphere0() method](#dronesphere0-method)
   * [Drone.hemisphere() method](#dronehemisphere-method)
   * [Drone.hemisphere0() method](#dronehemisphere0-method)
   * [Drone.spiral_stairs() method](#dronespiral_stairs-method)
 * [Example Plugin #1 - A simple extension to Minecraft.](#example-plugin-1---a-simple-extension-to-minecraft)
   * [Usage:](#usage-3)
 * [Example Plugin #2 - Making extensions available for all players.](#example-plugin-2---making-extensions-available-for-all-players)
   * [Usage:](#usage-4)
 * [Example Plugin #3 - Limiting use of commands to operators only.](#example-plugin-3---limiting-use-of-commands-to-operators-only)
   * [Usage:](#usage-5)
 * [Example Plugin #4 - Using parameters in commands.](#example-plugin-4---using-parameters-in-commands)
   * [Usage:](#usage-6)
 * [Example Plugin #5 - Re-use - Using your own and others modules.](#example-plugin-5---re-use---using-your-own-and-others-modules)
   * [Usage:](#usage-7)
 * [Example Plugin #6 - Re-use - Using 'utils' to get Player objects.](#example-plugin-6---re-use---using-utils-to-get-player-objects)
   * [Usage:](#usage-8)
 * [Example Plugin #7 - Listening for events, Greet players when they join the game.](#example-plugin-7---listening-for-events-greet-players-when-they-join-the-game)
 * [Arrows Plugin](#arrows-plugin)
   * [Usage:](#usage-9)
 * [Spawn Plugin](#spawn-plugin)
   * [Usage](#usage-10)
 * [alias Plugin](#alias-plugin)
   * [Examples](#examples-2)
 * [Classroom Plugin](#classroom-plugin)
   * [classroom.allowScripting() function](#classroomallowscripting-function)
 * [Commando Plugin](#commando-plugin)
   * [Description](#description)
   * [Example hi-command.js](#example-hi-commandjs)
   * [Example - timeofday-command.js](#example---timeofday-commandjs)
   * [Caveats](#caveats)
 * [homes Plugin](#homes-plugin)
   * [Basic options](#basic-options)
   * [Social options](#social-options)
   * [Administration options](#administration-options)
 * [NumberGuess mini-game:](#numberguess-mini-game)
   * [Description](#description-1)
   * [Example](#example-1)
 * [Cow Clicker Mini-Game](#cow-clicker-mini-game)
   * [How to Play](#how-to-play)
   * [Rules](#rules)
   * [Gameplay Mechanics](#gameplay-mechanics)

## Modules in Scriptcraft

ScriptCraft has a simple module loading system. In ScriptCraft, files
and modules are in one-to-one correspondence. As an example, foo.js
loads the module circle.js in the same directory. 
*ScriptCraft now uses the same module system as Node.js - see [Node.js Modules][njsmod] for more details.*

[njsmod]: http://nodejs.org/api/modules.html

The contents of foo.js:

```javascript
var circle = require('./circle.js');
console.log( 'The area of a circle of radius 4 is '
             + circle.area(4));
```

The contents of circle.js:

```javascript
var PI = Math.PI;
exports.area = function (r) {
    return PI * r * r;
};
exports.circumference = function (r) {
    return 2 * PI * r;
};
```

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

## Module Loading

When the ScriptCraft Java plugin is first installed, a new
subdirectory is created in the craftbukkit/plugins directory. If your
craftbukkit directory is called 'craftbukkit' then the new
subdirectories will be ...

 * craftbukkit/plugins/scriptcraft/
 * craftbukkit/plugins/scriptcraft/plugins
 * craftbukkit/plugins/scriptcraft/modules
 * craftbukkit/plugins/scriptcraft/lib

... The `plugins`, `modules` and `lib` directories each serve a different purpose.

### The plugins directory

At server startup the ScriptCraft Java plugin is loaded and begins
automatically loading and executing all of the modules (javascript
files with the extension `.js`) it finds in the `scriptcraft/plugins`
directory. All modules in the plugins directory are automatically
loaded into the `global` namespace. What this means is that anything a
module in the `plugins` directory exports becomes a global
variable. For example, if you have a module greeting.js in the plugins
directory....

```javascript
exports.greet = function(player) {
    player.sendMessage('Hello ' + player.name);
};
```

... then `greet` becomes a global function and can be used at the
in-game (or server) command prompt like so...

    /js greet(self)

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

### The modules directory

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

### The lib directory

Modules in the `lib` directory are for use by ScriptCraft and some
core functions for use by module and plugin developers are also
provided. The `lib` directory is for internal use by ScriptCraft.
Modules in this directory are not automatically loaded nor are they
globally exported.

### plugins sub-directories

As of December 24 2013, the `scriptcraft/plugins` directory has the following sub-directories...

 * drone - Contains the drone module and drone extensions. Drone was the first scriptcraft module.
 * mini-games - Contains mini-games 
 * arrows - The arrows module - Changes the behaviour of Arrows: Explosive, Fireworks, Teleportation etc.
 * signs - The signs module (includes example signs) - create interactive signs.
 * chat - The chat plugin/module 
 * alias - The alias plugin/module - for creating custom aliases for commonly-used commands.
 * home - The home module - for setting homes and visiting other homes.

## Global variables

There are a couple of special javascript variables available in ScriptCraft...
 
### __plugin variable
The ScriptCraft JavaPlugin object.

### server variable
The Minecraft Server object

### self variable
The current player. (Note - this value should not be used in multi-threaded scripts or event-handling code - it's not thread-safe). This variable is only safe to use at the in-game prompt and should *never* be used in modules. For example you can use it here...

    /js console.log(self.name)

... but not in any javascript module you create yourself or in any
event handling code. `self` is a temporary short-lived variable which
only exists in the context of the in-game or server command prompts.

### config variable
ScriptCraft configuration - this object is loaded and saved at startup/shutdown.

### events variable
The events object is used to add new event handlers to Minecraft.

## Module variables
The following variables are available only within the context of Modules. (not available at in-game prompt).

### &#95;&#95;filename variable
The current file - this variable is only relevant from within the context of a Javascript module.

### &#95;&#95;dirname variable
The current directory - this variable is only relevant from within the context of a Javascript module.

## Global functions

ScripCraft provides some global functions which can be used by all plugins/modules...

### echo function

The `echo()` function displays a message on the in-game screen. The message is displayed to the `self` player (this is usually the player who issued the `/js` or `/jsp` command).

#### Example

    /js echo('Hello World')

For programmers familiar with Javascript web programming, an `alert`
function is also provided.  `alert` works exactly the same as `echo`
e.g. `alert('Hello World')`.

#### Notes

The `echo` and `alert` functions are provided as convenience functions for beginning programmers. The use of these 2 functions is not recommended in event-handling code or multi-threaded code. In such cases, if you want to send a message to a given player then use the Bukkit API's [Player.sendMessage()][plsm] function instead.

[plsm]: http://jd.bukkit.org/dev/apidocs/org/bukkit/command/CommandSender.html#sendMessage(java.lang.String)

### require() function

ScriptCraft's `require()` function is used to load modules. The `require()` function takes a module name as a parameter and will try to load the named module.

#### Parameters

 * modulename - The name of the module to be loaded. Can be one of the following...

   - A relative file path (with or without `.js` suffix)
   - An absolute file path (with or without `.js` suffix)
   - A relative directory path (uses node.js rules for directories)
   - An absolute directory path (uses node.js rules for directories)
   - A name of the form `'events'` - in which case the `lib` directory and `modules` directories are searched for the module.

#### Return

require() will return the loaded module's exports.

### scload() function 

#### No longer recommended for use by Plugin/Module developers (deprecated)

scload() should only be used to load .json data.

#### Parameters

 * filename - The name of the file to load.
 * warnOnFileNotFound (optional - default: false) - warn if the file was not found.

#### Returns

scload() will return the result of the last statement evaluated in the file.

#### Example

    scload("myFile.js"); // loads a javascript file and evaluates it.

    var myData = scload("myData.json"); // loads a javascript file and evaluates it - eval'd contents are returned.

##### myData.json contents...

    { players: {
        walterh: {
          h: ["jsp home {1}"],
          sunny:["time set 0",
                 "weather clear"]
        }
      }
    }

### scsave() function

The scsave() function saves an in-memory javascript object to a
specified file. Under the hood, scsave() uses JSON (specifically
json2.js) to save the object. Again, there will usually be no need to
call this function directly as all javascript plugins' state are saved
automatically if they are declared using the `plugin()` function.  Any
in-memory object saved using the `scsave()` function can later be
restored using the `scload()` function.

#### Parameters

 * objectToSave : The object you want to save.
 * filename : The name of the file you want to save it to.

#### Example

```javascript
var myObject = { name: 'John Doe',
                 aliases: ['John Ray', 'John Mee'],
                 date_of_birth: '1982/01/31' };
scsave(myObject, 'johndoe.json');
```

##### johndoe.json contents...

    { "name": "John Doe", 
      "aliases": ["John Ray", "John Mee"], 
      "date_of_birth": "1982/01/31" 
    };

### plugin() function

The `plugin()` function should be used to declare a javascript module
whose state you want to have managed by ScriptCraft - that is - a
Module whose state will be loaded at start up and saved at shut down.
A plugin is just a regular javascript object whose state is managed by
ScriptCraft.  The only member of the plugin which whose persistence is
managed by Scriptcraft is `store` - this special member will be
automatically saved at shutdown and loaded at startup by
ScriptCraft. This makes it easier to write plugins which need to
persist data.

#### Parameters
 
 * pluginName (String) : The name of the plugin - this becomes a global variable.
 * pluginDefinition (Object) : The various functions and members of the plugin object.
 * isPersistent (boolean - optional) : Specifies whether or not the
   plugin/object state should be loaded and saved by ScriptCraft.

#### Example

See chat/color.js for an example of a simple plugin - one which lets
players choose a default chat color. See also [Anatomy of a
ScriptCraft Plugin][anatomy].
 
[anatomy]: ./Anatomy-of-a-Plugin.md

### command() function

The `command()` function is used to expose javascript functions for use by non-operators (regular players). Only operators should be allowed use raw javascript using the `/js ` command because it is too powerful for use by regular players and can be easily abused. However, the `/jsp ` command lets you (the operator / server administrator / plugin author) safely expose javascript functions for use by players.

#### Parameters
 
 * commandFunction: The named javascript function which will be invoked when the command is invoked by a player. The name of the function will be used as the command name so name this function accordingly. The callback function in turn takes 2 parameters...

   * params : An Array of type String - the list of parameters passed to the command.
   * sender : The [CommandSender][bukcs] object that invoked the command (this is usually a Player object but can be a Block ([BlockCommandSender][bukbcs]).

 * options (Array|Function - optional) : An array of command options/parameters which the player can supply (It's useful to supply an array so that Tab-Completion works for the `/jsp ` commands. If a function is supplied instead of an array then the function will be invoked at TAB-completion time and should return an array of strings.
 * intercepts (boolean - optional) : Indicates whether this command can intercept Tab-Completion of the `/jsp ` command - advanced usage - see alias/alias.js for example.

#### Example

    // javascript code
    function boo( params, sender) {
        sender.sendMessage( params[0] );
    }
    command( boo );
    
    # in-game execution
    /jsp boo Hi!
    > Hi!

To use a callback for options (TAB-Completion) ...

    
    function boo( params, sender ) {
       var receiver = server.getPlayer( params[0] );
       if ( receiver ){
          receiver.sendMessage( sender.name + ' says boo!');
       }
    }
    command( boo, bukkit.playerNames );

See chat/colors.js or alias/alias.js or homes/homes.js for more examples of how to use the `command()` function.

### setTimeout() function

This function mimics the setTimeout() function used in browser-based javascript. However, the function will only accept a function reference, not a string of javascript code.  Where setTimeout() in the browser returns a numeric value which can be subsequently passed to clearTimeout(), This implementation returns a [BukkitTask][btdoc] object which can be subsequently passed to ScriptCraft's own clearTimeout() implementation.

If Node.js supports setTimeout() then it's probably good for ScriptCraft to support it too.

[btdoc]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/BukkitTask.html

#### Example

```javascript
//
// start a storm in 5 seconds
//    
setTimeout( function() {
    var world = server.worlds.get(0);
    world.setStorm(true);
}, 5000);
```

### clearTimeout() function

A scriptcraft implementation of clearTimeout().

### setInterval() function

This function mimics the setInterval() function used in browser-based javascript. However, the function will only accept a function reference, not a string of javascript code.  Where setInterval() in the browser returns a numeric value which can be subsequently passed to clearInterval(), This implementation returns a [BukkitTask][btdoc] object which can be subsequently passed to ScriptCraft's own clearInterval() implementation.

If Node.js supports setInterval() then it's probably good for ScriptCraft to support it too.

[btdoc]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/BukkitTask.html

### clearInterval() function

A scriptcraft implementation of clearInterval().

### refresh() function

The refresh() function can be used to only reload the ScriptCraft plugin (it's like the `reload` command except it only reloads ScriptCraft). The refresh() function will ...

1. Disable the ScriptCraft plugin.
2. Unload all event listeners associated with the ScriptCraft plugin.
3. Enable the ScriptCraft plugin.

... refresh() can be used during development to reload only scriptcraft javascript files.
See [issue #69][issue69] for more information.

[issue69]: https://github.com/walterhiggins/ScriptCraft/issues/69

### addUnloadHandler() function

The addUnloadHandler() function takes a callback function as a parameter. The callback will be called when the ScriptCraft plugin is unloaded (usually as a result of a a `reload` command or server shutdown).

This function provides a way for ScriptCraft modules to do any required cleanup/housekeeping just prior to the ScriptCraft Plugin unloading.

## require - Node.js-style module loading in ScriptCraft

Node.js is a server-side javascript environment with an excellent
module loading system based on CommonJS. Modules in Node.js are really
simple. Each module is in its own javascript file and all variables
and functions within the file are private to that file/module only.
There is a very concise explanation of CommonJS modules at...

[http://wiki.commonjs.org/wiki/Modules/1.1.1.][cjsmodules]

Node.js also has good documentation on [Modules][njsmod].

If you want to export a variable or function you use the module.export
property.

For example imagine you have 3 files program.js, inc.js  and math.js ...

### math.js

```javascript
exports.add = function(a,b){
    return a + b;
}
```

### inc.js

```javascript
var math = require('./math');
exports.increment = function(n){
    return math.add(n, 1);
}
```

### program.js

```javascript
var inc = require('./inc').increment;
var a = 7;
a = inc(a);
print(a);
```

You can see from the above sample code that programs can use modules
and modules themeselves can use other modules. Modules have full
control over what functions and properties they want to provide to
others.

### Important

Although ScriptCraft now supports Node.js style modules, it does not
support node modules. Node.js and Rhino are two very different
Javascript environments. ScriptCraft uses Rhino Javascript, not
Node.js. Standard Node.js modules such as `'fs'` are not available in ScriptCraft.

Modules can be loaded using relative or absolute paths. Per the CommonJS
module specification, the '.js' suffix is optional.

[cjsmodules]: http://wiki.commonjs.org/wiki/Modules/1.1.1.

### module name resolution

When resolving module names to file paths, ScriptCraft uses the following rules...

 1. if the module does not begin with './' or '/' then ...

    1.1 Look in the 'scriptcraft/lib' directory. If it's not there then...
    1.2 Look in the 'scriptcraft/modules' directory. If it's not there then 
        Throw an Error.

 2. If the module begins with './' or '/' then ...
    
    2.1 if the module begins with './' then it's treated as a file path. File paths are 
        always relative to the module from which the require() call is being made.

    2.2 If the module begins with '/' then it's treated as an absolute path.

    If the module does not have a '.js' suffix, and a file with the same name and a .js sufix exists, 
    then the file will be loaded.

 3. If the module name resolves to a directory then...
    
    3.1 look for a package.json file in the directory and load the `main` property e.g.
    
    // package.json located in './some-library/'
    {
      "main": './some-lib.js',
      "name": 'some-library'
    }
    
    3.2 if no package.json file exists then look for an index.js file in the directory

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
   fires. The callback should take a single parameter, event (the event fired).

 * priority (optional - default: "HIGHEST") - The priority the
   listener/callback takes over other listeners to the same
   event. Possible values are "HIGH", "HIGHEST", "LOW", "LOWEST",
   "NORMAL", "MONITOR". For an explanation of what the different
   priorities mean refer to bukkit's [Event API Reference][buk2].

#### Returns

An object which can be used to unregister the listener. 

#### Example:

The following code will print a message on screen every time a block is broken in the game

```javascript
events.on( 'block.BlockBreakEvent', function( evt ) { 
    evt.player.sendMessage( evt.player.name + ' broke a block!');
} );
```

To handle an event only once and unregister from further events...

```javascript    
events.on( 'block.BlockBreakEvent', function( evt ) { 
    evt.player.sendMessage( evt.player.name + ' broke a block!');
    this.unregister();
} );
```

The `this` keyword when used inside the callback function refers to
the Listener object created by ScriptCraft. It has a single method
`unregister()` which can be used to stop listening. This is the same
object which is returned by the `events.on()` function.

To unregister a listener *outside* of the listener function...

```javascript    
var myBlockBreakListener = events.on( 'block.BlockBreakEvent', function( evt ) { ... } );
...
myBlockBreakListener.unregister();
```

To listen for events using a full class name as the `eventName` parameter...

```javascript    
events.on( org.bukkit.event.block.BlockBreakEvent, function( evt ) { 
    evt.player.sendMessage( evt.player.name + ' broke a block!');
} );
```

[buk2]: http://wiki.bukkit.org/Event_API_Reference
[buk]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/event/Event.html

## console global variable

ScriptCraft provides a `console` global variable with the followng methods...

 * log()  
 * info() 
 * warn()
 * error()

The ScriptCraft console methods work like the [Web API implementation][webcons].

### Example 

    console.log('Hello %s', 'world');

Basic variable substitution is supported (ScriptCraft's implementation
of console uses the Bukkit Plugin [Logger][lgr] under the hood and
uses [java.lang.String.format()][strfmt] for variable
substitution. All output will be sent to the server console (not
in-game).

### Using string substitutions

ScriptCraft uses Java's [String.format()][strfmt] so any string substitution identifiers supported by 
`java.lang.String.format()` are supported (e.g. %s , %d etc).

    for (var i=0; i<5; i++) {
      console.log("Hello, %s. You've called me %d times.", "Bob", i+1);
    }

[lgr]: http://jd.bukkit.org/beta/apidocs/org/bukkit/plugin/PluginLogger.html
[strfmt]: http://docs.oracle.com/javase/6/docs/api/java/lang/String.html#format(java.lang.String, java.lang.Object...)
[webcons]: https://developer.mozilla.org/en-US/docs/Web/API/console

## Events Helper Module
The Events helper module provides a suite of functions - one for each possible event.
For example, the events.blockBreak() function is just a wrapper function which calls events.on(org.bukkit.event.block.BlockBreakEvent, callback, priority)
This module is a convenience wrapper for easily adding new event handling functions in Javascript. 
At the in-game or server-console prompt, players/admins can type `events.` and use TAB completion 
to choose from any of the approx. 160 different event types to listen to.

### Usage

    events.blockBreak( function( event ) { 
      event.player.sendMessage('You broke a block!'); 
    });

... which is just a shorter and less error-prone way of writing ...

    events.on('block.BlockBreakEvent',function( event ) { 
      event.player.sendMessage('You broke a block!');
    });

The crucial difference is that the events module now has functions for each of the built-in events. The functions are accessible via TAB-completion so will help beginning programmers to explore the events at the server console window.

### events.worldUnload()

#### Parameters 

 * callback - A function which is called whenever the [world.WorldUnloadEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/WorldUnloadEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.worldLoad()

#### Parameters 

 * callback - A function which is called whenever the [world.WorldLoadEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/WorldLoadEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.chunkLoad()

#### Parameters 

 * callback - A function which is called whenever the [world.ChunkLoadEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/ChunkLoadEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.chunkPopulate()

#### Parameters 

 * callback - A function which is called whenever the [world.ChunkPopulateEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/ChunkPopulateEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.portalCreate()

#### Parameters 

 * callback - A function which is called whenever the [world.PortalCreateEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/PortalCreateEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.spawnChange()

#### Parameters 

 * callback - A function which is called whenever the [world.SpawnChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/SpawnChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.chunkUnload()

#### Parameters 

 * callback - A function which is called whenever the [world.ChunkUnloadEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/ChunkUnloadEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.worldInit()

#### Parameters 

 * callback - A function which is called whenever the [world.WorldInitEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/WorldInitEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.horseJump()

#### Parameters 

 * callback - A function which is called whenever the [entity.HorseJumpEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/HorseJumpEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityCombust()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityCombustEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityCombustEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityRegainHealth()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityRegainHealthEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityRegainHealthEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityCombustByBlock()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityCombustByBlockEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityCombustByBlockEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityCombustByEntity()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityCombustByEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityCombustByEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerLeashEntity()

#### Parameters 

 * callback - A function which is called whenever the [entity.PlayerLeashEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/PlayerLeashEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.pigZap()

#### Parameters 

 * callback - A function which is called whenever the [entity.PigZapEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/PigZapEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.itemDespawn()

#### Parameters 

 * callback - A function which is called whenever the [entity.ItemDespawnEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/ItemDespawnEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityTarget()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityTargetEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityTargetEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.slimeSplit()

#### Parameters 

 * callback - A function which is called whenever the [entity.SlimeSplitEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/SlimeSplitEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityChangeBlock()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityChangeBlockEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityChangeBlockEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityPortalEnter()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityPortalEnterEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityPortalEnterEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.creeperPower()

#### Parameters 

 * callback - A function which is called whenever the [entity.CreeperPowerEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/CreeperPowerEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityDeath()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityDeathEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityDeathEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.projectileHit()

#### Parameters 

 * callback - A function which is called whenever the [entity.ProjectileHitEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/ProjectileHitEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityTame()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityTameEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityTameEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.potionSplash()

#### Parameters 

 * callback - A function which is called whenever the [entity.PotionSplashEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/PotionSplashEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.expBottle()

#### Parameters 

 * callback - A function which is called whenever the [entity.ExpBottleEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/ExpBottleEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityExplode()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityExplodeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityExplodeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.creatureSpawn()

#### Parameters 

 * callback - A function which is called whenever the [entity.CreatureSpawnEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/CreatureSpawnEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.foodLevelChange()

#### Parameters 

 * callback - A function which is called whenever the [entity.FoodLevelChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/FoodLevelChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityInteract()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityInteractEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityInteractEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityBreakDoor()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityBreakDoorEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityBreakDoorEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityCreatePortal()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityCreatePortalEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityCreatePortalEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.sheepRegrowWool()

#### Parameters 

 * callback - A function which is called whenever the [entity.SheepRegrowWoolEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/SheepRegrowWoolEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.explosionPrime()

#### Parameters 

 * callback - A function which is called whenever the [entity.ExplosionPrimeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/ExplosionPrimeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityUnleash()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityUnleashEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityUnleashEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityShootBow()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityShootBowEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityShootBowEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.projectileLaunch()

#### Parameters 

 * callback - A function which is called whenever the [entity.ProjectileLaunchEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/ProjectileLaunchEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.itemSpawn()

#### Parameters 

 * callback - A function which is called whenever the [entity.ItemSpawnEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/ItemSpawnEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.sheepDyeWool()

#### Parameters 

 * callback - A function which is called whenever the [entity.SheepDyeWoolEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/SheepDyeWoolEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityTeleport()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityTeleportEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityTeleportEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockFade()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockFadeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockFadeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockDamage()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockDamageEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockDamageEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockPistonExtend()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockPistonExtendEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockPistonExtendEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockExp()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockExpEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockExpEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockGrow()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockGrowEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockGrowEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockPistonRetract()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockPistonRetractEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockPistonRetractEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockDispense()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockDispenseEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockDispenseEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockBreak()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockBreakEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockBreakEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.paintingPlace()

#### Parameters 

 * callback - A function which is called whenever the [painting.PaintingPlaceEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/painting/PaintingPlaceEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.lightningStrike()

#### Parameters 

 * callback - A function which is called whenever the [weather.LightningStrikeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/weather/LightningStrikeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleEnter()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleEnterEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleEnterEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleMove()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleMoveEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleMoveEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleCreate()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleCreateEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleCreateEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.asyncPlayerPreLogin()

#### Parameters 

 * callback - A function which is called whenever the [player.AsyncPlayerPreLoginEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/AsyncPlayerPreLoginEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerUnleashEntity()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerUnleashEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerUnleashEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerPreLogin()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerPreLoginEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerPreLoginEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryPickupItem()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryPickupItemEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryPickupItemEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryMoveItem()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryMoveItemEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryMoveItemEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.furnaceBurn()

#### Parameters 

 * callback - A function which is called whenever the [inventory.FurnaceBurnEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/FurnaceBurnEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventory()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.brew()

#### Parameters 

 * callback - A function which is called whenever the [inventory.BrewEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/BrewEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.furnaceExtract()

#### Parameters 

 * callback - A function which is called whenever the [inventory.FurnaceExtractEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/FurnaceExtractEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.furnaceSmelt()

#### Parameters 

 * callback - A function which is called whenever the [inventory.FurnaceSmeltEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/FurnaceSmeltEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryClose()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryCloseEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryCloseEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryDrag()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryDragEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryDragEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryClick()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryClickEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryClickEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryCreative()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryCreativeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryCreativeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.hangingPlace()

#### Parameters 

 * callback - A function which is called whenever the [hanging.HangingPlaceEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/hanging/HangingPlaceEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.hangingBreak()

#### Parameters 

 * callback - A function which is called whenever the [hanging.HangingBreakEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/hanging/HangingBreakEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.worldSave()

#### Parameters 

 * callback - A function which is called whenever the [world.WorldSaveEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/WorldSaveEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.structureGrow()

#### Parameters 

 * callback - A function which is called whenever the [world.StructureGrowEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/world/StructureGrowEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityDamage()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityDamageEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityDamageEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityTargetLivingEntity()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityTargetLivingEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityTargetLivingEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerDeath()

#### Parameters 

 * callback - A function which is called whenever the [entity.PlayerDeathEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/PlayerDeathEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityDamageByBlock()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityDamageByBlockEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityDamageByBlockEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityDamageByEntity()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityDamageByEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityDamageByEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityPortal()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityPortalEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityPortalEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityPortalExit()

#### Parameters 

 * callback - A function which is called whenever the [entity.EntityPortalExitEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/entity/EntityPortalExitEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.signChange()

#### Parameters 

 * callback - A function which is called whenever the [block.SignChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/SignChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.leavesDecay()

#### Parameters 

 * callback - A function which is called whenever the [block.LeavesDecayEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/LeavesDecayEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockRedstone()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockRedstoneEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockRedstoneEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockCanBuild()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockCanBuildEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockCanBuildEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockBurn()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockBurnEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockBurnEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockPhysics()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockPhysicsEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockPhysicsEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockIgnite()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockIgniteEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockIgniteEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.notePlay()

#### Parameters 

 * callback - A function which is called whenever the [block.NotePlayEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/NotePlayEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockPlace()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockPlaceEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockPlaceEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockFromTo()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockFromToEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockFromToEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockForm()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockFormEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockFormEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockSpread()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockSpreadEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockSpreadEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.enchantItem()

#### Parameters 

 * callback - A function which is called whenever the [enchantment.EnchantItemEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/enchantment/EnchantItemEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.prepareItemEnchant()

#### Parameters 

 * callback - A function which is called whenever the [enchantment.PrepareItemEnchantEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/enchantment/PrepareItemEnchantEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.paintingBreak()

#### Parameters 

 * callback - A function which is called whenever the [painting.PaintingBreakEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/painting/PaintingBreakEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.paintingBreakByEntity()

#### Parameters 

 * callback - A function which is called whenever the [painting.PaintingBreakByEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/painting/PaintingBreakByEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.weatherChange()

#### Parameters 

 * callback - A function which is called whenever the [weather.WeatherChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/weather/WeatherChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.thunderChange()

#### Parameters 

 * callback - A function which is called whenever the [weather.ThunderChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/weather/ThunderChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleEntityCollision()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleEntityCollisionEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleEntityCollisionEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleBlockCollision()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleBlockCollisionEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleBlockCollisionEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleExit()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleExitEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleExitEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleUpdate()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleUpdateEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleUpdateEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleDamage()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleDamageEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleDamageEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.vehicleDestroy()

#### Parameters 

 * callback - A function which is called whenever the [vehicle.VehicleDestroyEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/vehicle/VehicleDestroyEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerExpChange()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerExpChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerExpChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerRespawn()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerRespawnEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerRespawnEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerCommandPreprocess()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerCommandPreprocessEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerCommandPreprocessEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerPickupItem()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerPickupItemEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerPickupItemEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerInventory()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerInventoryEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerInventoryEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerFish()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerFishEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerFishEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerBedEnter()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerBedEnterEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerBedEnterEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerLogin()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerLoginEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerLoginEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerDropItem()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerDropItemEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerDropItemEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerLevelChange()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerLevelChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerLevelChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerVelocity()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerVelocityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerVelocityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerInteract()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerInteractEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerInteractEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerQuit()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerQuitEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerQuitEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerChatTabComplete()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerChatTabCompleteEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerChatTabCompleteEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerEggThrow()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerEggThrowEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerEggThrowEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerChat()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerChatEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerChatEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerAchievementAwarded()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerAchievementAwardedEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerAchievementAwardedEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerBedLeave()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerBedLeaveEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerBedLeaveEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerStatisticIncrement()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerStatisticIncrementEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerStatisticIncrementEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerToggleSprint()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerToggleSprintEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerToggleSprintEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerInteractEntity()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerInteractEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerInteractEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerEditBook()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerEditBookEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerEditBookEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerKick()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerKickEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerKickEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerItemHeld()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerItemHeldEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerItemHeldEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerItemConsume()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerItemConsumeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerItemConsumeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerGameModeChange()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerGameModeChangeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerGameModeChangeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerItemBreak()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerItemBreakEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerItemBreakEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerToggleFlight()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerToggleFlightEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerToggleFlightEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerAnimation()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerAnimationEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerAnimationEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.asyncPlayerChat()

#### Parameters 

 * callback - A function which is called whenever the [player.AsyncPlayerChatEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/AsyncPlayerChatEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerRegisterChannel()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerRegisterChannelEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerRegisterChannelEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerMove()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerMoveEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerMoveEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerTeleport()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerTeleportEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerTeleportEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerBucketFill()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerBucketFillEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerBucketFillEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerJoin()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerJoinEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerJoinEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerShearEntity()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerShearEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerShearEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerToggleSneak()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerToggleSneakEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerToggleSneakEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerChangedWorld()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerChangedWorldEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerChangedWorldEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.serverCommand()

#### Parameters 

 * callback - A function which is called whenever the [server.ServerCommandEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/ServerCommandEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.remoteServerCommand()

#### Parameters 

 * callback - A function which is called whenever the [server.RemoteServerCommandEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/RemoteServerCommandEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.mapInitialize()

#### Parameters 

 * callback - A function which is called whenever the [server.MapInitializeEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/MapInitializeEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.serviceRegister()

#### Parameters 

 * callback - A function which is called whenever the [server.ServiceRegisterEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/ServiceRegisterEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.serverListPing()

#### Parameters 

 * callback - A function which is called whenever the [server.ServerListPingEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/ServerListPingEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.serviceUnregister()

#### Parameters 

 * callback - A function which is called whenever the [server.ServiceUnregisterEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/ServiceUnregisterEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.prepareItemCraft()

#### Parameters 

 * callback - A function which is called whenever the [inventory.PrepareItemCraftEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/PrepareItemCraftEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.inventoryOpen()

#### Parameters 

 * callback - A function which is called whenever the [inventory.InventoryOpenEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/InventoryOpenEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.craftItem()

#### Parameters 

 * callback - A function which is called whenever the [inventory.CraftItemEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/inventory/CraftItemEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.hangingBreakByEntity()

#### Parameters 

 * callback - A function which is called whenever the [hanging.HangingBreakByEntityEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/hanging/HangingBreakByEntityEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.blockMultiPlace()

#### Parameters 

 * callback - A function which is called whenever the [block.BlockMultiPlaceEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/BlockMultiPlaceEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.entityBlockForm()

#### Parameters 

 * callback - A function which is called whenever the [block.EntityBlockFormEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/block/EntityBlockFormEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerBucketEmpty()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerBucketEmptyEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerBucketEmptyEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerPortal()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerPortalEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerPortalEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.playerUnregisterChannel()

#### Parameters 

 * callback - A function which is called whenever the [player.PlayerUnregisterChannelEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerUnregisterChannelEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.pluginDisable()

#### Parameters 

 * callback - A function which is called whenever the [server.PluginDisableEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/PluginDisableEvent.html) is fired

 * priority - optional - see events.on() for more information.

### events.pluginEnable()

#### Parameters 

 * callback - A function which is called whenever the [server.PluginEnableEvent event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/server/PluginEnableEvent.html) is fired

 * priority - optional - see events.on() for more information.

## Blocks Module

You hate having to lookup [Data Values][dv] when you use ScriptCraft's
Drone() functions. So do I.  So I created this blocks object which is
a helper object for use in construction.

### Examples

    box( blocks.oak ); // creates a single oak wood block
    box( blocks.sand, 3, 2, 1 ); // creates a block of sand 3 wide x 2 high x 1 long
    box( blocks.wool.green, 2 ); // creates a block of green wool 2 blocks wide

Color aliased properties that were a direct descendant of the blocks
object are no longer used to avoid confusion with carpet and stained
clay blocks. In addition, there's a convenience array `blocks.rainbow`
which is an array of the 7 colors of the rainbow (or closest
approximations).

The blocks module is globally exported by the Drone module.

## Fireworks Module

The fireworks module makes it easy to create fireworks using
ScriptCraft.  The module has a single function `firework` which takes
a `org.bukkit.Location` as its 1 and only parameter.

### Examples

The module also extends the `Drone` object adding a `firework` method
so that fireworks can be created as a part of a Drone chain. For
Example....

    /js firework()

... creates a single firework, while ....

    /js firework().fwd(3).times(5) 

... creates 5 fireworks in a row. Fireworks have also been added as a
possible option for the `arrow` module. To have a firework launch
where an arrow strikes...

    /js arrows.firework()

To call the fireworks.firework() function directly, you must provide a
location. For example...

    /js var fireworks = require('fireworks');
    /js fireworks.firework( self.location );

![firework example](img/firework.png)

## Asynchronous Input Module

The `input` module provides a simple way to prompt players for input at the 
in-game prompt. In Javascript browser environments the `prompt()` function provides
a way to block execution and ask the user for input. Execution is blocked until the user
provides input using the modal dialog and clicks OK. Unfortunately Minecraft provides no 
equivalent modal dialog which can be used to gather player text input. The only way to gather text 
input from the player in Minecraft is to do so asynchronously. That is - a prompt message can be 
sent to the player but the player is not obliged to provide input immediately, nor does the program
execution block until the player does so.

So ScriptCraft has no `prompt()` implementation because `prompt()` is a synchronous function and 
Minecraft's API provides no equivalent functions or classes which can be used to implement this synchronously. 
The Minecraft API does however have a 'Conversation' API which allows for prompting of the player and asynchronously gathering text input from the player. 

This new `input()` function is best illustrated by example. The following code is for a number-guessing game:

```javascript
var input = require('input');
exports.numberguess = function(player){
  var randomNumber = Math.ceil(Math.random() * 10);
  input( player, 'Think of a number between 1 and 10 (q to quit)', function( guess, guesser, repeat ) {
    if ( guess == 'q'){
      return;
    }
    if ( +guess !== randomNumber ) { 
      if (+guess < randomNumber ) {
        guesser.sendMessage('Too low - guess again');
      }
      if (+guess > randomNumber ) {
        guesser.sendMessage('Too high - guess again');
      }
      repeat();
    } else {
      guesser.sendMessage('You guessed correctly');
    }
  });
};
```

The `input()` function takes 3 parameters, the player, a prompt message and a callback which will be invoked when the player has entered some text at the in-game command prompt. 
The callback is bound to an object which has the following properties:

 * sender : The player who input the text
 * value : The value of the text which has been input.
 * message: The message prompt.
 * repeat: A function which when invoked will repeat the original prompt. (this is for flow control)

The callback function as well as being bound to an object with the above properties (so you can use this.value inside your callback to get the value which has just been input), can also take the following parameters (in exact order):

 * value
 * sender
 * repeat

The `value` parameter will be the same as `this.value`, the `repeat` parameter will be the same as `this.repeat` and so on.

## Http Module

For handling http requests. Not to be confused with the more robust
and functional 'http' module bundled with Node.js.

### http.request() function

The http.request() function will fetch a web address asynchronously (on a
separate thread)and pass the URL's response to a callback function
which will be executed synchronously (on the main thread).  In this
way, http.request() can be used to fetch web content without blocking the
main thread of execution.

#### Parameters

 * request: The request details either a plain URL e.g. "http://scriptcraft.js/sample.json" or an object with the following properties...

   - url: The URL of the request.
   - method: Should be one of the standard HTTP methods, GET, POST, PUT, DELETE (defaults to GET).
   - params: A Javascript object with name-value pairs. This is for supplying parameters to the server.

 * callback: The function to be called when the Web request has completed. This function takes the following parameters...
   - responseCode: The numeric response code from the server. If the server did not respond with 200 OK then the response parameter will be undefined.
   - response: A string (if the response is of type text) or object containing the HTTP response body.

#### Example

The following example illustrates how to use http.request to make a request to a JSON web service and evaluate its response...

    var jsResponse;
    var http = require('./http/request');
    http.request("http://scriptcraftjs.org/sample.json",function(responseCode, responseBody){
        jsResponse = eval("(" + responseBody +  ")");
    });

... The following example illustrates a more complex use-case POSTing parameters to a CGI process on a server...

    var http = require('./http/request');
    http.request(
      {
        url: 'http://pixenate.com/pixenate/pxn8.pl',
        method: 'POST',
        params: {script: '[]'}
      },
      function( responseCode, responseBody ) {
         var jsObj = eval('(' + responseBody + ')');
      });

## sc-mqtt module

This module provides a simple way to communicate with devices (such as Arduino)
using the popular lightweight [MQTT protocol][mqtt].

### Usage

This module can only be used if the separate `sc-mqtt.jar` file is
present in the CraftBukkit classpath. To use this module, you should
...

 1. Download sc-mqtt.jar from <http://scriptcraftjs.org/download/extras/>
 2. Save the file to the same directory where craftbukkit.jar resides.
 3. Create a new batch file (windows-only) called
    craftbukkit-sc-mqtt.bat and edit it to include the following
    command...

    ```sh
    java -classpath sc-mqtt.jar;craftbukkit.jar org.bukkit.craftbukkit.Main
    ```

    If you're using Mac OS, create a new craftbukkit-sc-mqtt.command
    file and edit it (using TextWrangler or another text editor) ...

    ```sh
    java -classpath sc-mqtt.jar:craftbukkit.jar org.bukkit.craftbukkit.Main
    ```

 4. Execute the craftbukkit-sc-mqtt batch file / command file to start
    Craftbukkit. You can now begin using this module to send and receive
    messages to/from a Net-enabled Arduino or any other device which uses
    the [MQTT protocol][mqtt]
  
    ```javascript
    var mqtt = require('sc-mqtt');
    // create a new client
    var client = mqtt.client( 'tcp://localhost:1883', 'uniqueClientId' );
    // connect to the broker 
    client.connect( { keepAliveInterval: 15 } );
    //  publish a message to the broker
    client.publish( 'minecraft', 'loaded' );
    // subscribe to messages on 'arduino' topic 
    client.subscribe( 'arduino' );
    //  do something when an incoming message arrives...
    client.onMessageArrived( function( topic, message ) {
        console.log( 'Message arrived: topic=' + topic + ', message=' + message );
    });

    ```

The `sc-mqtt` module provides a very simple minimal wrapper around the
[Eclipse Paho MQTT Version 3 Client][pahodocs] java-based MQTT
library.

[pahodocs]: http://pic.dhe.ibm.com/infocenter/wmqv7/v7r5/index.jsp?topic=/com.ibm.mq.javadoc.doc/WMQMQxrClasses/org/eclipse/paho/client/mqttv3/package-summary.html
[mqtt]: http://mqtt.org/

## Signs Module

The Signs Module can be used by plugin authors to create interactive
signs - that is - signs which display a list of choices which can be
changed by interacting (right-clicking) with the sign.

### signs.menu() function

This function is used to construct a new interactive menu on top of an
existing sign in the game world.

#### Parameters

 * Label : A string which will be displayed in the topmost line of the
   sign. This label is not interactive.  
 * options : An array of strings which can be selected on the sign by 
   right-clicking/interacting.
 * callback : A function which will be called whenever a player
   interacts (changes selection) on a sign. This callback in turn
   takes as its parameter, an object with the following properties...

   * player : The player who interacted with the sign.
   * sign : The [org.bukkit.block.Sign][buksign] which the player interacted with.
   * text : The text for the currently selected option on the sign.
   * number : The index of the currently selected option on the sign.
 
 * selectedIndex : optional: A number (starting at 0) indicating which
   of the options should be selected by default. 0 is the default.

#### Returns
This function does not itself do much. It does however return a
function which when invoked with a given
[org.bukkit.block.Sign][buksign] object, will convert that sign into
an interactive sign.

#### Example: Create a sign which changes the time of day.

##### plugins/signs/time-of-day.js
   
```javascript 
var utils = require('utils'),
    signs = require('signs');

var onTimeChoice = function(event){
    var selectedIndex = event.number;
    // convert to Minecraft time 0 = Dawn, 6000 = midday, 12000 = dusk, 18000 = midnight
    var time = selectedIndex * 6000; 
    event.player.location.world.setTime(time);
};

// signs.menu returns a function which can be called for one or more signs in the game.
var convertToTimeMenu = signs.menu('Time of Day',
    ['Dawn', 'Midday', 'Dusk', 'Midnight'],
    onTimeChoice);
        
exports.time_sign = function( player ){
    var sign = signs.getTargetedBy(player);
    if ( !sign ) {
        throw new Error('You must look at a sign');
    } 
    convertToTimeMenu(sign);
};
```

To use the above function at the in-game prompt, look at an existing
sign and type...

    /js time_sign(self);

... and the sign you're looking at will become an interactive sign
which changes the time each time you interact (right-click) with it.

### signs.getTargetedBy() function

This function takes a [org.bukkit.entity.LivingEntity][bukle] as a
parameter and returns a [org.bukkit.block.Sign][buksign] object which
the entity has targeted. It is a utility function for use by plugin authors.

#### Example

```javascript 
var signs = require('signs'),
    utils = require('utils');
var player = utils.player('tom1234');
var sign = signs.getTargetedBy( player );
if ( !sign ) { 
    player.sendMessage('Not looking at a sign');
}
```

[buksign]: http://jd.bukkit.org/dev/apidocs/org/bukkit/block/Sign.html

## Sounds Module

This module is a simple wrapper around the Bukkit Sound class and provides
a simpler way to play sounds. All of the org.bukkit.Sound Enum values are attached.

### Usage:

    var sounds = require('sounds');
    sounds.play( org.bukkit.Sound.VILLAGER_NO , self, 1, 0); // plays VILLAGER_NO sound at full volume and medium pitch
    sounds.play( org.bukkit.Sound.VILLAGER_NO , self );       // same as previous statement

The play() function takes either a Location object or any object which has a location.
The volume parameter is in the range 0 to 1 and the pitch parameter is in the range 0 to 4.    

In addition, a play function is provided for each possible sound using the following rules:

1. The sound is converted from ALL_CAPS_UNDERSCORE to camelCase so for example there is a sounds.villagerNo() function which will play the VILLAGER_NO sound.
2. Each such function can take 3 parameters: location (which can be either an actual Location object or an object which has a location), volume and pitch
3. Or... each such function can be called without parameters meaning the sound will be played for all online players to hear.

    sounds.villagerNo(self, 1, 0); // plays VILLAGER_NO sound at full volume and medium pitch at invoker's location

    sounds.villagerNo(); // plays VILLAGER_NO sound for all players online.

These methods are provided for convenience to help beginners explore sounds using TAB completion.
String class extensions
-----------------------
The following chat-formatting methods are added to the javascript String class..

    * aqua()
    * black()
    * blue()
    * bold()
    * brightgreen()
    * darkaqua()
    * darkblue()
    * darkgray()
    * darkgreen()
    * purple()
    * darkpurple()
    * darkred()
    * gold()
    * gray()
    * green()
    * italic()
    * lightpurple()
    * indigo()
    * green()
    * red()
    * pink()
    * yellow()
    * white()
    * strike()
    * random()
    * magic()
    * underline()
    * reset()

Example
-------

    /js var boldGoldText = "Hello World".bold().gold();
    /js self.sendMessage( boldGoldText );

<p style="color:gold;font-weight:bold">Hello World</p>    

## Utilities Module

The `utils` module is a storehouse for various useful utility
functions which can be used by plugin and module authors. It contains
miscellaneous utility functions and classes to help with programming.

### utils.player() function

The utils.player() function will return a [bukkit Player][bkpl] object
with the given name. This function takes a single parameter
`playerName` which can be either a String or a [Player][bkpl] object -
if it's a Player object, then the same object is returned. If it's a
String, then it tries to find the player with that name.

#### Parameters

 * playerName : A String or Player object. If no parameter is provided
   then player() will try to return the `self` variable . It is 
   strongly recommended to provide a parameter.

#### Example

```javascript
var utils = require('utils');
var name = 'walterh';
var player = utils.player(name);
if ( player ) {
    player.sendMessage('Got ' + name);
} else {
    console.log('No player named ' + name);
}
```

[bkpl]: http://jd.bukkit.org/dev/apidocs/org/bukkit/entity/Player.html
[bkloc]: http://jd.bukkit.org/dev/apidocs/org/bukkit/Location.html

### utils.locationToJSON() function

utils.locationToJSON() returns a [org.bukkit.Location][bkloc] object in JSON form...

    { world: 'world5',
      x: 56.9324,
      y: 103.9954,
      z: 43.1323,
      yaw: 0.0,
      pitch: 0.0
    }

This can be useful if you write a plugin that needs to store location data since bukkit's Location object is a Java object which cannot be serialized to JSON by default.

#### Parameters
 
 * location: An object of type [org.bukkit.Location][bkloc]

#### Returns

A JSON object in the above form.
 
### utils.locationToString() function

The utils.locationToString() function returns a
[org.bukkit.Location][bkloc] object in string form...

    '{"world":"world5",x:56.9324,y:103.9954,z:43.1323,yaw:0.0,pitch:0.0}'

... which can be useful if you write a plugin which uses Locations as
keys in a lookup table.

#### Example

```javascript    
var utils = require('utils');
...
var key = utils.locationToString(player.location);
lookupTable[key] = player.name;
```

### utils.locationFromJSON() function

This function reconstructs an [org.bukkit.Location][bkloc] object from
a JSON representation. This is the counterpart to the
`locationToJSON()` function. It takes a JSON object of the form
returned by locationToJSON() and reconstructs and returns a bukkit
Location object.

### utils.getPlayerPos() function

This function returns the player's [Location][bkloc] (x, y, z, pitch
and yaw) for a named player.  If the "player" is in fact a
[org.bukkit.command.BlockCommandSender][bkbcs] then the attached
Block's location is returned.

#### Parameters

 * player : A [org.bukkit.command.CommandSender][bkbcs] (Player or BlockCommandSender) or player name (String).

#### Returns

An [org.bukkit.Location][bkloc] object.

[bkbcs]: http://jd.bukkit.org/dev/apidocs/org/bukkit/command/BlockCommandSender.html
[bksndr]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/command/CommandSender.html
### utils.getMousePos() function

This function returns a [org.bukkit.Location][bkloc] object (the
x,y,z) of the current block being targeted by the named player. This
is the location of the block the player is looking at (targeting).

#### Parameters

 * player : The player whose targeted location you wish to get.

#### Example

The following code will strike lightning at the location the player is looking at...

```javascript
var utils = require('utils');
var playerName = 'walterh';
var targetPos = utils.getMousePos(playerName);
if (targetPos){
   targetPos.world.strikeLightning(targetPos);
}
```

### utils.foreach() function

The utils.foreach() function is a utility function for iterating over
an array of objects (or a java.util.Collection of objects) and processing each object in turn. Where
utils.foreach() differs from other similar functions found in
javascript libraries, is that utils.foreach can process the array
immediately or can process it *nicely* by processing one item at a
time then delaying processing of the next item for a given number of
server ticks (there are 20 ticks per second on the minecraft main
thread).  This method relies on Bukkit's [org.bukkit.scheduler][sched]
package for scheduling processing of arrays.

[sched]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/package-summary.html

#### Parameters

 * array : The array to be processed - It can be a javascript array, a java array or java.util.Collection
 * callback : The function to be called to process each item in the
   array. The callback function should have the following signature
   `callback(item, index, object, array)`. That is the callback will
   be called with the following parameters....

   - item : The item in the array
   - index : The index at which the item can be found in the array.
   - object : Additional (optional) information passed into the foreach method.
   - array : The entire array.

 * context (optional) : An object which may be used by the callback.
 * delay (optional, numeric) : If a delay is specified (in ticks - 20
   ticks = 1 second), then the processing will be scheduled so that
   each item will be processed in turn with a delay between the completion of each
   item and the start of the next. This is recommended for big builds (say 200 x 200 x 200
   blocks) or any CPU-intensive process.
 * onDone (optional, function) : A function to be executed when all processing 
   is complete. This parameter is only used when the processing is delayed. (It's optional even if a 
   delay parameter is supplied).

If called with a delay parameter then foreach() will return
immediately after processing just the first item in the array (all
subsequent items are processed later). If your code relies on the
completion of the array processing, then provide an `onDone` parameter
and put the code there.

#### Example

The following example illustrates how to use foreach for immediate processing of an array...

```javascript
var utils = require('utils');
var players = ['moe', 'larry', 'curly'];
utils.foreach (players, function(item){ 
    server.getPlayer(item).sendMessage('Hi ' + item);
});
```

... The `utils.foreach()` function can work with Arrays or any Java-style collection. This is important
because many objects in the Bukkit API use Java-style collections...

```javascript
utils.foreach( server.onlinePlayers, function(player){
    player.chat('Hello!');
}); 
```

... the above code sends a 'Hello!' to every online player.

The following example is a more complex use case - The need to build an enormous structure
without hogging CPU usage...

```javascript
// build a structure 200 wide x 200 tall x 200 long
// (That's 8 Million Blocks - enough to tax any machine!)
var utils = require('utils');

var a = []; 
a.length = 200; 
var drone = new Drone();
var processItem = function(item, index, object, array){
    // build a box 200 wide by 200 long then move up
    drone.box(blocks.wood, 200, 1, 200).up();
};
// by the time the job's done 'self' might be someone else 
// assume this code is within a function/closure
var player = self;
var onDone = function(){ 
    player.sendMessage('Job Done!');
};
utils.foreach (a, processItem, null, 10, onDone);
```
    
### utils.nicely() function

The utils.nicely() function is for performing processing using the
[org.bukkit.scheduler][sched] package/API. utils.nicely() lets you
process with a specified delay between the completion of each `next()`
function and the start of the next `next()` function.
`utils.nicely()` is a recursive function - that is - it calls itself
(schedules itself actually) repeatedly until `hasNext` returns false.

#### Parameters

 * next : A function which will be called if processing is to be done. 
 * hasNext : A function which is called to determine if the `next`
   callback should be invoked. This should return a boolean value -
   true if the `next` function should be called (processing is not
   complete), false otherwise.
 * onDone : A function which is to be called when all processing is complete (hasNext returned false).
 * delay : The delay (in server ticks - 20 per second) between each call.

#### Example

See the source code to utils.foreach for an example of how utils.nicely is used.

### utils.at() function

The utils.at() function will perform a given task at a given time every 
(minecraft) day.

#### Parameters

 * time24hr : The time in 24hr form - e.g. 9:30 in the morning is '09:30' while
   9:30 pm is '21:30', midnight is '00:00' and midday is '12:00'
 * callback : A javascript function which will be invoked at the given time.
 * worlds : (optional) An array of worlds. Each world has its own clock. If no array of worlds is specified, all the server's worlds are used.

#### Example

To warn players when night is approaching...

```javascript
var utils = require('utils');

utils.at( '19:00', function() {

    utils.foreach( server.onlinePlayers, function( player ) {
        player.chat( 'The night is dark and full of terrors!' );
    });

});
```
  
### utils.find() function

The utils.find() function will return a list of all files starting at
a given directory and recursiving trawling all sub-directories.

#### Parameters

 * dir : The starting path. Must be a string.
 * filter : (optional) A [FilenameFilter][fnfltr] object to return only files matching a given pattern.

[fnfltr]: http://docs.oracle.com/javase/6/docs/api/java/io/FilenameFilter.html

#### Example

```javascript
var utils = require('utils');
var jsFiles = utils.find('./', function(dir,name){
    return name.match(/\.js$/);
});  
```

### utils.serverAddress() function

The utils.serverAddress() function returns the IP(v4) address of the server.

```javascript
var utils = require('utils');
var serverAddress = utils.serverAddress();
console.log(serverAddress);
```
### utils.watchFile() function

Watches for changes to the given file or directory and calls the function provided
when the file changes.

#### Parameters
 
 * File - the file to watch (can be a file or directory)
 * Callback - The callback to invoke when the file has changed. The callback takes the 
   changed file as a parameter.

#### Example

```javascript
var utils = require('utils');
utils.watchFile( 'test.txt', function( file ) { 
   console.log( file + ' has changed');
});
```
### utils.watchDir() function

Watches for changes to the given directory and calls the function provided
when the directory changes. It works by calling watchFile/watchDir for each
file/subdirectory.

#### Parameters
 
 * Dir - the file to watch (can be a file or directory)
 * Callback - The callback to invoke when the directory has changed. 
              The callback takes the changed file as a parameter. 
              For each change inside the directory the callback will also 
              be called.

#### Example

```javascript
var utils = require('utils');
utils.watchDir( 'players/_ial', function( dir ) { 
   console.log( dir + ' has changed');
});
```
### utils.unwatchFile() function

Removes a file from the watch list.

#### Example
```javascript
var utils = require('utils');
utils.unwatchFile( 'test.txt');
```

### utils.unwatchDir() function

Removes a directory from the watch list and all files inside the directory
are also "unwatched"

#### Example
```javascript
var utils = require('utils');
utils.unwatchDir ('players/_ial');
```
Would cause also 
```javascript
utils.unwatchFile (file);
```
for each file inside directory (and unwatchDir for each directory inside it)

### utils.array() function

Converts Java collection objects to type Javascript array so they can avail of
all of Javascript's Array goodness.
 
#### Example

    var utils = require('utils');
    var worlds = utils.array(server.worlds);
    
## Drone Plugin

The Drone is a convenience class for building. It can be used for...

 1. Building
 2. Copying and Pasting

It uses a fluent interface which means all of the Drone's methods return `this` and can be chained together like so...

    var theDrone = new Drone();
    theDrone.up().left().box(blocks.oak).down().fwd(3).cylinder0(blocks.lava,8); 

### Constructing a Drone Object

Drones can be created in any of the following ways...
    
 1. Calling any one of the methods listed below will return a Drone object. For example...
         
        var d = box( blocks.oak )

   ... creates a 1x1x1 wooden block at the cross-hairs or player's location and returns a Drone object. This might look odd (if you're familiar with Java's Object-dot-method syntax) but all of the Drone class's methods are also global functions that return new Drone objects. This is short-hand for creating drones and is useful for playing around with Drones at the in-game command prompt. It's shorter than typing ...
    
        var d = new Drone().box( blocks.oak ) 
        
   ... All of the Drone's methods return `this` so you can chain operations together like this...
        
        var d = box( blocks.oak )
                  .up()
                  .box( blocks.oak ,3,1,3)
                  .down()
                  .fwd(2)
                  .box( blocks.oak )
                  .turn()
                  .fwd(2)
                  .box( blocks.oak )
                  .turn()
                  .fwd(2)
                  .box( blocks.oak );
    
 2. Using the following form...

        d = new Drone()
    
    ...will create a new Drone. If the cross-hairs are pointing at a block at the time then, that block's location becomes the drone's starting point.  If the cross-hairs are _not_ pointing at a block, then the drone's starting location will be 2 blocks directly in front of the player.  TIP: Building always happens right and front of the drone's position...
    
    Plan View:

        ^
        |
        |
        D---->
      
    For convenience you can use a _corner stone_ to begin building. The corner stone should be located just above ground level. If the cross-hair is point at or into ground level when you create a new Drone(), then building begins at that point. You can get around this by pointing at a 'corner stone' just above ground level or alternatively use the following statement...
    
        d = new Drone().up();
          
    ... which will move the drone up one block as soon as it's created.

    ![corner stone](img/cornerstone1.png)

 3. Or by using the following form...
    
        d = new Drone(x,y,z,direction,world);

    This will create a new Drone at the location you specified using x, y, z In minecraft, the X axis runs west to east and the Z axis runs north to south.  The direction parameter says what direction you want the drone to face: 0 = east, 1 = south, 2 = west, 3 = north.  If the direction parameter is omitted, the player's direction is used instead. Both the `direction` and `world` parameters are optional.

 4. Create a new Drone based on a Bukkit Location object...

        d = new Drone(location);

    This is useful when you want to create a drone at a given `org.bukkit.Location` . The `Location` class is used throughout the bukkit API. For example, if you want to create a drone when a block is broken at the block's location you would do so like this...

        events.blockBreak( function( event ) { 
            var location = event.block.location;
            var drone = new Drone(location);
            // do more stuff with the drone here...
        });

#### Parameters

 * location (optional) : *NB* If an `org.bukkit.Location` object is provided as a parameter, then it should be the only parameter.
 * x (optional) : The x coordinate of the Drone
 * y (optional) : The y coordinate of the Drone
 * z (optional) : The z coordinate of the Drone
 * direction (optional) : The direction in which the Drone is
   facing. Possible values are 0 (east), 1 (south), 2 (west) or 3 (north)
 * world (optional) : The world in which the drone is created.
  
### Drone.box() method

the box() method is a convenience method for building things. (For the more performance-oriented method - see cuboid)

#### parameters

 * b - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * w (optional - default 1) - the width of the structure 
 * h (optional - default 1) - the height of the structure 
 * d (optional - default 1) - the depth of the structure - NB this is not how deep underground the structure lies - this is how far away (depth of field) from the drone the structure will extend.

#### Example

To create a black structure 4 blocks wide, 9 blocks tall and 1 block long...
    
    box(blocks.wool.black, 4, 9, 1);

... or the following code does the same but creates a variable that can be used for further methods...

    var drone = new Drone();
    drone.box(blocks.wool.black, 4, 9, 1);

![box example 1](img/boxex1.png)
    
### Drone.box0() method

Another convenience method - this one creates 4 walls with no floor or ceiling.

#### Parameters

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width (optional - default 1) - the width of the structure 
 * height (optional - default 1) - the height of the structure 
 * length (optional - default 1) - the length of the structure - how far
   away (depth of field) from the drone the structure will extend.

#### Example

To create a stone building with the insided hollowed out 7 wide by 3 tall by 6 long...

    box0( blocks.stone, 7, 3, 6);

![example box0](img/box0ex1.png)
   
### Drone.boxa() method

Construct a cuboid using an array of blocks. As the drone moves first along the width axis, then the height (y axis) then the length, each block is picked from the array and placed.

#### Parameters

 * blocks - An array of blocks - each block in the array will be placed in turn.
 * width
 * height
 * length

#### Example

Construct a rainbow-colored road 100 blocks long...

    var rainbowColors = [blocks.wool.red, blocks.wool.orange, blocks.wool.yellow, blocks.wool.lime,
                         blocks.wool.lightblue, blocks.wool.blue, blocks.wool.purple];
    
    boxa(rainbowColors,7,1,30);

![boxa example](img/boxaex1.png)

### Drone Movement

Drones can move freely in minecraft's 3-D world. You control the Drone's movement using any of the following methods..

 * up()
 * down()
 * left()
 * right()
 * fwd()
 * back()
 * turn()

... Each of these methods takes a single optional parameter `numBlocks` - the number of blocks to move in the given direction. If no parameter is given, the default is 1.

To change direction use the `turn()` method which also takes a single optional parameter (numTurns) - the number of 90 degree turns to make. Turns are always clock-wise. If the drone is facing north, then drone.turn() will make the turn face east. If the drone is facing east then drone.turn(2) will make the drone turn twice so that it is facing west.

### Drone Positional Info

 * getLocation() - Returns a Bukkit Location object for the drone

### Drone Markers

Markers are useful when your Drone has to do a lot of work. You can set a check-point and return to the check-point using the move() method.  If your drone is about to undertake a lot of work - e.g. building a road, skyscraper or forest you should set a check-point before doing so if you want your drone to return to its current location.  

A 'start' checkpoint is automatically created when the Drone is first created.

Markers are created and returned to using the followng two methods...

 * chkpt - Saves the drone's current location so it can be returned to later.
 * move - moves the drone to a saved location. Alternatively you can provide an org.bukkit.Location object or x,y,z and direction parameters.

#### Parameters

 * name - the name of the checkpoint to save or return to.

#### Example

    drone.chkpt('town-square');
    //
    // the drone can now go off on a long excursion
    //
    for ( i = 0; i< 100; i++) {  
        drone.fwd(12).box(6); 
    }
    //
    // return to the point before the excursion
    //
    drone.move('town-square');

### Drone.prism() method

Creates a prism. This is useful for roofs on houses.

#### Parameters

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width - the width of the prism
 * length - the length of the prism (will be 2 time its height)

#### Example

    prism(blocks.oak,3,12);

![prism example](img/prismex1.png)

### Drone.prism0() method

A variation on `prism` which hollows out the inside of the prism. It uses the same parameters as `prism`.

### Drone.cylinder() method

A convenience method for building cylinders. Building begins radius blocks to the right and forward.

#### Parameters

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * radius 
 * height

#### Example

To create a cylinder of Iron 7 blocks in radius and 1 block high...

    cylinder(blocks.iron, 7 , 1);

![cylinder example](img/cylinderex1.png)

### Drone.cylinder0() method

A version of cylinder that hollows out the middle.

#### Example

To create a hollow cylinder of Iron 7 blocks in radius and 1 block high...

    cylinder0(blocks.iron, 7, 1);

![cylinder0 example](img/cylinder0ex1.png)

### Drone.arc() method

The arc() method can be used to create 1 or more 90 degree arcs in the horizontal or vertical planes. This method is called by cylinder() and cylinder0() and the sphere() and sphere0() methods.

#### Parameters

arc() takes a single parameter - an object with the following named properties...

 * radius - The radius of the arc.
 * blockType - The type of block to use - this is the block Id only (no meta). See [Data Values][dv].
 * meta - The metadata value. See [Data Values][dv].
 * orientation (default: 'horizontal' ) - the orientation of the arc - can be 'vertical' or 'horizontal'.
 * stack (default: 1 ) - the height or length of the arc (depending on the orientation - if orientation is horizontal then this parameter refers to the height, if vertical then it refers to the length ).
 * strokeWidth (default: 1 ) - the width of the stroke (how many blocks) - if drawing nested arcs it's usually a good idea to set strokeWidth to at least 2 so that there are no gaps between each arc. The arc method uses a [bresenham algorithm][bres] to plot points along the circumference.
 * fill - If true (or present) then the arc will be filled in.
 * quadrants (default: `{topleft:true,topright:true,bottomleft:true,bottomright:true}` - An object with 4 properties indicating which of the 4 quadrants of a circle to draw. If the quadrants property is absent then all 4 quadrants are drawn.

#### Examples

To draw a 1/4 circle (top right quadrant only) with a radius of 10 and stroke width of 2 blocks ...

    arc({blockType: blocks.iron, 
         meta: 0, 
         radius: 10,
         strokeWidth: 2,
         quadrants: { topright: true },
         orientation: 'vertical', 
         stack: 1,
         fill: false
         } );

![arc example 1](img/arcex1.png)

[bres]: http://en.wikipedia.org/wiki/Midpoint_circle_algorithm
[dv]: http://www.minecraftwiki.net/wiki/Data_values

### Drone.door() method

create a door - if a parameter is supplied an Iron door is created otherwise a wooden door is created.

#### Parameters

 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

#### Example

To create a wooden door at the crosshairs/drone's location...

    var drone = new Drone();
    drone.door();

To create an iron door...

    drone.door( blocks.door_iron );

![iron door](img/doorex1.png)

### Drone.door_iron() method

create an Iron door.

### Drone.door2() method

Create double doors (left and right side)

#### Parameters

 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

#### Example

To create double-doors at the cross-hairs/drone's location...

    drone.door2();

![double doors](img/door2ex1.png)

### Drone.door2_iron() method

Create double iron doors
    

### Drone.sign() method

Signs must use block 63 (stand-alone signs) or 68 (signs on walls)

#### Parameters

 * message -  can be a string or an array of strings. 
 * block - can be 63 or 68

#### Example

To create a free-standing sign...

    drone.sign(["Hello","World"],63);

![ground sign](img/signex1.png)

... to create a wall mounted sign...

    drone.sign(["Welcome","to","Scriptopia"], 68 );

![wall sign](img/signex2.png)

### Drone Trees methods

 * oak()
 * spruce()
 * birch()
 * jungle()

#### Example

To create 4 trees in a row, point the cross-hairs at the ground then type `/js ` and ...

    up( ).oak( ).right(8 ).spruce( ).right(8 ).birch( ).right(8 ).jungle( );

Trees won't always generate unless the conditions are right. You should use the tree methods when the drone is directly above the ground. Trees will usually grow if the drone's current location is occupied by Air and is directly above an area of grass (That is why the `up( )` method is called first).

![tree example](img/treeex1.png)

None of the tree methods require parameters. Tree methods will only be successful if the tree is placed on grass in a setting where trees can grow.

### Drone.garden() method

places random flowers and long grass (similar to the effect of placing bonemeal on grass)

#### Parameters

 * width - the width of the garden
 * length - how far from the drone the garden extends

#### Example

To create a garden 10 blocks wide by 5 blocks long...

    garden(10,5);

![garden example](img/gardenex1.png)

### Drone.rand() method

rand takes either an array (if each blockid has the same chance of occurring) or an object where each property is a blockid and the value is it's weight (an integer)

#### Example

place random blocks stone, mossy stone and cracked stone (each block has the same chance of being picked)

    rand( [blocks.brick.stone, blocks.brick.mossy, blocks.brick.cracked ],w,d,h) 

to place random blocks stone has a 50% chance of being picked, 

    var distribution = {};
    distribution[ blocks.brick.stone ] = 5;
    distribution[ blocks.brick.mossy ] = 3;
    distribution[ blocks.brick.cracked ] = 2;

    rand( distribution, width, height, depth) 

regular stone has a 50% chance, mossy stone has a 30% chance and cracked stone has just a 20% chance of being picked.

### Copy & Paste using Drone

A drone can be used to copy and paste areas of the game world.

### Drone.copy() method

Copies an area so it can be pasted elsewhere. The name can be used for pasting the copied area elsewhere...

#### Parameters

 * name - the name to be given to the copied area (used by `paste`)
 * width - the width of the area to copy
 * height - the height of the area to copy
 * length - the length of the area (extending away from the drone) to copy

#### Example

    drone.copy('somethingCool',10,5,10 ).right(12 ).paste('somethingCool' );

### Drone.paste() method

Pastes a copied area to the current location.

#### Example

To copy a 10x5x10 area (using the drone's coordinates as the starting point) into memory.  the copied area can be referenced using the name 'somethingCool'. The drone moves 12 blocks right then pastes the copy.

    drone.copy('somethingCool',10,5,10 )
         .right(12 )
         .paste('somethingCool' );

### Chaining

All of the Drone methods return a Drone object, which means methods can be 'chained' together so instead of writing this...

    drone = new Drone(); 
    drone.fwd(3);
    drone.left(2);
    drone.box(2); // create a grass block 
    drone.up();
    drone.box(2); // create another grass block
    drone.down();

...you could simply write ...
    
    var drone = new Drone().fwd(3).left(2).box(2).up().box(2).down();

... since each Drone method is also a global function that constructs a drone if none is supplied, you can shorten even further to just...
    
    fwd(3).left(2).box(2).up().box(2).down()

The Drone object uses a [Fluent Interface][fl] to make ScriptCraft scripts more concise and easier to write and read.  Minecraft's in-game command prompt is limited to about 80 characters so chaining drone commands together means more can be done before hitting the command prompt limit. For complex building you should save your commands in a new script file and load it using /js load()

[fl]: http://en.wikipedia.org/wiki/Fluent_interface

### Drone Properties

 * x - The Drone's position along the west-east axis (x increases as you move east)
 * y - The Drone's position along the vertical axis (y increses as you move up)
 * z - The Drone's position along the north-south axis (z increases as you move south)
 * dir - The Drone's direction 0 is east, 1 is south , 2 is west and 3 is north.

### Extending Drone

The Drone object can be easily extended - new buidling recipes/blueprints can be added and can become part of a Drone's chain using the *static* method `Drone.extend`. 

### Drone.extend() static method

Use this method to add new methods (which also become chainable global functions) to the Drone object.

#### Parameters

 * name - The name of the new method e.g. 'pyramid'. 
 * function - The method body.

Alternatively if you provide just a function as a parameter, then the function name will be used as the new method name. For example the following two approaches are both valid.

#### Example 1 Using name and function as parameters

    // submitted by [edonaldson][edonaldson]
    Drone.extend('pyramid', function( block,height) { 
        this.chkpt('pyramid');
        for ( var i = height; i > 0; i -= 2) {
            this.box(block, i, 1, i).up().right().fwd();
        }
        return this.move('pyramid');      
    });

#### Example 2 Using just a named function as a parameter

    function pyramid( block,height) { 
        this.chkpt('pyramid');
        for ( var i = height; i > 0; i -= 2) {
            this.box(block, i, 1, i).up().right().fwd();
        }
        return this.move('pyramid');      
    }
    Drone.extend( pyramid );

Once the method is defined (it can be defined in a new pyramid.js file) it can be used like so...

    var d = new Drone();
    d.pyramid(blocks.brick.stone, 12);

... or simply ...

    pyramid(blocks.brick.stone, 12);

[edonaldson]: https://github.com/edonaldson

### Drone Constants

#### Drone.PLAYER_STAIRS_FACING

An array which can be used when constructing stairs facing in the Drone's direction...

    var d = new Drone();
    d.box(blocks.stairs.oak + ':' + Drone.PLAYER_STAIRS_FACING[d.dir]);

... will construct a single oak stair block facing the drone.

#### Drone.PLAYER_SIGN_FACING

An array which can be used when placing signs so they face in a given direction. This is used internally by the Drone.sign() method. It should also be used for placing any of the following blocks...

 * chest 
 * ladder
 * furnace
 * dispenser

To place a chest facing the Drone ...

    drone.box( blocks.chest + ':' + Drone.PLAYER_SIGN_FACING[drone.dir]);

#### Drone.PLAYER_TORCH_FACING

Used when placing torches so that they face towards the drone. 

    drone.box( blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[drone.dir]);

### Drone.times() Method

The times() method makes building multiple copies of buildings easy. It's possible to create rows or grids of buildings without resorting to `for` or `while` loops.

#### Parameters

 * numTimes (optional - default 2) : The number of times you want to repeat the preceding statements.

#### Example

Say you want to do the same thing over and over. You have a couple of options...

 * You can use a for loop...

    d = new Drone(); for ( var i =0;i < 4; i++) {  d.cottage().right(8); }

While this will fit on the in-game prompt, it's awkward. You need to declare a new Drone object first, then write a for loop to create the 4 cottages. It's also error prone, even the `for` loop is too much syntax for what should really be simple.

 * You can use a while loop...
   
    d = new Drone(); var i=4; while (i--) {  d.cottage().right(8); }

... which is slightly shorter but still too much syntax. Each of the above statements is fine for creating a 1-dimensional array of structures. But what if you want to create a 2-dimensional or 3-dimensional array of structures? Enter the `times()` method.

The `times()` method lets you repeat commands in a chain any number of times. So to create 4 cottages in a row you would use the following statement...

    cottage().right(8).times(4);

...which will build a cottage, then move right 8 blocks, then do it again 4 times over so that at the end you will have 4 cottages in a row. What's more the `times()` method can be called more than once in a chain. So if you wanted to create a *grid* of 20 houses ( 4 x 5 ), you would do so using the following statement...

    cottage().right(8).times(4).fwd(8).left(32).times(5);

... breaking it down...

 1. The first 3 calls in the chain ( `cottage()`, `right(8)`, `times(4)` ) build a single row of 4 cottages.

 2. The last 3 calls in the chain ( `fwd(8)`, `left(32)`, `times(5)` ) move the drone forward 8 then left 32 blocks (4 x 8) to return to the original x coordinate, then everything in the chain is repeated again 5 times so that in the end, we have a grid of 20 cottages, 4 x 5.  Normally this would require a nested loop but the `times()` method does away with the need for loops when repeating builds.

Another example: This statement creates a row of trees 2 by 3 ...

    oak().right(10).times(2).left(20).fwd(10).times(3)

... You can see the results below.

![times example 1](img/times-trees.png)

### Drone.blocktype() method

Creates the text out of blocks. Useful for large-scale in-game signs.

#### Parameters
 
 * message - The message to create - (use `\n` for newlines)
 * foregroundBlock (default: black wool) - The block to use for the foreground
 * backgroundBlock (default: none) - The block to use for the background

#### Example

To create a 2-line high message using glowstone...

    blocktype("Hello\nWorld",blocks.glowstone);

![blocktype example][imgbt1]

[imgbt1]: img/blocktype1.png

### Drone.rainbow() method

Creates a Rainbow.

#### Parameters

 * radius (optional - default:18) - The radius of the rainbow

#### Example
    
    var d = new Drone();
    d.rainbow(30);

![rainbow example](img/rainbowex1.png)

### Drone.sphere() method

Creates a sphere.

#### Parameters
 
 * block - The block the sphere will be made of.
 * radius - The radius of the sphere.

#### Example

To create a sphere of Iron with a radius of 10 blocks...

    sphere( blocks.iron, 10);

![sphere example](img/sphereex1.png)

Spheres are time-consuming to make. You *can* make large spheres (250 radius) but expect the
server to be very busy for a couple of minutes while doing so.

### Drone.sphere0() method

Creates an empty sphere.

#### Parameters
 
 * block - The block the sphere will be made of.
 * radius - The radius of the sphere.

#### Example

To create a sphere of Iron with a radius of 10 blocks...

    sphere0( blocks.iron, 10);

Spheres are time-consuming to make. You *can* make large spheres (250 radius) but expect the
server to be very busy for a couple of minutes while doing so.

### Drone.hemisphere() method

Creates a hemisphere. Hemispheres can be either north or south.

#### Parameters

 * block - the block the hemisphere will be made of.
 * radius - the radius of the hemisphere
 * northSouth - whether the hemisphere is 'north' or 'south'

#### Example

To create a wood 'north' hemisphere with a radius of 7 blocks...

    hemisphere(blocks.oak, 7, 'north');

![hemisphere example](img/hemisphereex1.png)

### Drone.hemisphere0() method

Creates a hollow hemisphere. Hemispheres can be either north or south.

#### Parameters

 * block - the block the hemisphere will be made of.
 * radius - the radius of the hemisphere
 * northSouth - whether the hemisphere is 'north' or 'south'

#### Example

To create a glass 'north' hemisphere with a radius of 20 blocks...

    hemisphere0(blocks.glass, 20, 'north');

![hemisphere example](img/hemisphereex2.png)

### Drone.spiral_stairs() method

Constructs a spiral staircase with slabs at each corner.

#### Parameters

 * stairBlock - The block to use for stairs, should be one of the following...
   - 'oak'
   - 'spruce'
   - 'birch'
   - 'jungle'
   - 'cobblestone'
   - 'brick'
   - 'stone'
   - 'nether'
   - 'sandstone'
   - 'quartz'
 * flights - The number of flights of stairs to build.

![Spiral Staircase](img/spiralstair1.png)

#### Example

To construct a spiral staircase 5 floors high made of oak...

    spiral_stairs('oak', 5);

## Example Plugin #1 - A simple extension to Minecraft.

A simple minecraft plugin. The most basic module.

### Usage: 

At the in-game prompt type ...
  
    /js hello(self)

... and a message `Hello {player-name}` will appear (where
  {player-name} is replaced by your own name).
  
This example demonstrates the basics of adding new functionality which
is only usable by server operators or users with the
scriptcraft.evaluate permission. By default, only ops are granted this
permission.
  
The `hello` function below is only usable by players with the scriptcraft.evaluate 
permission since it relies on the `/js` command to execute.

    exports.hello = function(player){
        player.sendMessage('Hello ' + player.name);
    };

## Example Plugin #2 - Making extensions available for all players.

A simple minecraft plugin. Commands for other players.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello

... and a message `Hello {player-name}` will appear (where {player-name} is 
replaced by your own name).
  
This example demonstrates the basics of adding new functionality
which is usable all players or those with the scriptcraft.proxy
permission.  By default, all players are granted this permission.
  
This differs from example 1 in that a new 'jsp ' command extension
is defined. Since all players can use the `jsp` command, all players
can use the new extension. Unlike the previous example, the `jsp hello` 
command does not evaluate javascript code so this command is much more secure.

    command('hello', function (parameters, player) {
        player.sendMessage('Hello ' + player.name);
    });

## Example Plugin #3 - Limiting use of commands to operators only.

A simple minecraft plugin. Commands for operators only.

### Usage: 

At the in-game prompt type ...
  
    /jsp op-hello

... and a message `Hello {player-name}` will appear (where {player-name} is 
replaced by your own name).
  
This example demonstrates the basics of adding new functionality
which is usable all players or those with the scriptcraft.proxy
permission. By default, all players are granted this permission. In
this command though, the function checks to see if the player is an
operator and if they aren't will return immediately.
 
This differs from example 2 in that the function will only print a
message for operators.

    command('op-hello', function (parameters, player) {
        if (!player.op){
            player.sendMessage('Only operators can do this.');
            return;
        }
        player.sendMessage('Hello ' + player.name);
    });
## Example Plugin #4 - Using parameters in commands.

A simple minecraft plugin. Handling parameters.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello-params Hi
    /jsp hello-params Saludos 
    /jsp hello-params Greetings

... and a message `Hi {player-name}` or `Saludos {player-name}` etc
will appear (where {player-name} is replaced by your own name).
  
This example demonstrates adding and using parameters in commands.
  
This differs from example 3 in that the greeting can be changed from
a fixed 'Hello ' to anything you like by passing a parameter.

    command( 'hello-params', function ( parameters, player ) {
      var salutation = parameters[0] ;
      player.sendMessage( salutation + ' ' + player.name );
    });

## Example Plugin #5 - Re-use - Using your own and others modules.

A simple minecraft plugin. Using Modules.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello-module

... and a message `Hello {player-name}` will appear (where {player-name} is 
replaced by your own name).
  
This example demonstrates the use of modules. In
example-1-hello-module.js we created a new javascript module. In
this example, we use that module...

 * We load the module using the `require()` function. Because this
   module and the module we require are n the same directory, we
   specify `'./example-1-hello-module'` as the path (when loading a
   module from the same directory, `./` at the start of the path
   indicates that the file should be searched for in the same
   directory.

 * We assign the loaded module to a variable (`greetings`) and then
   use the module's `hello` method to display the message. 

Source Code...

    var greetings = require('./example-1-hello-module');
    command( 'hello-module', function( parameters, player ) {
      greetings.hello( player );
    });

## Example Plugin #6 - Re-use - Using 'utils' to get Player objects.

A simple minecraft plugin. Finding players by name.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello-byname {player-name}

... substituting {player-name} with the name of a player currently
online and a message `Hello ...` will be sent to the named
player.
  
This example builds on example-5 and also introduces a new concept -
use of shared modules. That is : modules which are not specific to
any one plugin or set of plugins but which can be used by all
plugins. Shared modules should be placed in the
`scriptcraft/modules` directory.
  
 * The utils module is used. Because the 'utils' module is
   located in the modules folder we don't need to specify an exact
   path, just 'utils' will do. 
 
 * The `utils.player()` function is used to obtain a player object
   matching the player name. Once a player object is obtained, a
   message is sent to that player.

Source Code ...

    var utils = require('utils');
    var greetings = require('./example-1-hello-module');

    command( 'hello-byname', function( parameters, sender ) {
      var playerName = parameters[0];
      var recipient = utils.player( playerName );
      if ( recipient ) {
        greetings.hello( recipient );
      } else {
        sender.sendMessage( 'Player ' + playerName + ' not found.' );
      }
    });

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
    'callback'). In ScriptCraft, this function takes a single
    parameter, an event object. All of the information about the event
    is in the event object.

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

    events.on( 'player.PlayerJoinEvent', function( event ) {
      if ( event.player.op ) {
        event.player.sendMessage('Welcome to ' + __plugin);
      }
    });

Update: Since version 2.0.8 the above code can be replaced by the more succinct:

    events.playerJoin( function( event ) {
      if ( event.player.op ) {
        event.player.sendMessage('Welcome to ' + __plugin);
      }
    });
    
## Arrows Plugin

The arrows mod adds fancy arrows to the game. Arrows which... 

 * Launch fireworks.
 * Explode on impact. 
 * Force Lightning to strike where they land.
 * Teleport the player to the landing spot.
 * Spawn Trees at the landing spot.

### Usage: 

  * `/js arrows.firework(self)` - A firework launches where the the arrow lands.
  * `/js arrows.lightning(self)` - lightning strikes where the arrow lands.
  * `/js arrows.teleport(self)` - makes player teleport to where arrow has landed.
  * `/js arrows.flourish(self)` - makes a tree grow where the arrow lands.
  * `/js arrows.explosive(self)` - makes arrows explode.
  * `/js arrows.normal(self)` sets arrow type to normal.
  * `/js arrows.sign(self)` turns a targeted sign into a Arrows menu

All of the above functions can take an optional player object or name
as a parameter. For example: `/js arrows.explosive('player23')` makes
player23's arrows explosive.
 
## Spawn Plugin

Allows in-game operators to easily spawn creatures at current location.

### Usage

    /jsp spawn cow
    /jsp spawn sheep
    /jsp spawn wolf

This command supports TAB completion so to see a list of possible
entitities, type `/jsp spawn ' at the in-game command prompt, then
press TAB. Visit
<http://jd.bukkit.org/beta/apidocs/org/bukkit/entity/EntityType.html>
for a list of possible entities (creatures) which can be spawned.

## alias Plugin

The alias module lets players and server admins create their own
per-player or global custom in-game command aliases.

### Examples

To set a command alias which is only visible to the current player
(per-player alias)...

    /jsp alias set cw = time set {1} ; weather {2}

... Creates a new custom command only usable by the player who set
it called `cw` (short for set Clock and Weather) which when invoked...

    /cw 4000 sun

... will perform the following commands...

    /time set 4000
    /weather sun

Aliases can use paramters as above. On the right hand side of the `=`, the 
`{1}` refers to the first parameter provided with the `cw` alias, `{2}`
refers to the second parameter and so on. So `cw 4000 sun` is converted to 
`time set 4000` and `weather sun`. 

To set a global command alias usable by all (only operators can create
such an alias)...

    /jsp alias global stormy = time 18000; weather storm

To remove an alias ...

    /jsp alias remove cw

... removes the 'cw' alias from the appropriate alias map.

To get a list of aliases currently defined...

    /jsp alias list

To get help on the `jsp alias` command:

    /jsp alias help

Aliases can be used at the in-game prompt by players or in the server
console.  Aliases will not be able to avail of command autocompletion
(pressing the TAB key will have no effect).

## Classroom Plugin

The `classroom` object contains a couple of utility functions for use
in a classroom setting. The goal of these functions is to make it
easier for tutors to facilitate ScriptCraft for use by students in a
classroom environment. Although granting ScriptCraft access to
students on a shared server is potentially risky (Students can
potentially abuse it), it is slighlty less risky than granting
operator privileges to each student. (Enterprising students will
quickly realise how to grant themselves and others operator privileges
once they have access to ScriptCraft).

The goal of this module is not so much to enforce restrictions
(security or otherwise) but to make it easier for tutors to setup a
shared server so students can learn Javascript. When scripting is
turned on, every player who joins the server will have a dedicated
directory into which they can save scripts. All scripts in such
directories are automatically watched and loaded into a global
variable named after the player.

So for example, if player 'walterh' joins the server, a `walterh`
global variable is created. If a file `greet.js` with the following
content is dropped into the `plugins/scriptcraft/players/walterh`
directory...

```javascript
exports.hi = function( player ){
  player.sendMessage('Hi ' + player.name);
};
```

... then it can be invoked like this: `/js walterh.hi( self )` . This
lets every player/student create their own functions without having
naming collisions.

It's strongly recommended that the
`craftbukkit/plugins/scriptcraft/players/` directory is shared so that
others can connect to it and drop .js files into their student
directories. On Ubuntu, select the folder in Nautilus (the default
file browser) then right-click and choose *Sharing Options*, check the
*Share this folder* checkbox and the *Allow others to create and
delete files* and *Guest access* checkboxes. Click *Create Share*
button to close the sharing options dialog. Students can then access
the shared folder as follows...

 * Windows:   Open Explorer, Go to \\{serverAddress}\players\
 * Macintosh: Open Finder,   Go to smb://{serverAddress}/players/
 * Linux:     Open Nautilus, Go to smb://{serverAddress}/players/

... where {serverAddress} is the ip address of the server (this is
displayed to whoever invokes the classroom.allowScripting() function.)

### classroom.allowScripting() function

Allow or disallow anyone who connects to the server (or is already
connected) to use ScriptCraft. This function is preferable to granting 'ops' privileges 
to every student in a Minecraft classroom environment.

Whenever any file is added/edited or removed from any of the players/
directories the contents are automatically reloaded. This is to
facilitate quick turnaround time for students getting to grips with
Javascript.

#### Parameters

 * canScript : true or false

#### Example

To allow all players (and any players who connect to the server) to
use the `js` and `jsp` commands...

    /js classroom.allowScripting( true, self )

To disallow scripting (and prevent players who join the server from using the commands)...

    /js classroom.allowScripting( false, self )

Only ops users can run the classroom.allowScripting() function - this is so that students 
don't try to bar themselves and each other from scripting.

## Commando Plugin

### Description

commando is a plugin which can be used to add completely new commands
to Minecraft.  Normally ScriptCraft only allows for provision of new
commands as extensions to the jsp command. For example, to create a
new simple command for use by all players...

    /js command('hi', function(args,player){ player.sendMessage('Hi ' + player.name); });
  
... then players can use this command by typing...

    /jsp hi

... A couple of ScriptCraft users have asked for the ability to take
this a step further and allow the global command namespace to be
populated so that when a developer creates a new command using the
'command' function, then the command is added to the global command
namespace so that players can use it simply like this...

    /hi

... There are good reasons why ScriptCraft's core `command()` function
does not do this. Polluting the global namespace with commands would
make ScriptCraft a bad citizen in that Plugins should be able to work
together in the same server and - as much as possible - not step on
each others' toes. The CraftBukkit team have very good reasons for
forcing Plugins to declare their commands in the plugin.yml
configuration file. It makes approving plugins easier and ensures that
craftbukkit plugins behave well together. While it is possible to
override other plugins' commands, the CraftBukkit team do not
recommend this. However, as ScriptCraft users have suggested, it
should be at the discretion of server administrators as to when
overriding or adding new commands to the global namespace is good.

So this is where `commando()` comes in. It uses the exact same
signature as the core `command()` function but will also make the
command accessible without the `jsp` prefix so instead of having to
type `/jsp hi` for the above command example, players simply type
`/hi` . This functionality is provided as a plugin rather than as part
of the ScriptCraft core.

### Example hi-command.js

    var commando = require('../commando');
    commando('hi', function(args,player){
       player.sendMessage('Hi ' + player.name);
    });

...Displays a greeting to any player who issues the `/hi` command.

### Example - timeofday-command.js 

    var times = {Dawn: 0, Midday: 6000, Dusk: 12000, Midnight:18000};
    commando('timeofday', function(params,player){
           player.location.world.setTime(times[params[0]]);
       },
       ['Dawn','Midday','Dusk','Midnight']);

... changes the time of day using a new `/timeofday` command (options are Dawn, Midday, Dusk, Midnight)

### Caveats

Since commands registered using commando are really just appendages to
the `/jsp` command and are not actually registered globally (it just
looks like that to the player), you won't be able to avail of tab
completion for the command itself or its parameters (unless you go the
traditional route of adding the `jsp` prefix). This plugin uses the
[PlayerCommandPreprocessEvent][pcppevt] which allows plugins to
intercepts all commands and inject their own commands instead. If
anyone reading this knows of a better way to programmatically add new
global commands for a plugin, please let me know.

[pcppevt]: http://jd.bukkit.org/dev/apidocs/org/bukkit/event/player/PlayerCommandPreprocessEvent.html

## homes Plugin

The homes plugin lets players set a location as home and return to the
location, invite other players to their home and also visit other
player's homes.

This module is a good example of how to create a javascript-based
minecraft mod which provides...

 * A programmatic interface (API) and 
 * A command extension which uses that API to provide new functionality for players.

The module uses the `plugin()` function to specify an object and
methods, and the `command()` function to expose functionality to
players through a new `jsp home` command. This module also
demonstrates how to enable autocompletion for custom commands (to see
this in action, at the in-game prompt or server console prompt type
`jsp home ` then press the TAB key - you should see a list of further
possible options).

The `jsp home` command has the following options...

### Basic options

 * `/jsp home set` Will set your current location as your
   'home' location to which you can return at any time using the ...

 * `/jsp home` ..command will return you to your home, if you have set one.

 * `/jsp home {player}` Will take you to the home of {player} (where 
   {player} is the name of the player whose home you wish to visit.

 * `/jsp home delete` Deletes your home location from the location
   database. This does not actually remove the home from the world or
   change the world in any way. This command is completely
   non-destructive and cannot be used for griefing. No blocks will be
   destroyed by this command.

### Social options
The following options allow players to open their homes to all or some
players, invite players to their home and see a list of homes they can
visit.

 * `/jsp home list` Lists home which you can visit.
 * `/jsp home ilist` Lists players who can visit your home.
 * `/jsp home invite {player}` Invites the named player to your home.
 * `/jsp home uninvite {player}` Uninvites (revokes invitation) the named player to your home.
 * `/jsp home public` Opens your home to all players (all players can visit your home).
 * `/jsp home private` Makes your home private (no longer visitable by all).

### Administration options
The following administration options can only be used by server operators...

 * `/jsp home listall` List all of the homes
 * `/jsp home clear {player}` Removes the player's home
   location. Again, this command does not destroy any structures in
   the world, it simply removes the location from the database. No
   blocks are destroyed by this command.

## NumberGuess mini-game: 

### Description
This is a very simple number guessing game. Minecraft will ask you to
guess a number between 1 and 10 and you will tell you if you're too
hight or too low when you guess wrong. The purpose of this mini-game
code is to demonstrate use of Bukkit's Conversation API.

### Example
    
    /js Game_NumberGuess.start(self)

Once the game begins, guess a number by typing the `/` character
followed by a number between 1 and 10.

## Cow Clicker Mini-Game

### How to Play

At the in-game prompt type `jsp cowclicker` to start or stop
playing. Right-Click on Cows to score points. No points for killing
cows (hint: use the same keyboard keys you'd use for opening doors).

Every time you click a cow your score increases by 1 point. Your score
is displayed in a side-bar along the right edge of of the screen.

![cow clicker](img/cowclicker.png)

### Rules

 * You can join and leave the Cow Clicker game at any time by typing
   `/jsp cowclicker` at the in-game prompt.

 * Once you leave the game, your score is reset to zero.

 * When you disconnect from the server, your score will be reset to zero.

### Gameplay Mechanics

This is meant as a trivially simple use of the [Bukkit Scoreboard
API][bukscore]. There are many things you'll want to consider when constructing
your own mini-game...

 * Is the game itself a long-lived game - that is - should players and
   scores be persisted (stored) between server restarts?  

 * What should happen when a player quits the server - should this also be
   understood as quitting the mini-game?

 * What should happen when a player who was previously playing the
   mini-game, joins the server - should they automatically resume the
   mini-game?

[bukscore]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scoreboard/package-summary.html

