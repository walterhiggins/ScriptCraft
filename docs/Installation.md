# Installation and First Use of ScriptCraftJS

### Topics:

* Upgrades
* Installing Java
* Installing SpigotMC
    * Windows
    * Linux
    * Mac
    * All OS's
* Installing ScriptCraft (very easy compared to above)
* First Use
* After Installation

#### Before we begin...

While we try to provide and maintain accurate and complete information here, details outside of this project can change. Please follow what you can here, but if something doesn't work, please:

1. Search for solutions for the specific component/command for your operating system and configuration.
1. Report the documentation problem in GitHub Issues, citing the instruction where the problem occurred and the solution.

Please consider updates to this documentation as a part of your contribution to the project. We are not testing every environment and rely on feedback to improve accuracy.

#### OK, let's begin...

## Upgrades (if you already have ScriptCraftJS installed)
This installation will over-write existing ScriptCraftJS scripts. It will ignore your site-specific scripts that have been added. Get a backup before this process if local changes have been made to the core scripts. From here, an upgrade is the same as a new installation...

ScriptCraft works with the Bukkit/Spigot Mod and uses the Bukkit Configuration API. On first loading, ScriptCraft will create a `config.yml` file in the `plugins/scriptcraft` directory. This file looks like this:

    extract-js:
      plugins: true
      modules: true
      lib: true

This file allows ScriptCraft admins to turn on or off re-unzipping of the `modules`, `plugins` and `lib` folders when deploying a new version of ScriptCraft. It's strongly recommended that the `lib` directory always be set to true to get the latest core ScriptCraft code . The `modules` and `plugins` directories are optional and not part of ScriptCraft core. However, unless you have changed that code yourself, it is recommended that the installation be allowed to update those folders. If you have made changes in those folders, download and diff the code from the repo with your version to see what changes are required.

## Installing Java

Java is a programming language and "framework" for other code that works above it. It might already be on your system. If not, it's required for Minecraft, so you will need to install it. Download the Oracle version of the Java Runtime Environment version 1.8 (JRE 8) from [here][jre8] - get the right version for your OS. This is an easy step, and instructions and help for doing this are easy to find. If you prefer the OpenJDK version, information is available in this [StackOverflow thread][openjdk8] but you must decide which implementation you use.

For Mac, Java may need to be updated from the Apple distributed version, and even if previously updated, may need to be linked for shell/terminal use. The steps [here][macjava] may help, but that information is old, written for Java 6 and 7. We now need Java 8.

## Installing SpigotMC

