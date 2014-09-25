
    /*
     wph 20140102 - warn if legacy 'craftbukkit/js-plugins' or 'craftbukkit/scriptcraft' directories are present
     */
module.exports = function( jsPluginsRootDir ) {
  var cbPluginsDir = jsPluginsRootDir.parentFile,
      cbDir = new File(cbPluginsDir.canonicalPath).parentFile,
      legacyExists = false,
      legacyDirs = [new File( cbDir, 'js-plugins' ), 
                    new File( cbDir, 'scriptcraft' )];

  for ( var i = 0; i < legacyDirs.length; i++ ) {
    if ( legacyDirs[i].exists() 
         && legacyDirs[i].isDirectory() ) {

      legacyExists = true; 

      console.warn('Legacy ScriptCraft directory %s was found. This directory is no longer used.',
	legacyDirs[i].canonicalPath);
      console.warn('Please put plugins in the plugins/scriptcraft/plugins directory');
    }
  }
  if ( legacyExists ) {
    console.info( 'Please note that the working directory for %s is %s', 
		  __plugin, jsPluginsRootDir.canonicalPath );
  }
};
