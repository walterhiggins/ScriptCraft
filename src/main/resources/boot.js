/*
 This file is the first and only file executed directly from the Java Plugin.
 */
var __scboot = null;
(function(){
  var File = java.io.File,
    FileReader = java.io.FileReader,
    FileOutputStream = java.io.FileOutputStream,
    ZipInputStream = java.util.zip.ZipInputStream,
    //jsPlugins = new File('plugins/scriptcraft'),
    jsPlugins = new File('scriptcraft'),
    initScript = 'lib/scriptcraft.js';

  var unzip = function(zis, logger) {
    var entry, 
      reason = null, 
      unzipFile = false, 
      zTime = 0,
      fTime = 0, 
      fout = null, 
      c, 
      newFile;

    while ( ( entry = zis.nextEntry ) != null ) {

      newFile = new File(jsPlugins, entry.name);
      if (entry.isDirectory()){
        newFile.mkdirs();
        zis.closeEntry();
        continue;
      }
      reason = null;
      zTime = entry.time;
      unzipFile = false;
      if (!newFile.exists()) {
        reason = 'NE';
        unzipFile = true;
      }else{
        fTime = newFile.lastModified();
        if (zTime > fTime) {
          reason = ((zTime - fTime) / 3600000) + "h";
          unzipFile = true;
        }
      }
      if (unzipFile) {
        logger.info('Unzipping ' + newFile.canonicalPath + ' (' + reason + ')' );
        fout = new FileOutputStream(newFile);
        for (c = zis.read(); c != -1; c = zis.read()) {
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
   */
  __scboot = function ( plugin, engine, classLoader )
  {
    var logger = plugin.canary ? plugin.logman : plugin.logger, 
      initScriptFile = new File(jsPlugins,initScript),
      zips = ['lib','plugins','modules'],
      i = 0,
      zis,
      len = zips.length;

    if (!jsPlugins.exists()){
      logger.info('Directory ' + jsPlugins.canonicalPath + ' does not exist.');
      logger.info('Initializing ' + jsPlugins.canonicalPath + ' directory with contents from plugin archive.');
      jsPlugins.mkdirs();
    }

    for (i = 0; i < len;i++){
      if ( plugin.canary ) {
	zis = new ZipInputStream(classLoader.getResourceAsStream(zips[i] + '.zip'));
	unzip( zis, logger );
      } else {
	if ( plugin.config.getBoolean('extract-js.' + zips[i]) ) {
	  zis = new ZipInputStream(plugin.getResource(zips[i] + '.zip'));
          unzip( zis, logger );
	}
      }
    }
    if (plugin.bukkit) {
      plugin.saveDefaultConfig();
    } 
    try {
      engine.eval(new FileReader(initScriptFile));
      __onEnable(engine, plugin, initScriptFile);
    }catch ( e ){
      var msg = 'Error evaluating ' + initScriptFile + ': ' + e;
      plugin.canary ? logger.error(msg) : logger.severe(msg);
      throw e;
    }
  };
})();
