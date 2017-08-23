# Installation and First Use of ScriptCraftJS

For an update, this installation will over-write existing scripts, and ignore site-specific scripts that have been added. Get a backup before this process if local changes have been made to the core scripts.

To install ScriptCraftJS:

- Stop the Minecraft server process.
- Put the "scriptcraft.jar" file into your plugins folder.
- Start the Minecraft server.

This is what you can expect to see in the console:

Somewhere along with all of the other plugins, you'll see a line like this:

    [Server] INFO Loading ScriptCraftJS v3.2.2

Within seconds there will be more like this:

    19.08 14:06:24 [Server] INFO Unzipping /scriptcraft/lib/events-bukkit.js (5494.299444444445h)
    19.08 14:06:24 [Server] INFO Unzipping /scriptcraft/lib/console.js (5494.299444444445h)
    19.08 14:06:23 [Server] INFO Unzipping /scriptcraft/lib/command.js (5494.299444444445h)
    19.08 14:06:23 [Server] INFO No updates found!
    19.08 14:06:23 [Server] INFO Checking for updates compatible with your bukkit version [1.12]...

Note that the output here is in reverse order, which is the order displayed with some software, not others. After a check for Bukkit updates the scriptcraft.jar file will be unzipped. Folders and files will be extracted to the Minecraft root directory folder /scriptcraft. The `readme.md` file in that folder has information about the folders.

If there are any **ERROR**s like the following, please look for Support (forums, GitHub, chat, etc):

    19.08 14:06:25 [Server] ERROR Error evaluating scriptcraft/lib/scriptcraft.js ...

( TODO: More info to come... )