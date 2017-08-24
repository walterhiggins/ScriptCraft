# lib directory

This directory contains core ScriptCraftJS files and modules.

 * plugin.js - A module which provides support for persistent plugins (plugins which need to save state)
 * require.js - The require() function implementation. See [Node.js modules][njsmod] documentation.
 * scriptcraft.js - The core ScriptCraftJS code.
 * events.js - Event handling module for use by plugin/module developers.

When `require('modulename')` is called, if a file in the current working directory called 'modulename' is not found then the `lib` folder is the first location that `require()` looks for modules.

[njsmod]: http://nodejs.org/api/modules.html

