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
