'use strict';
var File = java.io.File;
module.exports = function find(dir, filter) {
  var result = [];
  function recurse( dir, store ) {
    var files, 
      len,
      i,
      file,
      dirfile = new File( dir );
    
    if ( typeof filter == 'undefined' ) {
      files = dirfile.list();
    } else {
      files = dirfile.list(filter);
    }
    len = files.length; i = 0;
    for (; i < len; i++){
      file = new File( dir + '/' + files[i] );
      if ( file.isDirectory() ) {
        recurse( file.canonicalPath, store );
      } else {
        store.push( ('' + file.canonicalPath).replace(/\\\\/g,'/') );
      }
    }
  }
  recurse( dir, result );
  return result;
};
