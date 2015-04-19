$(document).ready(function() {
	Code.runJS = function() { }; // Override ("monkey patch" ?) code.js - as we never actually want to run the Blockly code in the Browser
	Code.bindClick('runButton', function() {
		var jscode = Blockly.JavaScript.workspaceToCode();

		var loopRegexp = /count < ([0-9]*);/;
		var match = loopRegexp.exec(jscode);  //extract the generated max value of the loop
		if(match!=null) {
			var nrLoops=Number(match[1]);
			if(nrLoops!=null) {
				var maxLoops=30;
				if (nrLoops >maxLoops ) {
					alert("Puoi fare al massimo "+maxLoops+" ripetizioni. Riduci il valore ("+ nrLoops+")");
					return
				}
			}
		}
		var titleRegexp = /command. '([a-zA-Z0-9_]*)',/;
		var fname = titleRegexp.exec(jscode);  //extract the name of the command
		if(fname==null) {
			alert("Il tuo comando non ha un nome valido");
		} else {
			//alert(jscode);
			$.post('/', jscode // NOT { code : jscode }
				, function(responseText) {
					alert("OK, ora puoi provare il tuo comando in minecraft.");
			});

		}
	});
});
