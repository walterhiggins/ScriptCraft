var _dataDir = null,
  _persistentData = {};

module.exports = function( rootDir, $ ) {

  var _load = function( name ) {
    var result = $.scloadJSON( _dataDir.canonicalPath + '/' + name + '-store.json' );
    return result;
  };

  var _save = function( name, objToSave ) {
    $.scsave( objToSave, _dataDir.canonicalPath + '/' + name + '-store.json' );
  };

  _dataDir = new java.io.File( rootDir, 'data' );

  $.persist = function( name, data, write ) {
    var i, 
      dataFromFile;
    if ( typeof data == 'undefined' ) {
      data = {};
    }
    if ( typeof write == 'undefined' ) {
      write = false;
    }
    if ( !write ) {
      dataFromFile = _load( name );
      if ( typeof dataFromFile != 'undefined') {
        for ( i in dataFromFile ) {
          data[i] = dataFromFile[i];
        }
      }
    } else {
      // flush data to file
      _save( name, data );
    }
    _persistentData[name] = data;
    return data;
  };
  /*
   persist on shutdown
   */
  $.addUnloadHandler( function( ) {
    var name, 
      data;
    for ( name in _persistentData ) {
      data = _persistentData[name];
      _save( name, data );
    }
  });
};