If you already have Spigot installed on a hosted server, skip to [Installing ScriptCraftJS](#installing-scriptcraftjs).

Follow these steps to download and install SpigotMC v1.12.1+. This information comes from the SpigotMC [wiki][spigotbuild] and other sources. Separate instructions are provided for Windows, Linux, and Mac.

    TIP: There are several mentions of the Git software here. Git is a tool for interacting with software version-control systems. Once you have Git on your system you can use it to download and upload code from GitHub and other repositories. For Windows there is a Git GUI that's a little cryptic but it's worth knowing.

### On Windows

There are at least two ways to do this in Windows: One is the easy way and the other is ... for nerds.

#### The easy way

Use software that has been created for the purpose. The following comes from the SpigotMC wiki page [on this specific topic][spigotbuildgui]:

> **BuildToolsGUI by DemonWav**
> BuildToolsGUI is a user interface wrapper for BuildTools for Windows. It is compatible with Windows 7, 8, 8.1, and 10. It handles all of the dependencies to run BuildTools automatically. To use BuildToolsGUI you need to have .NET 4.5 installed on your Windows computer. If you have used your computer for a while, you probably already have it. If not, click [here][dotnet45] to install it. BuildToolsGUI will automatically check for updates every time you run it. You can **download it and find updates [here][buildguidl]**.

So that's the easy way: Download BuildToolsGUI and execute it. It will download everything for you and do everything that's required. If you choose this option, do the installation, then skip down to [Installing ScriptCraftJS](#installing-scriptcraftjs).

#### The nerdy approach

This also comes from the SpigotMC wiki page:

> Git - In order for BuildTools to run on Windows, you will need to install Git. For Windows it is distributed via git-scm, which can be downloaded [here][gitdl]. Install it where you like, it will provide git bash, which will be used to run the BuildTools jar. Just keep hitting Next when running the installer.

So if you want to see how this all happens, [download Git][gitdl] and then skip to [For All Platforms](#for-all-platforms).

Note: The [git-scm.com][gitscm] website has downloads for all platforms and all information that you could want on the topic.

### On Linux

(Sources include http://openjdk.java.net/install/)

Both git and Java, as well as util commands, can be installed using a single command via your package manager.

**Debian, Ubuntu, etc.:**
On the command line, type:

    $ sudo apt-get install git openjdk-8-jre

The openjdk-8-jre package contains just the Java Runtime Environment. If you want to develop Java programs then please install the openjdk-8-jdk package.

**Fedora, Oracle Linux, Red Hat Enterprise Linux, etc.**
On the command line, type:

    $ su -c "yum install git java-1.8.0-openjdk"

The java-1.8.0-openjdk package contains just the Java Runtime Environment. If you want to develop Java programs then install the java-1.8.0-openjdk-devel package.

**Arch Linux:**

    pacman -S jdk8-openjdk git

### On Mac

Git can be downloaded [here][macgit] and from the [git-scm.com][gitscm] website.

### For All Platforms

1. Download Spigot's [BuildTools.jar][spigotdl] This file contains instructions that will download all of the components necessary to build the Spigot software.
1. Save the BuildTools.jar file to a new directory. **C:\Temp\spigotmc** (or similar for Linux or Mac) is a good choice. The path cannot include spaces.
1. Do the build:
    1. Mac and Linux: Open a terminal window and click on the prompt in that window.
    1. In Windows: Open the Command window and enter `"C:\program file\git\git-bash"`. Use the quotes because the path has a space. That opens another window with the git command-line. Click on the prompt in that window. If git is in your path then you don't need the path here, just `git-bash`, and adjust the command if git is installed elsewhere.
    1. For all platforms: In the open window, type `java -jar BuildTools.jar`.
That will kick off a long series of commands to "build" SpigotMC.
1. After many minutes, when the build is done, there will be a new file beginning with `spigot` and ending in `.jar` in the spigotmc directory. Get that file name by typing `dir` (Windows) or `ls` (Mac and Linux).
1. Run this file by typing `java -jar spigot_file_name.jar` ... using the correct name of course.
1. The server will start up then quickly shut down by itself. You'll need to edit a file called `eula.txt` - change `eula=false` to `eula=true` and save the file.
1. Run the `java -jar spigot_file_name.jar` command again. This time the server will start up.
1. Before continuing, see below, [Configuring your Server](#configuring-your-server).
1. Run the `java -jar spigot.jar` command again (for v1.15.2 the actual name is spigot-1.15.2.jar). This time the server will start up and will eventually stop at a **>** prompt - that's the Minecraft Operator's command line.
1. Stop your Minecraft server: type `stop` at the "ops" prompt.

If there are no errors .... Congratulations! Your Spigot Minecraft server is installed!

You are probably used to starting Minecraft with a desktop icon and a launcher. We're doing the same thing but from the OS command-line. This will be explained soon.

    TIP: If you ever get a Minecraft console error: "Error, this build is outdated", the reason is that you have built your Spigot JAR from a development build. If the game starts and it's over three days past the build date, that error displays. Just rebuild, stop the server, re-upload your new JAR, and restart the server. Now THAT is nerdy.

## Configuring your Server

This is optional but for a classroom environment the following is advised to help remove game distractions. Once you've installed SpigotMC, depending on your specific needs, you might want to consider setting the following properties in the `server.properties` file.

    # completely flat worlds are best for building from scratch
    # For SpigotMC:
    level-type=FLAT
    generate-structures=false

    # creative mode
    gamemode=1
    pvp=false

    # turns off authentication (for classroom environments)
    online-mode=false
    spawn-npcs=false
    spawn-monsters=false

    # give your server a name that YOU like
    motd=My Cool ScriptCraftJS Server

## Installing ScriptCraftJS

Obtain the scriptcraft.jar file from the [latest_jar][dl] folder, or [download it from here][dl].

- Stop the Minecraft server process.
- Put the scriptcraft.jar into your plugins folder.
- Start the Minecraft server. (See [StartStop][startstop] doc for local server.)

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

You may get a security alert because Minecraft attempts to make network connections.

If there are any **ERROR**s like the following, please ask for [help][help]:

    19.08 14:06:25 [Server] ERROR Error evaluating scriptcraft/lib/scriptcraft.js ...

If there are no errors .... Congratulations! ScriptCraftJS is installed!

See the [Help][help] page and [StartStop][startstop] doc for more tips.

## First Use

At the bottom of the stream of output from the server you'll see the server `>` prompt. At that prompt, type `js 1 + 1` and hit enter. The result `"2"` should be displayed. (1+1=2, right?)

Congratulations again! You've just customized your Minecraft Server and are ready to begin writing your first mod!

## After Installation

Once installed, a new `scriptcraft/plugins` directory is automatically created.  All files in the `scriptcraft/plugins` directory will be automatically loaded when the server starts.

Until you change player [Permissions][permissions], only players who are Operators (administrators) can use this plugin. You can grant a player `ops` privileges by typing 'op &lt;username>' (replacing &lt;username> with your own Minecraft user name) at the server console prompt or by adding the player to the ops.json file in your server directory.

Launch the server, then launch the Minecraft client and create a new server connection. The IP address will be `localhost`. Once you've connected to your server and have entered the game, look at a ground-level block and type:

    /js up().box( blocks.wool.black, 4, 9, 1 )

&hellip; This will create a black monolith structure 4 blocks wide by 9 blocks high by 1 block long.  Take a look at the
[src/main/js/modules/drone/index.js](../src/main/js/modules/drone/index.js) file and other documentation here to see what ScriptCraft's drone can do. That drone folder has many files that serve as great coding examples. See also [src/main/js/plugins/drone/contrib](../src/main/js/plugins/drone/contrib).

If you're interested in customizing Minecraft beyond just creating new buildings, take a look at [the homes mod][homes] for an example of how to create a more fully-featured JavaScript plugin for Minecraft.

[buildguidl]: https://www.spigotmc.org/resources/buildtoolsgui.22267/
[dl]: ../latest_jar/
[dotnet45]: https://www.microsoft.com/en-us/download/details.aspx?id=30653
[gitdl]: https://git-for-windows.github.io/
[gitscm]: https://git-scm.com/downloads
[help]: Help.md
[homes]: ../src/main/js/plugins/homes/homes.js
[jre8]: http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
[macjava]: https://gist.github.com/johan/10590467
[macgit]: http://sourceforge.net/projects/git-osx-installer/files/
[openjdk8]: https://stackoverflow.com/questions/5991508/openjdk-availability-for-windows-os
[permissions]: Permissions.md
[spigotbuild]: https://www.spigotmc.org/wiki/buildtools/
[spigotbuildgui]: https://www.spigotmc.org/wiki/buildtools/#buildtoolsgui-by-demonwav
[spigotdl]: https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
[startstop]: StartStop.md
