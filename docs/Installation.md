# Installation and First Use of ScriptCraftJS

### Upgrades

**To Upgrade if you already have ScriptCraftJS installed**
This installation will over-write existing ScriptCraftJS scripts. It will ignore your site-specific scripts that have been added. Get a backup before this process if local changes have been made to the core scripts. From here, an upgrade is the same as a new installation...

### Installation

To install ScriptCraftJS:

- Stop the Minecraft server process.
- Put the "scriptcraft.jar" file into your plugins folder.
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

If there are no errors, ScriptCraftJS is installed!

### First Use



See the [Help][help] page for more tips.

[help]: Help.md
[startstop]: StartStop.md
