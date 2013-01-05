Bukkit Support
==============

I've created a Bukkit Plugin version of ScriptCraft. Because the Bukkit API is open, it's possible to do a whole lot more in the Bukkit Plugin version than in the original MCP (Minecraft Coder Pack) version.
The Bukkit Plugin version is also *much easer to install*.

Prerequisites
=============
You will need to install Rhino (A javascript implementation for java) if it is not already installed. 
To check if Rhino is already installed type...

    java org.mozilla.javascript.tools.shell.Main 
    
... at a command prompt. If Rhino is installed you should see the following...

    js> 
    
If Rhino is not already installed you can [download it][1], unzip it and copy the js.jar file to ...

 * Macintosh - /System/Library/Java/Extensions/
 * Windows - C:\jdk\jre\lib\ext (assuming the Java Dev Kit has been installed in c:\jdk)
 * Linux (Ubuntu) - /usr/lib/jvm/java-6-openjdk-i386/jre/lib/ext/ or /usr/lib/jvm/java-7-oracle/jre/lib/ext/ for Oracle Java

[1]: https://developer.mozilla.org/en/RhinoDownload

Installation
============
If you don't want to compile from source, you can [download the compiled plugin here][dl] and copy it the craftbukkit's plugins directory.

Post Install
============
If you want certain javascript source files to load automatically when you start up your CraftBukkit server, do the following...

 * Create a new js-plugins directory in the location where you normally launch CraftBukkit.
 * Copy the drone.js file to the newly-created js-plugins directory.

... All files in the js-plugins directory will be automatically loaded when CraftBukkit starts.
*Only players who are ops can use this plugin.* You can grant a player `op` privileges by adding them to the ops.txt file in your craftbukkit directory.
I need to add further (java level) security permissions to the plugin so that ops using the `js` command have limited access to the filesystem and OS.

Additional information
======================
Because the Bukkit API is open, all of the Bukkit API is accessible via javascript once the ScriptCraft plugin is loaded. For example, in addition to the functions provided in the MCP version of ScriptCraft, there are a couple of useful Java objects exposed via javascript in the Bukkit ScriptCraft plugin...

 * plugin - the ScriptCraft Plugin itself. This is a useful starting point for accessing other Bukkit objects. The `plugin` object is of type [org.bukkit.plugin.java.JavaPlugin][api] and all of its properties and methods are accessible. For example... `js plugin.getServer().getMotd()` returns the server's message of the day.
 * self - The player/command-block or server console operator who invoked the js command. Again, this is a good jumping off point for diving into the Bukkit API.

[dl]: http://walterhiggins.net/blog/files/scriptcraft.jar
[api]: http://jd.bukkit.org/apidocs/org/bukkit/plugin/java/JavaPlugin.html
