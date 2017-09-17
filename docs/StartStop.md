# Starting your server with ScriptCraftJS

The installation notes explain how to build a Spigot server, start it, stop it, and add ScriptCraftJS. This page exists to make sure you know your options for starting the server.

There are two ways to start the services on your local PC. The following is Windows-specific, until someone contributes notes about Mac and Linux. :)

When building Spigot with BuildTools.jar, all of the required files for running Minecraft are generated into the folder with the .jar file. ScriptCraftJS is added by placing the scriptcraft.jar into the plugins folder and restarting the server.

### Starting Minecraft in Multiplayer Server Mode

Open a Windows command line (CMD) to the folder that contains the Spigot .jar file. At that command line, enter:

     java -jar spigot-1.12.1.jar

Of course if you're reading this documentation and there is another current Minecraft version, use the name of the correct .jar file.

Output like the following will stream by as the server starts and it initializes components:

```
Loading libraries, please wait...
[16:09:06 INFO]: Starting minecraft server version 1.12.1
[16:09:06 WARN]: To start the server with more ram, launch it as
                 "java -Xmx1024M -Xms1024M -jar minecraft_server.jar"
[16:09:06 INFO]: Loading properties
[16:09:06 INFO]: Default game type: CREATIVE
[16:09:06 INFO]: This server is running CraftBukkit version git-Spigot-65e8124-79e55b6
                 (MC: 1.12.1) (Implementing API version 1.12.1-R0.1-SNAPSHOT)
[16:09:06 INFO]: Debug logging is disabled
[16:09:06 INFO]: Server Ping Player Sample Count: 12
[16:09:06 INFO]: Using 4 threads for Netty based IO
[16:09:07 INFO]: Generating keypair
[16:09:07 INFO]: Starting Minecraft server on *:25565
[16:09:07 INFO]: Using default channel type
[16:09:09 INFO]: Set PluginClassLoader as parallel capable
[16:09:09 WARN]: **** SERVER IS RUNNING IN OFFLINE/INSECURE MODE!
...
[16:09:28 INFO]: Server permissions file permissions.yml is empty, ignoring it
[16:09:28 INFO]: Done (18.454s)! For help, type "help" or "?"
>
```

At the very bottom is the Minecraft "Ops" Operator command-line.

That is the Minecraft **Server**. It's the same as any server on the internet. You need to connect to it like it is a remote MultiPlayer server, not a local Single Player server.

Open your Minecraft launcher. The launcher is called a **Client** program which connects to a server. Select the PLAY option for the 1.12.1 Latest Release. This means you want to use a 1.12.1 client to some 1.12.1 server.

The initial game menu will open, showing options for Singleplayer, Multiplayer, and Minecraft Realms.

- Select Multiplayer to get to server selection.
- Click Add Server.
- Enter a name for your local Minecraft Server, like MY Server, or Home, or This PC.
- For the Server Address, enter "localhost" (without quotes).
- Click Done.

Back on the server selection page you may need to click Refresh. If you see your server at the bottom of the list, it means your Client program has connected to the Server - not for playing, yet, but just to verify that it's there.

Double-Click on your server, or Single-Click and then click Join Server. You should be in!

If you look at the console where you started your server, you should see that it recorded your connection:

    [16:56:10 INFO]: YourName[/127.0.0.1:13274] logged in with entity id 00 at ([world]1389.5, 4.0, 952.5)
    [16:59:59 INFO]: YourName lost connection: Disconnected

In your Ops console, enter the command **help**. A list of commands displays. Note that the commands have a slash '/' in front of them. At the console you do **not** need to enter the slash. The slash is only necessary in-game. Really, the slash in the game opens the command window - it's listed with the commands as a regular reminder that you need to open the command-line before entering any commands.

One of the commands in the list is /say. In the console, try "say hi". In-game you should see:
**[Server] hi**

The game doesn't know that you typed that. It just knows that the message is coming from "the server".

In-game, try "/say hi". The response begins "I'm sorry, but you do not have permission to perform this command..." To send a message in-game we use the default command "t" for Tell. Try "thello". The initial "t" means tell, which opens the in-game command window, and the text hello becomes a message broadcasted to everyone. In the console you'll see something like this:

[17:29:54 INFO]: \<YourName> hello

So the server console also sees what people type in-game.

OK, let's try the Other local mode.

To stop your server, in the ops command window type **stop**. You'll see output like this:

```
>stop
[17:35:05 INFO]: Stopping the server
[17:35:05 INFO]: Stopping server
[17:35:05 INFO]: Saving players
[17:35:05 INFO]: YourName lost connection: Server closed
[17:35:05 INFO]: YourName left the game
[17:35:05 INFO]: Saving worlds
[17:35:05 INFO]: Saving chunks for level 'world'/overworld
[17:35:05 INFO]: Saving chunks for level 'world_nether'/the_nether
[17:35:05 INFO]: Saving chunks for level 'world_the_end'/the_end
>
C:\Development\Minecraft\spigotmc>
```

Your game screen will show "Connection lost ... Server closed". And if you go back to the server list and click Refresh, you'll see that it cannot connect to the server anymore ... because it's down.

### Starting Minecraft in Singleplayer Server Mode

**This section will be updated**
<!-- TODO check singleplayer -->
This is normal single-player mode but you want to use the local server code where the plugins folder has a sub-folder for ScriptCraft. In this mode you don't need to start the server, the game does that for you, but you need to tell the game where to go so that it starts the right server code and so that it loads ScriptCraft.

If you have the Windows (CMD) command line open, you can close it. It's not needed here. If Minecraft is open, close it all down. Restart the launcher.

On the launcher screen there is a green selector for which Client version of Minecraft that you want to use. Click the arrow to see a list of the available options. If you connect to a v1.12 multiplayer server, you would use the v1.12 client software, so your client and server versions match.

In the top right corner, under Help, there is an icon to open a menu - it has three lines. This is called a "hamburger menu". Click that.

The menu options here are News, Skins, Settings, and Launch options. Click the Launch options text. You'll see a list of client versions that can be used with compatible servers.

- Click the Add New option.
- Give the configuration a unique Name, maybe "ScriptCraftJS"?
- Enable the Game Directory setting.
- Click the yellow folder icon.
- Navigate to the folder where you build your Spigot/Minecraft server, and select that folder.

Everything else should be fine with the default setting. Click Save. At this point you'll see the Launch options again. Click the Minecraft logo at the top of the page. The green Play selection is again at the bottom of the screen. Open the selector and scroll to see and select your new ScriptCraftJS launch option.

Now - If you click Play and then go to Singleplayer, it will use the Server software from the launcher folder. When you Create New World, your worlds will be saved in that folder.

- When you create worlds for a Multiplayer server, the data folders for those worlds are in the root/main folder where the server software is.
- In Singleplayer mode, your worlds are stored in a folder called `saves`.


[installdoc]: Installation.md