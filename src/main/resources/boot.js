/*
 This file is the first and only file executed directly from the Java Plugin.
 */
var __scboot = null;
(function(){
  var File = java.io.File,
    FileReader = java.io.FileReader,
    FileOutputStream = java.io.FileOutputStream,
    ZipInputStream = java.util.zip.ZipInputStream,
    jsPlugins = new File('plugins/scriptcraft'),
    initScript = 'lib/scriptcraft.js';

  var unzip = function(path, logger, plugin) {
    var zis = new ZipInputStream(plugin.getResource(path)),
      entry, 
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
  __scboot = function ( plugin, engine )
  {
    var logger = plugin.logger, 
      cfg = plugin.config,
      cfgName, 
      initScriptFile = new File(jsPlugins,initScript),
      zips = ['lib','plugins','modules'],
      i = 0,
      len = zips.length;

    if (!jsPlugins.exists()){
      logger.info('Directory ' + jsPlugins.canonicalPath + ' does not exist.');
      logger.info('Initializing ' + jsPlugins.canonicalPath + ' directory with contents from plugin archive.');
      jsPlugins.mkdirs();
    }

    for (i = 0; i < len;i++){
      cfgName = 'extract-js.' + zips[i];
      if (cfg.getBoolean(cfgName)){
        unzip( zips[i] + '.zip',logger,plugin);
      }
    }
    plugin.saveDefaultConfig();
    
    engine.eval(new FileReader(initScriptFile));
    __onEnable(engine, plugin, initScriptFile);
  };
})();
