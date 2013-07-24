Drone.extend("loadStructure", function(filename) {
  var extension = /\.[\w\d]+$/.exec(filename);
  extension = extension && extension.length ? extension[0] : global.__structures.extension;
  filename = filename.replace(extension, "");
  if (!(filename in Drone.clipBoard)) {
    Drone.clipBoard[filename] = global.load(global.__structures.path + filename + extension);
  }
});
