# scriptcraft root directory

This directory contains the following subdirectories...

 * `lib` : contains core ScriptCraftJS modules and code.
 * `modules` : contains JavaScript modules for use by others
 * `plugins` : contains JavaScript plugins (modules which are automatically loaded and globally-namespaced at startup)

`lib` : The `lib` directory is reserved for use by ScriptCraftJS. If a module is considered essential for all, or adds significantly useful new functionality to ScriptCraft then it should be placed in the `lib` directory.

`modules` : If you are a Minecraft modder who wants to develop more complex mods or provide an API for other modders, then modules intended for use by plugins (your own or others) should probably be placed in the `modules` directory.

`plugins` : If you are a Minecraft modder who wants to develop simple mods then the `plugins` location is where you should probably place your .js files.

See the [Help][help] page for more tips.

[help]: ../../docs/Help.md
