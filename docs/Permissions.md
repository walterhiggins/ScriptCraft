# Permissions in ScriptCraft

Players can be given and denied permissions in Minecraft. The owner of a server can play as the Operator or as a less-privileged user. On logging in, the game doesn't know whether any given player is the Operator or just a visitor, unless it's told. This section describes how to give and deny specific players access to specific features.

Having said that, this needs to be limited to what's relevant to ScriptCraft users. There are many ways to manage permissions in Minecraft so this is just a minimal primer, not discussing favorite, preferred, or "best" methods, but just getting the job done to get started. Once you have your system working with the information here, feel free to look further into the topic, try, and choose your own favorites.

### Permissions Defined

A "permission" is a setting in a configuration file. Developers will recognize the term "flag". If a player has a flag set, they can perform an action. For example, the "minecraft.command.say" permission determines whether a player can use the /say command.

Minecraft generally supports Group permissions and User permissions. Groups are assigned names like Builders, Students, or Observers. Users in a Group have the permissions assigned to that group. There are default permissions, and a group might be created which is simply missing undesirable defaults.

Users are players who can have individual permissions in addition to their group assignment. Players don't need to be assigned to a group. They can be given and denied specific permissions.

Examples:

- A Builder group should have all permissions required to move blocks, but perhaps not to ignite TNT and not to use ScriptCraftJS.
- A Student group might have all of the permissions of Builders, plus the ability to use ScriptCraftJS, but still not to ignite TNT.
- An Observer group might have all permissions of Students, plus the ability to fly, go through walls, and teleport.
- One player might be assigned to the Student group but get an individual permission to fly, and (for some random reason) they might lose the permission to go through a portal.

### Operator Permissions

If you are installing Minecraft and ScriptCraft for your own personal use, you can easily use all ScriptCraft features by giving yourself Operator privileges ("ops privs"). To Op yourself after you login, go to the Minecraft console and enter:

    op Your_User_Name

... of course, use your own user name...

In a classroom environment, the instructor should have Ops. But experience has proven that there is chaos if everyone in the room is an Op. Ops Privs must be reserved for those who know not to abuse the power.

### Managing Permissions

The default Minecraft / Spigot environment has very poor permissions management. There are no commands for managing groups or users. So we're going to discuss using a plugin to help in this area. Without a plugin like this, configuration files need to be manually edited ... a real pain. With a plugin like this, permissions are easily set from the server operator command-line, or with /slash commands in-game.

The plugin is called PermissionsEX, often referred to as PEX. Many people like PEX - it's sort of an industry standard. Many people prefer other tools, but again, for our purposes we're focused on simply getting the job done.

The PEX project is [here][pex]. Here is a [tutorial][pextut]. Here are details for using [PEX commands][pexcommands]. But we're going to get through the basics here.

[Download][pexdownload] the latest release - it's a .jar file just like the scriptcraft.jar.

Install [just like ScriptCraftJS][installdoc]:

- Stop the Minecraft server process.
- Put the "PermissionsEx-1.x.y.jar" file into your plugins folder.
- Start the Minecraft server.

That's all!

The permission we need to use the /js command in-game is `scriptcraft.evaluate`. When a player attempts to invoke the /js command, ScriptCraftJS will first check to see if they have that permission, and if so, then it goes on to process the request.

To give a player permissions:

    pex user Player_Name add scriptcraft.evaluate

That can be entered at the server operator prompt as-is, or in-game an Operator needs to first hit the / slash key with the command immediately following.  To pick that apart:

- The command is `pex`, meaning we want to do something with the PermissionsEX plugin.
- The keyword `user` is one of others in this position, and in this case means a user/player name follows.
- The player name follows.
- The keyword `add` or `remove` determines what is going to be done with the permission that follows.
- The name of the permission follows.

In the above example, to remove the ability of a player to say anything in-game:

    pex user Player_Name remove minecraft.command.say

With that permission removed, the player using /say will get a message that they cannot perform the command.

### ScriptCraft Classroom Plugin

In a classroom/codecamp environment an instructor may (as experience has proven) want some help to manage the environment. For this there is a built-in Classroom plugin. See the [API Reference][api] for details.

### Summary

That's really all we need to cover in this section. Moving forward, if you want to give or deny a player access to specific functionality, use a search engine to get information on 'vanilla', 'spigot', 'bukkit', or a specific plugin, look for the feature or command, and you will usually find the related permission name nearby.

- Where is the data stored?
    - For PEX it's minecraft root `\plugins\PermissionsEx\permissions.yml`.
- What's a YML file?
    - The answer is scary, that's why we're not going into it.
- How do I setup groups? worlds? defaults?
    - Similar to users, try "help pex" to see all of the command options.
- Can I change permissions from ScriptCraaftJS scripts?
    - Great question! :)  And yes you can!
- How do I change to another permissions system?
    - Search around for permissions plugins, uninstall PEX, install something else.

[pex]: https://github.com/PEXPlugins/PermissionsEx
[pextut]: https://github.com/PEXPlugins/PermissionsEx/blob/master/doc/Tutorial.md
[pexcommands]: https://github.com/PEXPlugins/PermissionsEx/wiki/Commands#users-permission-management
[pexdownload]: https://dev.bukkit.org/projects/permissionsex
[installdoc]: Installation.md
[api]: API-Reference.md
