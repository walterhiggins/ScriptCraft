
function canaryAsyncInput( sender, promptMesg, callback) {
  sender.message(promptMesg);
  function repeat(){
    setTimeout( function(){
      listener.unregister(); // avoid CME
      canaryAsyncInput( sender, promptMesg, callback);
    },1);
  }
  var listener = events.chat(function (event) { 
    if (event.player == sender) {
      var receivers = event.getReceiverList();
      if (receivers.size() == 1 && receivers.contains(sender)){
        var value = event.message;
        var that = this;
        event.setCanceled();
        callback.apply( { repeat: repeat, sender: sender, message: promptMesg, value: value },
          [value, sender, repeat]);
        setTimeout(function(){that.unregister();},10);
      }
    }
  },'CRITICAL');
  // unregister after 30 seconds
  setTimeout(function(){ listener.unregister(); }, 30000);
}
module.exports = canaryAsyncInput;
