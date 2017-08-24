/*
 This file is the first and only file executed directly from the Java Plugin.
 */
var __scboot = null;
var CORE_UNKNOWN = 'Unrecognized Minecraft core. Bukkit/Spiggot and Canary are supported.';
/*
 *  The anonymous function below encompasses the entire file.
 *  It gets executed when boot.js first invoked from the
 *  onEnable event in ScriptCraftPlugin.java.
 *  After this is executed and all variables initialized, onEnable
 *  executes the __scboot function nested within the function below,
 *  to do more intialization.
 */
(function() {
    var File = java.io.File,
        FileReader = java.io.FileReader,
        FileOutputStream = java.io.FileOutputStream,
        ZipInputStream = java.util.zip.ZipInputStream,
        //jsPlugins = new File('plugins/scriptcraft'),
        jsPlugins = new File('scriptcraft'), // folder at Minecraft root
        initScript = 'lib/scriptcraft.js'; // \src\main\js\lib\scriptcraft.js
    var unzip = function(zis, logger) {
        var entry,
            reason = null,
            unzipFile = false,
            zTime = 0,
            fTime = 0,
            fout = null,
            c,
            newFile;
        while((entry = zis.nextEntry) != null) {
            newFile = new File(jsPlugins, entry.name);
            if(entry.isDirectory()) {
                newFile.mkdirs();
                zis.closeEntry();
                continue;
            }
            reason = null;
            zTime = entry.time;
            unzipFile = false;
            if(!newFile.exists()) {
                reason = 'NE';
                unzipFile = true;
            } else {
                fTime = newFile.lastModified();
                if(zTime > fTime) {
                    reason = ((zTime - fTime) / 3600000) + "h";
                    unzipFile = true;
                }
            }
            if(unzipFile) {
                logger.info('Unzipping ' + newFile.canonicalPath + ' (' + reason + ')');
                fout = new FileOutputStream(newFile);
                for(c = zis.read(); c != -1; c = zis.read()) {
                    fout.write(c);
                }
                fout.close();
            }
            zis.closeEntry();
        }
        zis.close();
    };
    /*
     Called from Java plugin
     @argument {ScriptCraftPlugin} plugin,
     @argument {ScriptEngine} engine,
     @argument {Object} classLoader:
     Not passed from \src\main\java\bukkit\org\scriptcraftjs\bukkit\ScriptCraftPlugin.java
     But IS passed in from \src\main\java\canary\org\scriptcraftjs\canarymod\ScriptCraftPlugin.java
     */
    __scboot = function(plugin, engine, classLoader) {
        /**
         *       .logger is a org.bukkit.plugin.PluginLogger object.
         *       .loader is a org.bukkit.plugin.PluginLoader object.
         *       Both are inherited by the plugin from abstract JavaPlugin
         */
        var logger = plugin.canary ? plugin.logman : plugin.logger,
            initScriptFile = new File(jsPlugins, initScript), // Minecraft root/scriptcraft/lib/scriptcraft.js
            zips = ['lib', 'plugins', 'modules'],
            i = 0,
            zis,
            len = zips.length;
        // Try to create /scriptcraft folder if it doesn't exist
        if(!jsPlugins.exists()) {
            logger.info('Directory ' + jsPlugins.canonicalPath + ' does not exist.');
            logger.info('Initializing ' + jsPlugins.canonicalPath + ' directory with contents from plugin archive.');
            jsPlugins.mkdirs();
        }
        // Attempt to unzip the folders under /scriptcraft from compact zip files
        for(i = 0; i < len; i++) {
            if(plugin.canary) {
                zis = new ZipInputStream(classLoader.getResourceAsStream(zips[i] + '.zip'));
                unzip(zis, logger);
            } else if(plugin.bukkit) {
                if(plugin.config.getBoolean('extract-js.' + zips[i])) {
                    zis = new ZipInputStream(plugin.getResource(zips[i] + '.zip'));
                    unzip(zis, logger);
                }
            } else {
                logger.info(CORE_UNKNOWN);
            }
        }
        logger.info("Going to plugin.saveDefaultConfig()");
        if(plugin.bukkit) {
            plugin.saveDefaultConfig();
            logger.info("Back from plugin.saveDefaultConfig()");
        }
        try {
            // attempt to read the file /scriptcraft/lib/scriptcraft.js into
            // the engine. If it succeeds then the code there can be called from
            // here as though it's right in this same file. It is because it's all
            // in the currently executing engine.
            // If it does not exist an error will be thrown.
            logger.info("attempt to read the file /scriptcraft/lib/scriptcraft.js");
            engine.eval(new FileReader(initScriptFile));
            logger.info("success");
            // If we're here, file exists and has been loaded.
            // Continue handling the Java plugin onEnable method by invoking the
            // __onEnable function. That executes a lot of initialization code and
            // defines many common functions used throughout ScriptCraft.
            logger.info("set __onEnable(engine, plugin, initScriptFile)");
            __onEnable(engine, plugin, initScriptFile);
            logger.info("success");
            // When done, fall back through here and exit, OnEnable has been handled.
        } catch(e) {
            var msg = 'Error evaluating ' + initScriptFile + ': ' + e;
            plugin.canary ? logger.error(msg) : logger.severe(msg);
            throw e;
        }
    };
})();