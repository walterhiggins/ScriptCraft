# Notes for Contributors

This project uses a Maven-like directory structure (but it does not use Maven)...

    src +
         main +
               java +
                     net +
                          walterhiggins +
                                         scriptcraft +
                                                       ScriptCraftPlugin.java

               js +
                   lib +
                        (core JavaScript code goes here. Modules in this directory
                         should not be 'require'd by plugin or module authors)
                   modules +
                        (this is where module authors should put modules for
                         use by others)
                   plugins +
                        (this is where plugins - scriptcraft extensions for use by
                         operators and players should go)
               resources +
                        plugin.yml
         docs +
               templates +
                        (documentation templates go here. If you want to make
                         changes to the young persons guide should be made to ypgpm.md)
                        ypgpm.md
               java +
                        (Contains a single Java program invoked by the build process to
                         generate some CanaryMod documentation)
                        jscript.java
               js +
                        (JavaScript source used to build the API reference and
                         table of contents for the API reference and Programming Guide
                         is located here)
    docs +
         (most files here can be edited. however, the following files should not be edited
         directly because they are constructed during the build process - yeah I know they
         strictly shouldn't be under source control but it's nice to have the markdown
         docs on GitHub for reading by non-contributors)

           API-Reference.md
           YoungPersonsGuideToProgrammingMinecraft.md

This project is build using Ant. If your IDE does not support Ant,
type `ant package` at the command line to build.

    build.xml
    build.properties

If you are not familiar with Ant, trust that everything builds correctly
with the current `build.xml` file. That file/process is key to rebuilding
documentation in the right order from all source files.

The `build.properties` file must be manually updated with the
"scriptcraft-version" that identifies the current build. This version
appears in the console on Minecraft server startup.

For the v3.2.x+ development effort, NetBeans has been used, so the project
contains artifacts related to NetBeans.

#### Significant change from prior releases

Due to licensing concerns, the great DMCA takedown of 2014, etc, the Spigot.jar
has been removed from this project, though it's still required to build. To get
the JAR back, follow the instructions in the Young People's doc, under section
*Installing SpigotMC*. That yields a Spigot.1.xx.yy.jar. Make a copy of that file,
and place it in the `lib` folder. The build should then continue without error.

## Core JavaScript modules

ScriptCraft's deployed core consists of a single Java source file (the
Bukkit/Spigot Plugin) and a tiny set of JavaScript source files located in
the src/main/js/lib directory. All other JavaScript files are
optional modules and plugins. `scriptcraft.js` is the first file
loaded by the Java plugin. `scriptcraft.js` in turn loads the `require.js`
file which initializes the CommonJS `require()` function, and all other
files in the `lib` directory are then loaded. Finally all of the modules
in the `plugins` directory are automatically loaded and any exports are
automatically exported to the global namespace. For example a file
called `greet.js` located in the plugins folder...

    // plugins/greet.js contents

    exports.greet = function(sender){
       sender.sendMessage('hello')
    }

... will be loaded at startup and the `greet` function will be
global. Anyone with operator privileges can type `/js greet(self)` at
the in-game command prompt to execute the function.

## Coding Conventions

See <https://github.com/rwaldron/idiomatic.js> for a recommended
approach to writing JavaScript code for ScriptCraft. ScriptCraft is
aimed at younger programmers so readability is important - moreso than
cleverness. If submitting new code for inclusion in ScriptCraft please
ensure it is documented using the guidelines below...

## Support for servers other than SpigotMC

Please see the [Dependencies][deps] doc which has many notes about whether ScriptCraft can or should support other server types.

## Documentation contributions

The Young Person's Guide to Programming in Minecraft source file is located at
`/src/docs/templates/ypgpm.md`.
*Do not make changes to /docs/YoungPersonsGuideToProgrammingMinecraft.md*

The `API-Reference.md` file is generated by the build from markdown comments
embedded in the JavaScript source.
*Do not make changes to /docs/API-Reference.md*
If you would like comments for contributed code to be included in the API
reference then enclose your comment as follows:

 * Start the comment block with a `/**********` (a forward-slash
   followed by 10 or more asterisk characters).
   *The start block must be at the start of the line.*

 * End the comment block with a `***/` (3 asterisk followed by a
   forward slash) at the start of a new line.

This is an example of a comment which will be included in the API reference...

    /*********************
    ## foo() function

    The foo() function performs foo-type operatations on all bars.

    ### Parameters

     * name : Name of the foo
     * count: Number of foos to perform


    ### Returns
    foo() returns a list of foos that were changed.

    ***/

Top level comments for a module should be a H2 heading `##`. Please
don't use a H1 heading ( `#` ) as this is used for the top-level API
document title.

## Contributing changes to the project

This applies to documentation, fixes, typos, or major enhancements. All changes go through GitHub. Start small, don't be too ambitious at first. Let's function as a team, not individuals working in isolation. Developers must coordinate to ensure that radical changes do not affect other efforts.

Rather than contributing plugins to the project, like a drone that builds a farm or a new command, it's much better to offer these in your repo for server managers to download. Consider: If you are actually changing how ScriptCraft works then the plugin belongs in the core. Otherwise, post the plugin elsewhere with instructions on how to use it. This allows you to modify your plugin without having to make core changes.

Try to minimize the amount of effort left for other ScriptCraft core developers. Some people want functionality built-in to ScriptCraft where it's not necessary. For example, "plugin x does a great job, so I re-wrote it in JavaScript and now want it in ScriptCraft". That leaves maintenance of that code to future ScriptCraft developers. The original plugin may evolve and obsolete the JavaScript contribution. It's much better to publish interfaces to other plugins than to try to get ScriptCraft itself to do lots of "non-core" things.

The process below describes how to approach coding for ScriptCraft, and addresses the above concerns.

1. Post a note in Issues about the problem that needs to be solved.
1. Wait for some feedback. Code may already be in progress that might invalidate changes you intend to make. You may get feedback about how or where to make changes.
1. Clone or fork from the latest working branch into your own GitHub repo. Ask if you're not sure which is the most current.
1. Commit your code to GitHub frequently to give others a chance to see if changes affect their efforts.
1. If you are making extensive changes, ask for feedback once in a while to verify that changes are going to work with the master project when merged back.
1. When done, submit a Pull Request to the branch from which you cloned or forked.

[deps]: Dependencies.md