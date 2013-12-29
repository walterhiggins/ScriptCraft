# 2013 12 28

Documented the 'homes' module other tweaks to documentation.

# 2013 12 27

## Updated 'jsp alias' command.

The 'jsp alias' command now lets players define their own shortcuts
which don't require the 'jsp ' prefix.

### Example

At the in-game prompt use the following command to create a new alias
`cw` (short for change Clock & Weather) which will change the time and
weather using a single statement.

    /jsp alias set cw = time set {1} ; weather {2}

This creates a new cw alias which takes 2 parameters, time and weather
and passes them to the 'time set' and 'weather' commands. You use the
alias like this...

    /cw 4000 sun

... which in turn gets converted into these 2 commands...

    /time set 4000
    /weather sun

Aliases can be set on a per-player basis or can be set globally (for
all players). Aliases are automatically saved and restore on server
shutdown/startup.
    
## Added console global variable.

ScriptCraft now has a `console` global variable which can be used for
logging (to the server console). The `console` variable uses the
ScriptCraft plugin Logger object. You use the console object in your
javascript modules like this...

    console.info('Hello %s, %s', 'World', 'Universe');

... or simply...

    console.warn('Hello World');

# 2013 12 26

Made the `events` variable global because it is use by modules and
plugins. This means there is no longer any need to explicitly
`require('events')` since `events` is now a free variable in the
global namespace.

# 2013 12 25

Added the 'commando' module.

# 2013 12 24

## 'Modules' release

### Modules in ScriptCraft

ScriptCraft now has a simple module loading system. ScriptCraft now
uses the [CommonJS module contract][cjsmod] - that is - the same
module system used by Node.js. All of the javascript code which comes
bundled with ScriptCraft has been modified so that it conforms to the
CommonJS module system.

### What this means for plugins you've developed using ScriptCraft

If you have written plugins using a previous version of ScriptCraft then you have 2 options...

 1. Continue using the previous version of ScriptCraft.
 2. Update your plugins to work with the ScriptCraft 'Modules' release.

... Option 2 should be relatively straightforward if you follow these steps...

 1. Copy your own custom plugins from the `js-plugins` directory to the new `scriptcraft/plugins` directory.
 2. In your javascript code any functions, objects or variables which
    you want to expose for use by others should be exposed using the
    special `exports` variable. All other code within your .js files will
    now be private by default. See below for details on how
    CommonJS/Node.js modules work.

If you have any questions or concerns or need help converting your
existing javascript plugin, contact please post questions on the
[ScriptCraft forum][scforum] or open an issue on the [Github
project][github]

[github]: http://github.com/walterhiggins/ScriptCraft
[scforum]: https://groups.google.com/forum/?fromgroups=#!forum/scriptcraft---scripting-minecraft 

In ScriptCraft, files and modules are in one-to-one correspondence. As
an example, foo.js loads the module circle.js in the same directory.
*ScriptCraft now uses the same module system as Node.js - see [Node.js
Modules][njsmod] for more details.*

[njsmod]: http://nodejs.org/api/modules.html
[cjsmod]: http://wiki.commonjs.org/wiki/Modules/1.1.1

The contents of foo.js:

    var circle = require('./circle.js');
    echo( 'The area of a circle of radius 4 is '
               + circle.area(4));

The contents of circle.js:

    var PI = Math.PI;
    
    exports.area = function (r) {
      return PI * r * r;
    };

    exports.circumference = function (r) {
      return 2 * PI * r;
    };

The module circle.js has exported the functions area() and
circumference(). To add functions and objects to the root of your
module, you can add them to the special exports object.

Variables local to the module will be private, as though the module
was wrapped in a function. In this example the variable PI is private
to circle.js.

If you want the root of your module's export to be a function (such as
a constructor) or if you want to export a complete object in one
assignment instead of building it one property at a time, assign it to
module.exports instead of exports.

#### Module Loading

When the ScriptCraft Java plugin is first installed, a new
subdirectory is created in the craftbukkit directory. If your
craftbukkit directory is called 'craftbukkit' then the new
subdirectories will be ...

 * craftbukkit/scriptcraft/
 * craftbukkit/scriptcraft/plugins
 * craftbukkit/scriptcraft/modules
 * craftbukkit/scriptcraft/lib

... The `plugins`, `modules` and `lib` directories each serve a different purpose.

##### The plugins directory

At server startup the ScriptCraft Java plugin is loaded and begins
automatically loading and executing all of the modules (javascript
files with the extension `.js`) it finds in the `scriptcraft/plugins`
directory. All modules in the plugins directory are automatically
loaded into the `global` namespace. What this means is that anything a
module in the `plugins` directory exports becomes a global
variable. For example, if you have a module greeting.js in the plugins
directory....

    exports.greet = function() {
        echo('Hello ' + self.name);
    };

... then `greet` becomes a global function and can be used at the
in-game (or server) command prompt like so...

    /js greet()

... This differs from how modules (in NodeJS and commonJS
environments) normally work. If you want your module to be exported
globally, put it in the `plugins` directory. If you don't want your
module to be exported globally but only want it to be used by other
modules, then put it in the `modules` directory instead. If you've
used previous versions of ScriptCraft and have put your custom
javascript modules in the `js-plugins` directory, then put them in the
`scriptcraft/plugins` directory. To summarise, modules in this directory are ...

 * Automatically loaded and run at server startup.
 * Anything exported by modules becomes a global variable.

##### The modules directory

The module directory is where you should place your modules if you
don't want to export globally. In javascript, it's considered best
practice not to have too many global variables, so if you want to
develop modules for others to use, or want to develop more complex
mods then your modules should be placed in the `modules` directory.
*Modules in the `modules` directory are not automatically loaded at
startup*, instead, they are loaded and used by other modules/plugins
using the standard `require()` function.  This is the key difference
between modules in the `plugins` directory and modules in the
`modules` directory. Modules in the `plugins` directory are
automatically loaded and exported in to the global namespace at server
startup, modules in the `modules` directory are not.

##### The lib directory

Modules in the `lib` directory are for use by ScriptCraft and some
core functions for use by module and plugin developers are also
provided. The `lib` directory is for internal use by ScriptCraft.
Modules in this directory are not automatically loaded nor are they
globally exported.
