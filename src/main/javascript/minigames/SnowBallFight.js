load(__folder + "events/events.js");
/*
  OK - this is a rough and ready prototype of a simple multi-player shoot-em-up.
  Get a bunch of players in close proximity and issue the following commands...

  /js var redTeam = ['<player1>','<player2>',...etc]
  /js var blueTeam = ['<player3>','<player4>,...etc]
  /js var greenTeam = ['<player5>','<player6>,...etc]
  /js new SnowBallFight({red: redTeam,blue: blueTeam,green: greenTeam},60).start();

  (where <player1> etc are the names of actual players)
  
  You specify the teams in the game as an object where each property's name is a team name and 
  each property's value is the list of players on that team.
  You specify the duration of the game (in seconds)
  You kick off the game with the start() method.
  I need to work on a better in-game mechanism for players to choose teams and start the game
  but this will do for now.

  When the game starts, each player is put in survival mode and given 192 snowballs. The aim of the 
  game is to hit players on opposing teams. If you hit a player on your own team, you lose a point.
  
  At the end of the game the scores for each team are broadcast. Create a small arena
  with a couple of small buildings for cover to make the game more fun :-)
  
*/
var SnowBallFight = function(teams,duration)
{
    this.teams = teams;
    this.duration = duration;
};
SnowBallFight.prototype.start = function()
{
    // put all players in survival mode and give them each 200 snowballs
    var snowBalls = new org.bukkit.inventory.ItemStack(org.bukkit.Material.SNOW_BALL, 64);
    var teamScores = {};
    var gameOver = false;
    for (var teamName in this.teams){
        teamScores[teamName] = 0;
        var team = this.teams[teamName];
        for (var i = 0;i < team.length;i++)
        {
            var player = server.getPlayer(team[i]);
            player.gameMode = org.bukkit.GameMode.SURVIVAL;
            player.inventory.addItem([snowBalls,snowBalls,snowBalls]);
        }
    }
    var that = this;
    var _getTeam = function(player){
        for (var teamName in that.teams){
            var team = that.teams[teamName];
            for (var i = 0;i < team.length; i++){
                if (team[i] == player.name)
                    return teamName;
            }
        }
        return null;
    };
    var listener = events.on("entity.EntityDamageByEntityEvent",function(l,e){
        var damager = e.damager;
        var damagee = e.entity;
        var damage = e.damage;
        var shooter = damager.shooter;
        if (damager instanceof org.bukkit.entity.Snowball){
            var damagerTeam = _getTeam(shooter);
            if (!damagerTeam) 
                return; // shooter wasn't in game
            var damageeTeam = _getTeam(damagee);
            if (!damageeTeam)
                return; // damagee wasn't in game
            
            if (damagerTeam != damageeTeam){
                teamScores[damagerTeam]++;
            }else{
                teamScores[damagerTeam]--;
            }
        }
        if (gameOver)
            e.handlers.unregister(l);
    });
    var tick = function(){
        while (that.duration--){
            java.lang.Thread.sleep(1000);
        }
        if (that.duration <=0){
            for (var tn in teamScores){
                server.broadcastMessage("Team " + tn + " scored " + teamScores[tn]);
            }
            gameOver = true;
        }
    };
    new java.lang.Thread(tick).start();
};

