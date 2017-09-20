/*************************************************************************
## NumberGuess mini-game: 

### Description
This is a very simple number guessing game. Minecraft will ask you to
guess a number between 1 and 10 and you will tell you if you're too
hight or too low when you guess wrong. The purpose of this mini-game
code is to demonstrate use of Bukkit's Conversation API.

### Example
    
    /js Game_NumberGuess.start(self)

Once the game begins, guess a number by typing the `/` character
followed by a number between 1 and 10.

***/
var bkPrompt = org.bukkit.conversations.Prompt,
  bkConversationFactory = org.bukkit.conversations.ConversationFactory,
  bkConversationPrefix = org.bukkit.conversations.ConversationPrefix,
  bkBukkit = org.bukkit.Bukkit;

var sb = function( cmd ) { 
  bkBukkit.dispatchCommand( server.consoleSender, 'scoreboard ' + cmd ) ;
};

exports.Game_NumberGuess = {
  start: function( sender ) {

    var guesses = 0;

    sb( 'objectives add NumberGuess dummy Guesses' );
    sb( 'players set ' + sender.name + ' NumberGuess ' + guesses );
    sb( 'objectives setdisplay sidebar NumberGuess' );

    var number = Math.ceil( Math.random() * 10 );
    
    var prompt = new bkPrompt( ) {

      getPromptText: function( ctx ) {
        var hint = '';
        var h = ctx.getSessionData( 'hint' );
        if ( h ) {
          hint = h;
        }
        return hint + 'Think of a number between 1 and 10';
      },

      acceptInput: function( ctx, s ) {
        s = s.replace( /^[^0-9]+/, '' ); // strip leading non-numeric characters (e.g. '/' )
        s = parseInt( s );
        if ( s == number ) {
          setTimeout(function( ) {
            ctx.forWhom.sendRawMessage( 'You guessed Correct!' );
            sb( 'objectives remove NumberGuess' );
          }, 100 );
          return null;
        } else {
          if ( s < number ) {
            ctx.setSessionData( 'hint', 'too low\n' );
	  }
          if ( s > number ) {
            ctx.setSessionData( 'hint', 'too high\n' );
	  }
          guesses++;
          sb( 'players set ' + sender.name + ' NumberGuess ' + guesses );
          
          return prompt;
        }
      },

      blocksForInput: function( ctx ) { 
	return true; 
      }
    };
    var convPrefix = new bkConversationPrefix( ) { 
      getPrefix: function( ctx ) { 
	return '[1-10] ';
      } 
    };
    new bkConversationFactory( __plugin )
      .withModality( true )
      .withFirstPrompt( prompt )
      .withPrefix( convPrefix )
      .buildConversation( sender )
      .begin( );
  }
};
