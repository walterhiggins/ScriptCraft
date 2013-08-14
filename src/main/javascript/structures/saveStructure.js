Drone.extend("saveStructure", function(filename, w, h, l) {
  var extension = /\.[\w\d]+$/.exec(filename),
      structure;
  extension = extension && extension.length ? extension[0] : global.__structures.extension;
  filename = filename.replace(extension, "");
  this.copy(filename, w, h, l);
  structure = Drone.clipBoard[filename];
  global.save(structure, global.__structures.path + filename + extension);
});
