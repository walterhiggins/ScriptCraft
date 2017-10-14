'use strict';
/*
 wph 20150103 - temporarily commenting out - textcolors was removed.
 var textcolors = require('textcolors');
*/
var sb;
if (__plugin.canary){
  var Canary = Packages.net.canarymod.Canary;
  sb = Canary.scoreboards().getScoreboard();
} else {
  console.warn('Scoreboard not yet supported in CraftBukkit');
  return;
}
function execCommand( command ){
  server.executeVanillaCommand(server, command);
}
/*
function getTeamByName( teamName ){
  var allTeams = sb.getTeams().toArray();
  for (var i = 0;i < allTeams.length; i++){
    if (allTeams[i].displayName == teamName){
      return allTeams[i];
    }
  }
  return null;
}
*/
function createScoreboard( objectiveName, displayName ){
  execCommand('scoreboard objectives add ' + objectiveName + ' dummy ' + displayName);
  execCommand('scoreboard objectives setdisplay sidebar ' + objectiveName);
}
function addTeamToScoreboard( teamName /*, color*/){
  execCommand('scoreboard teams add ' + teamName);
  /*
   wph 20150103 - temporarily commenting out - textcolors was removed.
   team.prefix = textcolors.colorize(color, '');
   */
  //var team = getTeamByName( teamName );
  //execCommand('scoreboard teams option ' + teamName + ' color ' + color);
}
function removeScoreboard( name ){
  //execCommand('scoreboard objectives remove ' + name );
  sb['removeScoreObjective(String)'](name);
}
function addPlayerToTeam( objectiveName, teamName, playerName ){
  execCommand('scoreboard teams join ' + teamName + ' ' + playerName);
  execCommand('scoreboard players set ' + playerName + ' ' + objectiveName + ' -1');
  updatePlayerScore( objectiveName, playerName, 0);
}

function updatePlayerScore( objectiveName, playerName, score ){
  /*
   wph 20150801 - this fails with CanaryMod 1.8.2 so use command instead - messy for ops but non-ops won't see messages
   
   var sc = sb['getScore(String, ScoreObjective)']( playerName, sb.getScoreObjective( objectiveName) );
   sc.score = score;
   */
  execCommand('scoreboard players set ' + playerName + ' ' + objectiveName + ' ' + score);
}

function removeTeamFromScoreboard( teamName ){
  execCommand('scoreboard teams remove ' + teamName);
  //sb['removeTeam(String)'](teamName);
}
exports.create = createScoreboard;
exports.addTeam = addTeamToScoreboard;
exports.removeTeam = removeTeamFromScoreboard;
exports.addPlayerToTeam = addPlayerToTeam;
exports.updateScore = updatePlayerScore;
exports.remove = removeScoreboard;
