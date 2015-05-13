/*******************************************************************************
 * Authors: - Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04) -
 * Michael Vorburger: Clean-up for initial ScriptCraft Git contribution
 */

var utils = require('utils');

var scriptFolder = 'scriptcraft/plugins/blocklycraft';
var fileObject = new java.io.File(scriptFolder);

//create a piramidal object
exports.piramid = function(drone, width, lenght, height) {
	while (width >= 2 && lenght >= 2 && height >= 1) {
		drone.box0(2, width, 1, lenght);
		drone.fwd();
		drone.right();
		width = width - 2;
		lenght = lenght - 2;
		drone.box(3, width, 1, lenght);
		drone.up();
		height--;
	}
};

// create a rectangle with alternate block types
exports.boxAlternate = function(drone, width, lenght, material1, material2) {
	for ( var count3 = 0; count3 < 2; count3++) {
		for ( var count = 0; count < width / 2; count++) {
			console.log('width ' + width + "count=" + count);
			drone.box(material1);
			drone.fwd();
			drone.box(material2);
			drone.fwd();
		}
		drone.turn();
		for ( var count2 = 0; count2 < lenght / 2; count2++) {
			drone.box(material1);
			drone.fwd();
			drone.box(material2);
			drone.fwd();
		}
		drone.turn();
	}
};

// monitor the files in the scriptfolder. Automatic reload for any changes
function watchMyFiles(folder) {
	var names = folder.list();
	for ( var i = 0; i < names.length; i++) {
		var fname = scriptFolder + "/" + names[i]; // TODO "\\" instead of "/"
													// needed on Win, or OK?
		console.log('watching ' + fname);
		utils.watchFile(fname, function(fileModified) { // refresh after any
														// file modification
			refresh();
		});
	}
}

// monitor the scriptfolder. Automatic reload for any changes
function onChangeRefresh() {
	console.log('Monitoring folder ' + scriptFolder);
	utils.watchFile(scriptFolder, function(folder) { // check the folder
		console.log(folder + ' has changed!');
		watchMyFiles(fileObject);
	});
}

// start watching
watchMyFiles(fileObject);
onChangeRefresh(); // start monitoring

