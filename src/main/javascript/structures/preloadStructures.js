Drone.extend("preloadStructures", function() {
  var dir = new java.io.File(global.__structures.path),
      files = dir.listFiles(),
      store = [];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!file.isDirectory()) {
      store.push((file + "").split("/").pop());
    }
  }

  for (i = 0; i < store.length; i++) {
    this.loadStructure(store[i]);
  }
});
