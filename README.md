ScriptCraft
===========

A Minecraft mod that lets you build using Javascript

Description
===========
The ScriptCraft mod lets you enter javascript commands at the in-game prompt. 
To bring up the in-game prompt press the `/` key then type `js ` followed by any javascript statement. 
E.g. `/js 1+1` will print 2.
ScriptCraft uses Rhino (The built-in javascript interpreter that comes with current versions of Java).  
Unfortunately, due to the need to reobfuscate the Minecraft codebase , it is not possible to expose the entire 
Minecraft Java API via Javascript as this goes against the current terms of use for MCP (Minecraft is not open source).

As of Dec 27 2012, the ScriptCraft mod includes just a few built-in objects and functions to make building easier.

 * help() - Brings up a short help message.
 * print(message) - prints a message on the command screen. e.g. `/js print(1+3);`  
 * load('path-to-script.js') - lets you load and execute any javascript source file. Calling load() with no parameters will bring up a File Chooser dialog. (In the context of script files, the $SCRIPT js variable will refer to the current script filename and $SCRIPTPATH refers to the directory in which the current script resides.)
 * player - the Player object - unfortunately this isn't currently useful as its properties are obfuscated.
 * world - The minecraft world object - again - all properties are currently obfuscated.
 * getMousePos() - A function which returns the current position of the cross-hairs (if a block is selected)
 * getPlayerPos() - A function which returns the current position of the player.
 * putBlock(x,y,z,blockId,metaData) - A function which lets you place a block anywhere
 * putSign(String[] texts, x,y,z,blockId, metaData) - A function which lets you place a sign.

The above primitives can be used to create buildings which would otherwise be time-consuming to create manually.
It is highly recommended using the attached drone.js javascript module which provides a fluent API for building. 
The Javascript `Drone` class provides a much richer API which can be used to construct buildings. See the attached
`cottage.js` file for an example of how to load and use the `drone.js` module.

Prerequisites
=============
You'll need to install the Minecraft Coder Pack and be comfortable installing a Minecraft Mod.
You can get the Minecraft Coder Pack here...

http://mcp.ocean-labs.de/index.php/Main_Page

... You will need to follow MCP's instructions to decompile your minecraft.jar file, then apply the ServerCommandManager.patch file to the $MCP/src/minecraft/net/minecraft/src/ServerCommandManager.java file. 
Then copy the CommandScript.java file to $MCP/src/minecraft/net/minecraft/src/ directory (where $MCP is the location where you've installed Minecraft Coder pack).
Then run ./reobfuscate.sh and follow MCP's instructions for copying the obfuscated files and rebuilding the minecraft.jar file.

Getting Started
===============

Once you've installed the mod, launch Minecraft and type `/js load()` and load the `cottage.js` file. Once the cottage.js file is loaded you can create a new cottage by typing `/js cottage()`.
Take a look over the cottage.js file to see how the Drone module can be used to easily create buildings. You can even create a whole row of cottages using the following in-game command...

    /js load("./cottage"); // path may vary on your machine
    /js d = new Drone(); for (i=0; i < 20;i++){ cottage(d).right(10);}

The above code loads the example blueprint for a cottage and uses a `for` loop to create multiple cottages 
from the blueprint. Keep a Minecraft Block reference handy - there's one here ...

http://www.minecraftinfo.com/idlist.htm

Griefing
========
Don't do it.


