var Drone = require('./drone');
var utils = require('../utils/utils');

var files = [];

var filter = function(file,name){
    name = "" + name;
    if (name.match(/drone\.js$/))
        return false;
    if (name.match(/drone\-exts\.js$/))
        return false;
    if (name.match(/\.js$/))
        return true;
    if (file.isDirectory())
        return true;
    return false;
};

var files = utils.find(__dirname, filter);

utils.foreach(files, function (file){
   require(file);
});

module.exports = Drone;
