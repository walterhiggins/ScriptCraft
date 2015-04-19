/*************************************************************************
 * Authors:
 *  - Lauro Canonica: Original author (Devoxx4kids Lugano 2015.04)
 *  - Michael Vorburger: Clean-up for initial ScriptCraft Git contribution
 */

var utils = require('utils');

var scriptFolder = 'scriptcraft/plugins/blocklycraft';
var fileObject = new java.io.File(scriptFolder);

function watchMyFiles(folder){
		var names = folder.list();
		for (var i=0; i<names.length; i++) {
			var fname = scriptFolder + "/" + names[i]; // TODO "\\" instead of "/" needed on Win, or OK?
			console.log('watching '+ fname);
			utils.watchFile(fname , function( fileModified) { // refresh after any file modification
				refresh();
			});
		}
}
function onChangeRefresh() {
	console.log( 'Monitoring folder ' + scriptFolder);
	utils.watchFile(scriptFolder, function( folder ) { // check the folder
		console.log( folder + ' has changed!');
		watchMyFiles(fileObject);
	});
}
watchMyFiles(fileObject);
onChangeRefresh(); // start monitoring
