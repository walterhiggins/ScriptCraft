var _dataDir = null,
  _persistentData = {};

module.exports = function( rootDir, $ ) {

  var _load = function( name ) {
    $.scload( _dataDir.canonicalPath + '/' + name + '-store.json' );
  };
  var _save = function( name, data ) {
    $.scsave( data, _dataDir.canonicalPath + '/' + name + '-store.json' );
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
      if ( dataFromFile ) {
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

