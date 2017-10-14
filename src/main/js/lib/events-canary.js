/*global nashorn, exports, require, Packages, __plugin*/
var cmPriority = Packages.net.canarymod.plugin.Priority,
  cmCanary = Packages.net.canarymod.Canary,
  cmPluginListener = Packages.net.canarymod.plugin.PluginListener;
var cmHookExecutor = cmCanary.hooks();

exports.on = function( 
  /* Java Class */
  eventType, 
  /* function( registeredListener, event) */ 
  handler,   
  /* (optional) String (CRITICAL, HIGH, NORMAL, LOW, PASSIVE), */
  priority   ) {
  var regd,
    eventExecutor;

  if ( typeof priority == 'undefined' ) {
    priority = cmPriority.NORMAL;
  } else {
    priority = cmPriority[priority.toUpperCase().trim()];
  }
  
  var result = { };
  eventExecutor = __plugin.getDispatcher( function(l,e){ 
    function cancel(){
      if (e.setCanceled){
        e.setCanceled();
      }
    }
    /*
     let handlers use this.cancel() to cancel the current event
     or this.unregister() to unregister from future events.
     */
    var bound = {};
    for (var i in result){
      bound[i] = result[i];
    }
    bound.cancel = cancel;
    try { 
      handler.call(bound, e, cancel); 
    } catch ( error ){
      console.log('Error while executing handler:' + handler + 
                  ' for event type:' + eventType + 
                  ' error: ' + error);
    }
  });
  /* 
   wph 20130222 issue #64 bad interaction with Essentials plugin
   if another plugin tries to unregister a Listener (not a Plugin or a RegisteredListener)
   then BOOM! the other plugin will throw an error because Rhino can't coerce an
   equals() method from an Interface.
   The workaround is to make the ScriptCraftPlugin java class a Listener.
   Should only unregister() registered plugins in ScriptCraft js code.
   */
  if (nashorn){
    // nashorn
    eventType = require('nashorn-type')(eventType);
  } 
  regd = new cmPluginListener({});
  cmHookExecutor.registerHook(regd, __plugin, eventType, eventExecutor, priority);
  result.unregister = function(){
    cmHookExecutor.unregisterPluginListener(regd);
  };
  return result;
};
