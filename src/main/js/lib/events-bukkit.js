/*global Java, exports, org, __plugin */
var bkEventPriority = org.bukkit.event.EventPriority,
  bkEventExecutor = org.bukkit.plugin.EventExecutor,
  bkRegisteredListener = org.bukkit.plugin.RegisteredListener;

var nashorn = (typeof Java != 'undefined');

function getHandlerListForEventType( eventType ){
  var result = null;
  var clazz = null;
  if (nashorn) {
    
    //Nashorn doesn't like when getHandlerList is in a superclass of your event
    //so to avoid this problem, call getHandlerList using java.lang.reflect
    //methods
    clazz = eventType['class'];
    result = clazz.getMethod('getHandlerList').invoke(null);
    
  } else { 
    result = eventType.getHandlerList();
  }

  return result;
}
exports.on = function( 
  /* Java Class */
  eventType, 
  /* function( registeredListener, event) */ 
  handler,   
  /* (optional) String (HIGH, HIGHEST, LOW, LOWEST, NORMAL, MONITOR), */
  priority   ) {
  var handlerList,
    regd,
    eventExecutor;

  if ( typeof priority == 'undefined' ) {
    priority = bkEventPriority.HIGHEST;
  } else {
    priority = bkEventPriority[priority.toUpperCase().trim()];
  }
  handlerList = getHandlerListForEventType (eventType);

  var result = { };
  eventExecutor = new bkEventExecutor( {
    execute: function( l, evt ) {
      function cancel(){
        if (evt instanceof org.bukkit.event.Cancellable){
          evt.setCancelled(true);
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
      handler.call( bound, evt, cancel );
    } 
  } );
  /* 
   wph 20130222 issue #64 bad interaction with Essentials plugin
   if another plugin tries to unregister a Listener (not a Plugin or a RegisteredListener)
   then BOOM! the other plugin will throw an error because Rhino can't coerce an
   equals() method from an Interface.
   The workaround is to make the ScriptCraftPlugin java class a Listener.
   Should only unregister() registered plugins in ScriptCraft js code.
   */
  regd = new bkRegisteredListener( __plugin, eventExecutor, priority, __plugin, false );
  handlerList.register( regd );
  result.unregister = function(){
    handlerList.unregister( regd );
  };
  return result;
};
