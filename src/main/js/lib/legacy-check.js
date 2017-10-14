var File = java.io.File;
/*
  wph 20140102 - warn if legacy 'mcserver/js-plugins' or 
  'mcserver/plugins/scriptcraft' directories are present
*/
module.exports = function( jsPluginsRootDir ) {
  var mcServerDir = new File(jsPluginsRootDir.canonicalPath).parentFile;
  if (mcServerDir == null){
    console.warn('Could not find parent directory for ' + jsPluginsRootDir.canonicalPath);
    return;
  }
  var legacyExists = false,
    legacyDirs = [
      new File( mcServerDir, 'js-plugins' )
    ];

  for ( var i = 0; i < legacyDirs.length; i++ ) {
    if ( legacyDirs[i].exists() 
         && legacyDirs[i].isDirectory() ) {

      legacyExists = true; 

      console.warn('Legacy ScriptCraft directory %s was found. This directory is no longer used.',
        legacyDirs[i].canonicalPath);
      console.warn('Please put plugins in the ' + jsPluginsRootDir.canonicalPath + '/plugins directory');
    }
  }
  if ( legacyExists ) {
    console.info( 'The working directory for %s is %s', 
      __plugin, jsPluginsRootDir.canonicalPath );
  }
};
