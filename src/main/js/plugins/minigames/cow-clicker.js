/*************************************************************************
## Cow Clicker Mini-Game

### How to Play

At the in-game prompt type `jsp cowclicker` to start or stop
playing. Right-Click on Cows to score points. No points for killing
cows (hint: use the same keyboard keys you'd use for opening doors).

Every time you click a cow your score increases by 1 point. Your score
is displayed in a side-bar along the right edge of of the screen.

![cow clicker](img/cowclicker.png)

### Rules

 * You can join and leave the Cow Clicker game at any time by typing
   `/jsp cowclicker` at the in-game prompt.

 * Once you leave the game, your score is reset to zero.

 * When you disconnect from the server, your score will be reset to zero.

### Gameplay Mechanics

This is meant as a trivially simple use of the [Bukkit Scoreboard
API][bukscore]. There are many things you'll want to consider when constructing
your own mini-game...

 * Is the game itself a long-lived game - that is - should players and
   scores be persisted (stored) between server restarts?  

 * What should happen when a player quits the server - should this also be
   understood as quitting the mini-game?

 * What should happen when a player who was previously playing the
   mini-game, joins the server - should they automatically resume the
   mini-game?

[bukscore]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scoreboard/package-summary.html

***/
var sounds = require('sounds');

if ( __plugin.canary || __plugin.bukkit){
  console.warn('cow-clicker minigame is not yet supported in CanaryMod or Bukkit');
  return;
}
var store = {},
  bkBukkit = org.bukkit.Bukkit,
  bkCow = org.bukkit.entity.Cow,
  bkOfflinePlayer = org.bukkit.OfflinePlayer,
  scoreboardConfig = { 
    cowclicker: {
      SIDEBAR: 'Cows Clicked'
    }
  };
var scoreboard = require('minigames/scoreboard')(scoreboardConfig);

function onPlayerInteract( event ) {
  var player = event.player,
    clickedEntity = event.rightClicked;

  
  if ( !store[ player.name ] ) {
    return;
  }

  if ( clickedEntity instanceof  bkCow) {
    store[ player.name ].score++;
    scoreboard.update( 'cowclicker', player, store[ player.name ].score );
    
    bkBukkit.dispatchCommand( player, 'me clicked a cow!' );
    sounds.uiButtonClick( clickedEntity );
    setTimeout( function( ) {
      sounds.entityCowHurt( clickedEntity ) ;
    }, 200 );
  }
}

function onPlayerQuit( event ) {
  removePlayer( event.player );
}

function onPlayerJoin( event ) {
  var gamePlayer = store[event.player.name];
  if ( gamePlayer ) {
    addPlayer( event.player, gamePlayer.score );
  }
}

function startGame( ) {
  var p,
    player;
  if ( config.verbose ) {
    console.log('Staring game: Cow Clicker');
  }
  
  events.playerQuit( onPlayerQuit );
  events.playerJoin( onPlayerJoin );
  events.playerInteractEntity( onPlayerInteract );

  scoreboard.start();

  store = persist( 'cowclicker', store );
  for ( p in store ) {
    player = server.getPlayer( p );
    if ( player ) {
      /*
       only add online players
       */
      var score = store[p].score;
      addPlayer( player, score );
    }
  }
}

function addPlayer( player, score ) {
  if ( config.verbose ) {
    console.log( 'Adding player %s to Cow Clicker game', player );
  }
  if ( typeof score == 'undefined' ) {
    score = 0;
  }
  store[ player.name ] = { score: score };
  scoreboard.update( 'cowclicker', player, store[ player.name ].score);
  
  echo( player, 'Go forth and click some cows!' );
}

function removePlayer( player, notify ) {

  if ( player instanceof bkOfflinePlayer && player.player ) {
    player = player.player;
  }

  if ( !store[player.name] ) {
    return;
  }
  if ( config.verbose ) {
    console.log( 'Removing player %s from Cow Clicker', player );
  }
  
  var playerScore = store[ player.name ].score;

  scoreboard.restore( player );

  delete store[ player.name ];
  if ( notify && player ) {
    echo( player, 'You clicked ' + playerScore + ' cows! ' + 
          'You must be tired after all that clicking.' );
  }
}

function removeAllPlayers( notify ) {
  if ( typeof notify == 'undefined' ) {
    notify = false;
  }
  for ( var p in store ) {
    var player = server.getOfflinePlayer( p );
    if ( player ) {
      removePlayer( player, notify );
    }
    delete store[p];
  }
}

function stopGame( removePlayers ) {
  if ( typeof removePlayers == 'undefined' ) {
    removePlayers = true;
  }
  if ( config.verbose ) {
    console.log( 'Stopping game: Cow Clicker' );
  }
  scoreboard.stop();
  if ( !removePlayers ) {
    return;
  }
  removeAllPlayers( false );
  persist( 'cowclicker', store.pers, 'w' );

}
/*
 start the game automatically when this module is loaded.
 */
startGame();
/*
 players can join and leave the game by typing `jsp cowclicker`
 */
command( 'cowclicker', function( params, sender ) {
  if ( !store[sender.name] ) {
    addPlayer( sender );
  } else {
    removePlayer( sender );
  }
});
/*
 stop the game when ScriptCraft is unloaded.
 */
addUnloadHandler( function( ) {
  stopGame( false );
} );

