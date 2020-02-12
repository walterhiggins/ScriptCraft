
/*

https://dullahansoftware.wordpress.com/2013/02/11/scriptcrafting-a-quest-in-minecraft/

*/

var entities = require('entities');
var utils = require('utils');
var Drone = require('drone');

var quest = quest || plugin("quest",{
  initialize_quest:function(player_name){
  quest.store.players[player_name] = {
			current:-1,
			accepted:false,
			skeleton_counter:0,
			steps:[{
				step:1,
				text:"Hello, " + player_name + ". I have an unpleasant task if you desire some work."
			},
			{
				step:2,
				text:"You see a gang of skeletons have grown bold and are attacking travelers in the area. If you thinned their numbers, the area would again be safe."
			},
			{
				step:3,
				text:"Kill 10 skeletons and return to me for your reward. \nType /jsp accept to accept: SKELETON MENACE."
			},
			{
				step:4,
				text:"Thank you " + player_name + ". The roads are now much safer. Here is your reward."
			}]};
	},
	skeleton_kill_counter:function(event,data){
		var target = event.getEntity();
		var killer = target.getKiller();
		// check if it is the player who did the killing and if a skeleton was the target
		//if(killer != null && killer.getUniqueId() == getPlayerObject().getUniqueId() && target == org.bukkit.entity.EntityType.SKELETON && quest.store.players[killer.name] != null){
		if(killer != null && target.getType() == org.bukkit.entity.EntityType.SKELETON &&  quest.store.players[killer.name] != null){
			killer.sendMessage("Name 2 : " + killer.name);
			quest.store.players[killer.name].skeleton_counter = (quest.store.players[killer.name].skeleton_counter + 1);
			if(quest.store.players[killer.name].skeleton_counter < 10){
				killer.sendMessage("Name : 3 " + killer.name);
				killer.sendMessage("" + quest.store.players[killer.name].skeleton_counter + "/10 skeletons killed.");
			}
			else{
				killer.sendMessage("Return to the priest to recieve your reward.");
			}
		}
	},
	accept_quest:function(player){
		if(quest.store.players[player.name] != null){
			quest.store.players[player.name].accepted = true;
			// add skeleton killing watch
			events.entityDeath(this.skeleton_kill_counter);
			player.sendMessage("\nYou accepted the quest: SKELETON MENACE.\n");
		}
	},
	proc_quest:function(event,data){
		// make sure we are interacting with the quest giver
		var target = event.rightClicked;
		var player = event.player;
		if(quest.store.npcs[target.getUniqueId()] != null){
			// get the player's current quest progress
			var quest_progress = quest.store.players[player.name];
					
			if(quest_progress == null){
				quest.initialize_quest(player.name);
			}
			if(quest.store.players[player.name].current > 1){
				if(quest.store.players[player.name].skeleton_counter >= 10){
					//var world = player.getWorld();
					var world = player.world;
					quest.store.players[player.name].current = (quest.store.players[player.name].current + 1) % 4;
					//world.spawnEntity(player.getLocation().add(1,0,1), entities.experience_orb()).setExperience(20);
					world.spawnEntity(player.getLocation().add(1,0,1), entities.experience_orb()).setExperience(20);
					world.spawnEntity(player.getLocation().add(2,0,1), entities.experience_orb()).setExperience(10);
					world.spawnEntity(player.getLocation().add(4,0,1), entities.experience_orb()).setExperience(5);
					quest.store.players[player.name].skeleton_counter = 0;
					quest.store.players[player.name].accepted = false;
					quest.store.players[player.name].current = 3;
				}
			}
			else{
				quest.store.players[player.name].current = (quest.store.players[player.name].current + 1) % 4;
			}
			player.sendMessage(quest.store.players[player.name].steps[quest.store.players[player.name].current].text);
		}
	},
	spawn:function(player){
		var world  = player.world;
		
		// create a villager
		var quest_npc = world.spawnEntity(player.getLocation().add(1,0,0), entities.villager());
		quest_npc.setProfession(org.bukkit.entity.Villager.Profession.PRIEST);
		quest.store.npcs[quest_npc.getUniqueId()] = quest_npc;
		quest.initialize_quest(player.name);
		// listen for interaction events	
		events.playerInteractEntity(this.proc_quest);
	}
},true);

exports.quest = quest;

/* stores player's progress */
quest.store.players = quest.store.players || {};
/* stores spawned npcs */
quest.store.npcs = quest.store.npcs || {};

command("spawn_npc",function(params,sender){ quest.spawn(sender); });
command("accept",function(params,sender){ quest.accept_quest(sender); });

