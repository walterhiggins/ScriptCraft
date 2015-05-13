$(document).ready(function() {
	Code.runJS = function() { }; // Override ("monkey patch" ?) code.js - as we never actually want to run the Blockly code in the Browser
	Code.bindClick('runButton', function() {
		var jscode = Blockly.JavaScript.workspaceToCode();

		var titleRegexp = /command. '([a-zA-Z0-9_]*)',/;
		var fname = titleRegexp.exec(jscode);  //extract the name of the command
		if(fname==null) {
			alert(Blockly.Msg.MISSING_NAME);  
		} else {
			//alert(jscode);
			$.post('/', jscode // NOT { code : jscode }
				, function(responseText) {
					alert(Blockly.Msg.DEPLOY_SUCCESS);
			});

		}
	});
});
