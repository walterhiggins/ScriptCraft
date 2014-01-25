
var _dataDir = null;
var _persistentData = {};

module.exports = function( rootDir, $ ){

    _dataDir = new java.io.File( rootDir, 'data');

    $.persist = function(name, data, write){
        var i, dataFromFile;
        if (typeof data == 'undefined')
            data = {};
        if (typeof write == 'undefined')
            write = false;
        if (!write){
            dataFromFile = $.scload(_dataDir.canonicalPath + '/' + name + '-store.json');
            if (dataFromFile){
                for (i in dataFromFile){
                    data[i] = dataFromFile[i];
                }
            }
        }else{
            // flush data to file
            $.scsave(data, _dataDir.canonicalPath + '/' + name + '-store.json');
        }
        _persistentData[name] = data;
        return data;
    };
    
    $.addUnloadHandler(function(){
        for (var name in _persistentData){
            var data = _persistentData[name];
        $.scsave(data, _dataDir.canonicalPath + '/' + name + '-store.json');
        }
    });
};

