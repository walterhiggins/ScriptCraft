var objects = [
["carota","141"],
["patata","142"],
["girasole","175"],
["cactus","81"],
["torta","92"],
["cassa","54"],
["banco da lavoro","58"],
["fornace","61"],
["porta di legno","64"],
["scala a pioli","65"],
["rotaie","66"],
["cartello","68"],
["fiore giallo","37"],
["tnt","46"],
["torcia","50"],
["fuoco","51"],
["rotaie elettriche","27"],

               ];


var blocks = [
["aria","0"],
["pietra","1"],
["erba","2"],
["terra","3"],
["pietrisco","4"],
//["oak","5"],
//["bedrock","7"],
["acqua","8"],
["acqua ferma","9"],
["lava","10"],
["lava ferma","11"],
["sabbia","12"],
["ghiaia","13"],
["oro grezzo","14"],
["ferro grezzo","15"],
["carbone grezzo","16"],
["legno","17"],
["foglie","18"],
//["sponge","19"],
["vetro","20"],
/*
["lapis_lazuli_ore","21"],
["lapis_lazuli_block","22"],
["dispenser","23"],
["sandstone","24"],
["note","25"],
["bed","26"],
["detector_rail","28"],
["sticky_piston","29"],
*/["ragnatela","30"],/*
["grass_tall","31"],
["dead_bush","32"],
["piston","33"],
["piston_extn","34"],
["dandelion","37"],

["rosa","38"],
["fiore rosso","38"],
["mushroom_brown","39"],
["mushroom_red","40"],
["gold","41"],
["iron","42"],
*/

//["bookshelf","47"],
//["moss_stone","48"],
["ossidiana","49"],

/*
["monster_spawner","52"],
*/

/*
["redstone_wire","55"],
*/["diamante grezzo","56"],

//["diamante","57"],

//["wheat_seeds","59"],
//["farmland","60"],

//["furnace_burning","62"],
//["sign_post","63"],

/*
["lever","69"],
["pressure_plate_stone","70"],
["door_iron","71"],
["pressure_plate_wood","72"],*/
["pietrarossa grezza","73"],/*
["redstone_ore_glowing","74"],
["torch_redstone","75"],
["torch_redstone_active","76"],
["stone_button","77"],*/
["ghiaccio","79"],
["neve","80"],

/*
["clay","82"],
["sugar_cane","83"],
["jukebox","84"],
["fence","85"],
["pumpkin","86"],
["netherrack","87"],
["soulsand","88"],*/
["pietraluce","89"],/*
["netherportal","90"],
["jackolantern","91"],*/

/*
["redstone_repeater","93"],
["redeston_repeater_active","94"],
["trapdoor","96"],
["monster_egg","97"],
["mushroom_brown_huge","99"],
["mushroom_red_huge","100"],
["iron_bars","101"],
["glass_pane","102"],
["melon","103"],
["pumpkin_stem","104"],
["melon_stem","105"],
["vines","106"],
["fence_gate","107"],
["mycelium","110"],
["lily_pad","111"],
["nether","112"],
["nether_fence","113"],
["netherwart","115"],
["table_enchantment","116"],
["brewing_stand","117"],
["cauldron","118"],
["endportal","119"],
["endportal_frame","120"],
["endstone","121"],
["dragon_egg","122"],
["redstone_lamp","123"],
["redstone_lamp_active","124"],
["cocoa","127"],*/
["smeraldo grezzo","129"],/*
["enderchest","130"],
["tripwire_hook","131"],
["tripwire","132"],
["emerald","133"],
["command","137"],
["beacon","138"],
["cobblestone_wall","139"],
["flowerpot","140"],
["button_wood","143"],
["mobhead","144"],
["anvil","145"],
["chest_trapped","146"],
["pressure_plate_weighted_light","147"],
["pressure_plate_weighted_heavy","148"],
["redstone_comparator","149"],
["redstone_comparator_active","150"],
["daylight_sensor","151"],
["redstone","152"],
["netherquartzore","153"],
["hopper","154"],
["quartz","155"],
["rail_activator","157"],
["dropper","158"],
["hay","170"],

["hardened_clay","172"],
["coal_block","173"],
["packed_ice","174"],*/

];



