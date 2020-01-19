// JX4 Plugin Loader
global.jx = {};
global.init = [];
global.plugins = [
   'core',
   'events',
   'bukkit-api',
   'wrappers'
];

// Load
try {
   plugins.forEach(function (path) {
      var plugin = require('./../jx/' + path + '.js');
      if (plugin.init) init.push(plugin.init);
      Object.keys(plugin).forEach(function (key) {
         jx[key] = plugin[key];
      });
   });
} catch (error) {
   jx.syntaxError = error;
   console.log('JX4 Syntax Error!');
   console.log(error);
}

// Initialize
try {
   init.forEach(function (script) {
      script(jx);
   });
} catch (error) {
   jx.scriptError = error;
   console.log('JX4 Script Error!');
   console.log(error);
}

// Cleanup
jx.test = [];
jx.init = null;

// Log
console.log('JX4 Initialized. Plugins: [' + plugins.join(', ') + ']');
