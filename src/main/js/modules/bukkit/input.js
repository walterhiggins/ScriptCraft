var bkPrompt = org.bukkit.conversations.Prompt,
  bkConversationFactory = org.bukkit.conversations.ConversationFactory;

function bukkitAsyncInput( sender, promptMesg, callback) {
  var repeat = function(){
    bukkitAsyncInput( sender, promptMesg, callback);
  };
  var prompt = new bkPrompt( { 
    getPromptText: function(/* ctx */) {
      return promptMesg;
    },
    acceptInput: function( ctx, value ) {
      callback.apply( { repeat: repeat, sender: sender, message: promptMesg, value: value },
        [value, sender, repeat]);
      return null;
    },
    blocksForInput: function(/* ctx */) {
      return true;
    }
  });

  new bkConversationFactory( __plugin )
    .withModality( false ) 
    .withFirstPrompt( prompt )
    .buildConversation( sender )
    .begin( );
}
module.exports = bukkitAsyncInput;
