ScriptCraft
===========

A Minecraft mod that lets you build using Javascript.

(Update 2013/01/04 - I've created a Bukkit Plugin as this makes installing the mod much easier - assuming you're running a CraftBukkit server - which I recommend. See [Bukkit Support][buk] for details).

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
 * putBlock(x,y,z,blockId,metaData) - A function which lets you place a block anywhere (if no coordinates are given the block the player is currently looking at is replaced).
 * getBlock(x,y,z) - returns the blockId and metadata at the given location (if no coordinates are given the cross-hair location is used)
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

... You will need to follow MCP's instructions to decompile your minecraft.jar file.

You will also need to install Rhino (A javascript implementation for java) if it is not already installed. Type...

    java org.mozilla.javascript.tools.shell.Main 
    
... at a command prompt to see if Rhino is already installed. If Rhino is installed you should see the following...

    js> 
    
If Rhino is not already installed you can [download it][1], unzip it and copy the js.jar file to ...

 * Macintosh - /System/Library/Java/Extensions/
 * Windows - C:\jdk\jre\lib\ext (assuming the Java Dev Kit has been installed in c:\jdk)
 * Linux (Ubuntu) - /usr/lib/jvm/java-6-openjdk-i386/jre/lib/ext/ or /usr/lib/jvm/java-7-oracle/jre/lib/ext/ for Oracle Java

[1]: https://developer.mozilla.org/en/RhinoDownload

Installing
==========
Once you've installed Minecraft Coder Pack (MCP) and Rhino...
 1. Copy the CommandScript.java file to the src/minecraft/net/minecraft/src/ located in the directory where you installed MCP.
 2. Create a new directory called _ScriptCraft_ on your C:\ drive (Windows) or your home directory (Linux/Max), and copy all of the .js files provided.
 3. If you are on a Windows computer ...
    1. Launch Notepad (or your favourite text editor) and open file src/minecraft/net/minecraft/src/ServerCommandManager.java
    2. Insert a new line after `this.registerCommand(new CommandTime());`
    3. type `this.registerCommand(new CommandScript());` 
    4. Save the file and close the editor.
 4. If you are on a Linux or Mac OS X computer...
    1. Copy ServerCommandManager.patch to the directory where you installed MCP.
    2. Open a terminal window and `cd` to the directory where you installed MCP.
    3. enter the following command `patch src/minecraft/net/minecraft/src/ServerCommandManager.java ServerCommandManager.patch` 

 5. Open a Command Prompt (windows) or Terminal (Linux/Mac), go to the MCP directory and run `recompile.bat` (windows) or `./recompile.sh` (Linux/Mac)
 6. Run `reobfuscate.bat` (windows) or `./reobfuscate.sh` (Linux/Mac).
 7. Follow MCP's instructions for copying the obfuscated files and rebuilding the minecraft.jar file that is in %appdata%/minecraft/bin (windows), ~/Library/Application Support/Minecraft/bin (Mac) or ~/.minecraft/bin (Linux).

Getting Started
===============
Once you've installed the mod, launch Minecraft and type `/js load()` and load the `cottage.js` file. Once the cottage.js file is loaded you can create a new cottage by typing `/js cottage()`.
Take a look over the cottage.js file to see how the Drone module can be used to easily create buildings. You can even create a whole row of cottages using the following in-game command...

    /js load("./cottage"); // path may vary on your machine
    /js d = new Drone(); for (i=0; i < 20;i++){ cottage(d).right(10);}

The above code loads the example blueprint for a cottage and uses a `for` loop to create multiple cottages 
from the blueprint. Keep a Minecraft Block reference handy - there's one here ...

http://www.minecraftinfo.com/idlist.htm

Further Reading
===============
You can find more information about [ScriptCraft on my blog][blog].

[blog]: http://walterhiggins.net/blog/cat-index-scriptcraft.html
[buk]: https://github.com/walterhiggins/ScriptCraft/blob/master/bukkit.md

