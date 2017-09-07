# Installation and First Use of ScriptCraftJS

## Upgrades

**To Upgrade if you already have ScriptCraftJS installed**
This installation will over-write existing ScriptCraftJS scripts. It will ignore your site-specific scripts that have been added. Get a backup before this process if local changes have been made to the core scripts. From here, an upgrade is the same as a new installation...

ScriptCraft works with the Bukkit/Spigot Mod and uses the Bukkit Configuration API. On first loading, ScriptCraft will create a `config.yml` file in the `plugins/scriptcraft` directory. This file looks like this:

    extract-js:
      plugins: true
      modules: true
      lib: true

This file allows ScriptCraft admins to turn on or off re-unzipping of the `modules`, `plugins` and `lib` folders when deploying a new version of ScriptCraft. It's strongly recommended that the `lib` directory always be set to true to get the latest core ScriptCraft code . The modules and plugins directories are optional and not part of ScriptCraft core.

## Installing SpigotMC

If you already have Spigot installed on a hosted server, skip to Installing ScriptCraftJS.

Follow these steps to download and install SpigotMC v1.12.1+.

1. Download Spigot's [BuildTools.jar][spigotdl]
1. Save the BuildTools.jar file to a new directory called spigotmc.
1. Open a terminal (Mac and Linux) or command prompt (Windows) window and type `java -jar BuildTools.jar`. This will kick off a long series of commands to "build" SpigotMC.
1. When the build is done, there will be a new file beginning with `spigot` and ending in `.jar` in the spigotmc directory. Get that file name by typing `dir` (Windows) or `ls` (Mac and Linux).
1. Run this file by typing `java -jar spigot_file_name.jar` ... using the correct name of course.
1. The server will start up then quickly shut down by itself. You'll need to edit a file called `eula.txt` - change `eula=false` to `eula=true` and save the file.
1. Run the `java -jar spigot_file_name.jar` command again. This time the server will start up.
1. Shut it down by typing `stop` at the server prompt.

## Installing ScriptCraftJS:

- Stop the Minecraft server process.
- Put the "scriptcraft.jar" file (from the [latest_jar][dl] folder) into your plugins folder.
- Start the Minecraft server.

This is what you can expect to see in the console:

Somewhere along with all of the other plugins, you'll see a line like this:

    [scriptcraft] Loading ScriptCraftJS v3.x.y

Within seconds there will be more like this:

    [scriptcraft] Enabling scriptcraft v3.x.y
    [scriptcraft] Directory C:\...\spigotmc\scriptcraft does not exist.
    [scriptcraft] Initializing C:\Development\Minecraft\spigotmc\scriptcraft directory with contents from plugin archive.
    [scriptcraft] Unzipping C:\...\spigotmc\scriptcraft\lib\command.js (NE)
    [scriptcraft] Unzipping C:\...\spigotmc\scriptcraft\lib\console.js (NE)
    [scriptcraft] Unzipping C:\...\spigotmc\scriptcraft\lib\events-bukkit.js (NE)
    ...
    [scriptcraft] cow-clicker minigame is not yet supported

Note that the output here may be in reverse order, depending on your environment. After a check for Bukkit updates the scriptcraft.jar file will be unzipped. Folders and files will be extracted to the Minecraft root directory folder /scriptcraft. The `readme.md` file in that folder has information about the folders.

If there are any **ERROR**s like the following, please look for Support (forums, GitHub, chat, etc):

    19.08 14:06:25 [Server] ERROR Error evaluating scriptcraft/lib/scriptcraft.js ...

If there are no errors .... Congratulations! ScriptCraftJS is installed!

See the [Help][help] page and [StartStop][startstop] doc for more tips.

## First Use

From the server `>` prompt, type `js 1 + 1` and hit enter. The result `"2"` should be displayed.

Congratulations again! You've just installed your Custom Minecraft Server and are ready to begin writing your first mod!


## Post Install

Once installed, a new `scriptcraft/plugins` directory is automatically created.  All files in the `scriptcraft/plugins` directory will be automatically loaded when the server starts.

Until you change player [Permissions][permissions], only players who are ops can use this plugin. You can grant a player `op` privileges by typing 'op \<username>' (replacing \<username> with your own Minecraft user name) at the server console prompt or by adding the player to the ops.json file in your server directory.

Launch the server, then launch the Minecraft client and create a new server connection. The IP address will be `localhost` . Once you've connected to your server and have entered the game, look at a ground-level block and type:

    /js up().box( blocks.wool.black, 4, 9, 1 )

&hellip; This will create a black monolith structure 4 blocks wide by 9 blocks high by 1 block long.  Take a look at the
`src/main/javascript/drone/drone.js` file and other documentation here to see what ScriptCraft's drone can do.

If you're interested in customizing Minecraft beyond just creating new buildings, take a look at [the homes mod][homes] for an example of how to create a more fully-featured JavaScript plugin for Minecraft.

[dl]: latest_jar/
[help]: Help.md
[homes]: src/main/js/plugins/homes/homes.js
[permissions]: Permissions.md
[startstop]: StartStop.md
