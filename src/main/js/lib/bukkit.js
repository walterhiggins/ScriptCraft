var bukkit = {
  stat: org.bukkit.Statistic,
  stats: org.bukkit.Statistic,
  material: org.bukkit.Material,
  art: org.bukkit.Art,
  mode: org.bukkit.GameMode,
  sound: org.bukkit.Sound,
  players: function(){
    var result = [];
    for (var i = 0; i < server.onlinePlayers.length; i++){
      result.push(server.onlinePlayers[i]);
    }
    return result;
  },
  playerNames: function(){
    var result = [];
    for (var i = 0; i < server.onlinePlayers.length; i++){
      result.push(''+ server.onlinePlayers[i].name);
    }
    return result;
  },
  worlds: function(){
    var result = [];
    var lWorlds = server.worlds;
    for (var i = 0; i < lWorlds.size(); i++){
      result.push(lWorlds.get(i));
    }
    return result;
  }
};
module.exports = function( container ){
  container.bukkit = bukkit;
};
