var rootDir = __folder;
/*
  This module is responsible for managing commands which can be used by non-operator.
  Since by default the /js command is op-only , there needs to be a way to expose javascript
  functions/plugins to non-ops in a safe controlled way.
  
  This is where the 'command' module comes in. It allows javascript plugin authors to expose
  javascript functions for use by non-operators. For example, ordinarily, non-ops don't have
  permission to use the `/time set 0` command but this functionality can be exposed like this.

  1. Operator / plugin-author creates a javascript function called 'day'
  
  var time_set = function(params){ __plugin.server.worlds.get(0).time = params[0]; };
  command.register('time_set');
  
  2. The non-operator can now change the time to day...
  /jsp time_set 0

  TODO: Figure out how to persist the 'command' module's configuration so it can be saved/restored
  on server shutdown/startup. THis should be done in a generic way so other modules can use it.
  
*/
var command = command || {
	 
	 register: function(/* String */ namedFunction){
		  //
		  // namedFunction must be in the global namespace for this to work
		  // JSON cannot persist functions.
		  //
		  if (typeof namedFunction !== "string")
				throw new Error("Usage: command.register(/* String */ namedFunction)");

		  command.data[namedFunction] = true;
	 },
	 invoke: function(){
		  if (__cmdArgs.length === 0)
				throw new Error("Usage: jsp command-name command-parameters");
		  var cmdName = __cmdArgs[0];
		  if (typeof command.data[cmdName] === "undefined")
				throw new Error("Command '" + cmdName + "' does not exist.");
		  var params = [];
		  for (var i =1; i < __cmdArgs.length;i++){
				params.push("" + __cmdArgs[i]);
		  }
		  global[cmdName](params);
	 },
	 data: {},
};