Blockly.Blocks['box'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(160);
		    this.appendDummyInput()
		        .appendField("Materiale");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown(blocks), "Material");


		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['objects'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(160);
		    this.appendDummyInput()
		        .appendField("Oggetto");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown(objects), "Material");


		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['command'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(120);
		    this.appendValueInput("param")
		        .setCheck("String")
		        .appendField("Command");
		    this.appendStatementInput("statements")
		        .setCheck("null");
		    this.setInputsInline(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['drone'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(120);
		    this.appendValueInput("param")
		        .setCheck("String")
		        .appendField("Drone");
		    this.appendStatementInput("statements")
		        .setCheck("null");
		    this.setInputsInline(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['drone_move'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(120);
		    this.appendDummyInput()
	        .appendField("Movimento");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown([
		                                                ["su", "up()"],
		                                                ["giu", "down()"],
		                                                ["in avanti", "fwd()"],
		                                                ["in dietro", "back()"],
		                                                ["destra", "right()"],
		                                                ["sinistra", "left()"],
		                                                ["gira a destra", "turn()"],
		                                                ["gira a sinistra", "turn(2)"],
		                                                ["ritorna alla partenza", "move('start')"],
		                                                ["salva questa partenza", "chkpt('start')"]
		                                               ]), "direction");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};
Blockly.Blocks['drone_tree'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(120);
		    this.appendDummyInput()
	        .appendField("Extra");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown([
		                                                ["quercia", "oak()"],
		                                                ["betulla", "birch()"],
		                                                ["mogano", "jungle()"],
		                                                ["abete", "spruce()"],
		                                                ["letto", "bed()"],
		                                                ["porta", "door( blocks.door_wood )"]
		                                               ]), "direction");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['spawner'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(20);
		    this.appendDummyInput()
		        .appendField("Animali");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown([
		                                                ["pipistrello", "Bat"],
		                                                ["pollo", "Chicken"],
		                                                ["mucca", "COW"],
		                                                ["maiale", "PIG"],
		                                                ["coniglio", "RABBIT"],
		                                                ["lupo", "WOLF"],
		                                                ["pecora", "Sheep"],
		                                                ["cavallo", "Horse"],
		                                                ["ocelot", "OCELOT"]]), "NAME");


		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['circle'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(260);
		    this.appendDummyInput()
		        .appendField("Cerchio");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown([["vuoto", "0"], ["pieno", " "]]), "fill");
		    this.appendValueInput("radius")
		        .setCheck("Number")
		        .appendField("raggio");
		    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(blocks), "material");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['rectangle'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(260);
		    this.appendDummyInput()
		        .appendField("Rettangolo");
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldDropdown([["vuoto", "0"], ["pieno", " "]]), "fill");
		    this.appendValueInput("width")
		        .setCheck("Number")
		        .appendField("larghezza");
		    this.appendValueInput("lenght")
		        .setCheck("Number")
		        .appendField("lunghezza");
		    this.appendDummyInput()
	        .appendField("materiale");
		    this.appendDummyInput()
	        .appendField(new Blockly.FieldDropdown(blocks), "material");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['mountain'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(260);
		    this.appendDummyInput()
		        .appendField("mountain");
		    this.appendValueInput("width")
		        .setCheck("Number")
		        .appendField("width");
		    this.appendValueInput("lenght")
	        .setCheck("Number")
	        .appendField("lenght");
		    this.appendValueInput("height")
	        .setCheck("Number")
	        .appendField("height");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};

Blockly.Blocks['alternator'] = {
		  init: function() {
		    this.setHelpUrl('http://www.example.com/');
		    this.setColour(260);
		    this.appendDummyInput()
		        .appendField("Rettangolo");
		    this.appendValueInput("width")
		        .setCheck("Number")
		        .appendField("larghezza");
		    this.appendValueInput("lenght")
	        .setCheck("Number")
	        .appendField("lunghezza");
		    this.appendDummyInput()
	        .appendField("materiali");
		    this.appendDummyInput()
	        .appendField(new Blockly.FieldDropdown(blocks), "material1");
		    this.appendDummyInput()
	        .appendField(new Blockly.FieldDropdown(blocks), "material2");
		    this.setInputsInline(true);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setTooltip('');
		  }
		};