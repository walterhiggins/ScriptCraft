/*
  The scoreboard is a simple wrapper around the Bukkit Scoreboard API.
  It's only concerned with display of scores, not maintaining them - that's the game's job.
*/
module.exports = function(options){
    var temp = {};
    var ccScoreboard;
    var DisplaySlot = org.bukkit.scoreboard.DisplaySlot;

    return {
        start: function(){
            var objective, slot;
            ccScoreboard = server.scoreboardManager.getNewScoreboard();
            for (objective in options){
                var ccObj = ccScoreboard.registerNewObjective(objective,'dummy');
                for (slot in options[objective]){ 
                    ccObj.displaySlot = DisplaySlot[slot];
                    ccObj.displayName = options[objective][slot];
                }
            }
        },
        stop: function(){
            var objective, slot;
            for (objective in options){
                ccScoreboard.getObjective(objective).unregister();
                for (slot in options[objective]){
                    ccScoreboard.clearSlot(DisplaySlot[slot]);
                }
            }
        },
        update: function(objective,player,score){
            if (player.scoreboard && player.scoreboard != ccScoreboard)
            {
                temp[player.name] = player.scoreboard;
                player.scoreboard = ccScoreboard;
            }
            ccScoreboard.getObjective(objective).getScore(player).score = score;
        },
        restore: function(player){
            // offlineplayers don't have a scoreboard
            if (player.scoreboard)
                player.scoreboard = temp[player.name];
        }
    };
};
