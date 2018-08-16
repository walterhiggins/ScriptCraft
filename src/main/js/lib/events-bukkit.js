/*global Java, exports, org, __plugin */
var bkEventPriority = org.bukkit.event.EventPriority,
  bkHandlerList = org.bukkit.event.HandlerList,
  bkPluginManager = org.bukkit.Bukkit.pluginManager;

// Ask Nashorn to generate a class implementing the Listener
// interface, so that we may instantiate it to tag our event
// handlers.
var ScriptCraftListener = Java.extend(org.bukkit.event.Listener, {});

exports.on = function(
  /* Java Class */
  eventType,
  /* function( registeredListener, event) */

  handler,
  /* (optional) String (HIGH, HIGHEST, LOW, LOWEST, NORMAL, MONITOR), */
  priority
) {
  if (typeof priority == 'undefined') {
    priority = bkEventPriority.HIGHEST;
  } else {
    priority = bkEventPriority[priority.toUpperCase().trim()];
  }

  var result = {};
  var eventExecutor = function(l, evt) {
    function cancel() {
      if (evt instanceof org.bukkit.event.Cancellable) {
        evt.setCancelled(true);
      }
    }
    /*
     let handlers use this.cancel() to cancel the current event
     or this.unregister() to unregister from future events.
     */
    var bound = {};
    for (var i in result) {
      bound[i] = result[i];
    }
    bound.cancel = cancel;
    handler.call(bound, evt, cancel);
  };

  // Create an instance of our empty Listener implementation to track the handler
  var listener = new ScriptCraftListener();

  bkPluginManager.registerEvent(
    eventType.class,
    listener,
    priority,
    eventExecutor,
    __plugin
  );

  result.unregister = function() {
    bkHandlerList.unregisterAll(listener);
  };

  return result;
};
