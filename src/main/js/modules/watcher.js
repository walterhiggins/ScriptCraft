'use strict';
/*global setTimeout, exports, require*/
var File = java.io.File;
/************************************************************************
## The watcher Module

This module exposes functions for watching for changes to files or directories.

### watcher.watchFile() function

Watches for changes to the given file or directory and calls the function provided
when the file changes.

#### Parameters
 
 * File - the file to watch (can be a file or directory)
 * Callback - The callback to invoke when the file has changed. The callback takes the 
   changed file as a parameter.

#### Example

```javascript
var watcher = require('watcher');
watcher.watchFile( 'test.txt', function( file ) { 
  console.log( file + ' has changed');
});
```
***/
var filesWatched = {};
var dirsWatched = {};

exports.watchFile = function( file, callback ) {
  if ( typeof file == 'string' ) { 
    file = new File(file);
  }
  filesWatched[file.canonicalPath] = {
    callback: callback,
    lastModified: file.lastModified()
  };
};

/************************************************************************
### watcher.watchDir() function

Watches for changes to the given directory and calls the function provided
when the directory changes. It works by calling watchFile/watchDir for each
file/subdirectory.

#### Parameters
 
 * Dir - the file to watch (can be a file or directory)
 * Callback - The callback to invoke when the directory has changed. 
              The callback takes the changed file as a parameter. 
              For each change inside the directory the callback will also 
              be called.

#### Example

```javascript
var watcher = require('watcher');
watcher.watchDir( 'players/_ial', function( dir ) { 
  console.log( dir + ' has changed');
});
```
***/

exports.watchDir = function( dir, callback ) {
  if ( typeof dir == 'string' ) { 
    dir = new File(dir);
  }
  dirsWatched[dir.canonicalPath] = {
    callback: callback,
    lastModified: dir.lastModified()
  };
  
  var files = dir.listFiles(),file;
  if ( !files ) {
    return;
  }
  for ( var i = 0; i < files.length; i++ ) {
    file = files[i];
    if (file.isDirectory( )) {
      exports.watchDir(file,callback);
    }else{
      exports.watchFile(file,callback);
    }
  }
};
/************************************************************************
### watcher.unwatchFile() function

Removes a file from the watch list.

#### Example
```javascript
var watcher = require('watcher');
watcher.unwatchFile('test.txt');
```

***/
exports.unwatchFile = function( file ) {
  if ( typeof file == 'string' ) { 
    file = new File(file);
  }
  delete filesWatched[file.canonicalPath];  
};

/************************************************************************
### watcher.unwatchDir() function

Removes a directory from the watch list and all files inside the directory
are also "unwatched"

#### Example
```javascript
var watcher = require('watcher');
watcher.unwatchDir ('players/_ial');
```
Would cause also 
```javascript
watcher.unwatchFile (file);
```
for each file inside directory (and unwatchDir for each directory inside it)

***/
exports.unwatchDir = function( dir) {
  if ( typeof dir == 'string' ) { 
    dir = new File(dir);
  }
  delete dirsWatched[dir.canonicalPath];  
  
  var files = dir.listFiles(),file;
  if ( !files ) {
    return;
  }
  for ( var i = 0; i < files.length; i++ ) {
    file = files[i];
    if ( file.isDirectory() ) {
      exports.unwatchDir( file );
    }else{
      exports.unwatchFile( file );
    }
  }
};

function fileWatcher( ) {
  for (var file in filesWatched) {
    var fileObject = new File(file);
    var lm = fileObject.lastModified();
    if ( String(lm) != String(filesWatched[file].lastModified) ) {
      filesWatched[file].lastModified = lm;
      filesWatched[file].callback(fileObject);
      if (!fileObject.exists()) {
        exports.unwatchFile(file,filesWatched[file].callback);
      }
    }
  }
}


//monitors directories for time change
//when a change is detected watchFiles are invoked for each of the files in directory
//and callback is called
function dirWatcher( ) {
  for (var dir in dirsWatched) {
    var dirObject = new File(dir);
    var lm = dirObject.lastModified();
    var dw = dirsWatched[dir];
    if ( String(lm) != String(dirsWatched[dir].lastModified) ) {
      dirsWatched[dir].lastModified = lm;
      dirsWatched[dir].callback(dirObject);
      
      exports.unwatchDir(dir, dw.callback);
      //causes all files to be rewatched
      if (dirObject.exists()) {
        exports.watchDir(dir, dw.callback);
      } 
    }
  }
}

//guarantees that a callback is only called once for each change 
function monitorDirAndFiles() {
  fileWatcher ();
  dirWatcher ();
  setTimeout( monitorDirAndFiles, 3000 );
}

setTimeout( monitorDirAndFiles, 3000 );
