/*******************************************************************************
 * Authors: - Lauro Canonica, (Devoxx4kids Lugano 2015.04)
 */

var objects = getObjNames(Blockly.Msg.OBJNAMES, [ 141, 142, 175, 81, 92, 54, 58, 61, 64, 65, 66, 68, 37, 46, 50, 51, 27 ]);
var blocks = getObjNames(Blockly.Msg.OBJNAMES, [ 0, 1, 2, 3, 4, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 30, 49, 55, 56, 73, 79, 80, 89, 129 ]);

// extract the needed objects from the main list
function getObjNames(list, ids) {
	var shortList = []
	for (i = 0; i < ids.length; i++) {
		shortList[i] = [ list[ids[i]], "'" + ids[i] + "'" ]
	}
	return shortList;
}


// code generated using Blocklyfactory
Blockly.Blocks['box'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(160);
		this.appendDummyInput().appendField(Blockly.Msg.M_MATERIAL);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown(blocks), "Material");

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['objects'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(160);
		this.appendDummyInput().appendField(Blockly.Msg.M_OBJECT);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown(objects), "Material");

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};


Blockly.Blocks['drone'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(120);
		this.appendValueInput("param").setCheck("String").appendField(Blockly.Msg.M_DRONE);
		this.appendStatementInput("statements").setCheck("null");
		this.setInputsInline(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['drone_move'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(120);
		this.appendDummyInput().appendField(Blockly.Msg.M_MOUVEMENT);
		this.appendDummyInput().appendField(
				new Blockly.FieldDropdown([ [ Blockly.Msg.M_MOUVEMENT_UP, "up()" ], [ Blockly.Msg.M_MOUVEMENT_DOWN, "down()" ],
						[ Blockly.Msg.M_MOUVEMENT_FWD, "fwd()" ], [ Blockly.Msg.M_MOUVEMENT_BACK, "back()" ], [ Blockly.Msg.M_MOUVEMENT_RIGHT, "right()" ],
						[ Blockly.Msg.M_MOUVEMENT_LEFT, "left()" ], [ Blockly.Msg.M_MOUVEMENT_TURN_RIGHT, "turn()" ],
						[ Blockly.Msg.M_MOUVEMENT_TURN_LEFT, "turn(2)" ], [ Blockly.Msg.M_MOUVEMENT_BACKTOSTART, "move('start')" ],
						[ Blockly.Msg.M_MOUVEMENT_SAVESTART, "chkpt('start')" ] ]), "direction");

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};
Blockly.Blocks['drone_tree'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(120);
		this.appendDummyInput().appendField(Blockly.Msg.M_SPECIALS);
		this.appendDummyInput().appendField(
				new Blockly.FieldDropdown([ [ Blockly.Msg.OAK, "oak()" ], [ Blockly.Msg.BED, "bed()" ], [ Blockly.Msg.DOOR, "door( blocks.door_wood )" ] ]),
				"direction");

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['spawner'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(20);
		this.appendDummyInput().appendField(Blockly.Msg.M_ANIMALS);
		this.appendDummyInput().appendField(
				new Blockly.FieldDropdown([ [ Blockly.Msg.ANIMALS_BAT, "Bat" ], [ Blockly.Msg.ANIMALS_CHICKEN, "Chicken" ], [ Blockly.Msg.ANIMALS_COW, "COW" ],
						[ Blockly.Msg.ANIMALS_PIG, "PIG" ], [ Blockly.Msg.ANIMALS_RABBIT, "RABBIT" ], [ Blockly.Msg.ANIMALS_WOLF, "WOLF" ],
						[ Blockly.Msg.ANIMALS_SHEEP, "Sheep" ], [ Blockly.Msg.ANIMALS_HORSE, "Horse" ], [ Blockly.Msg.ANIMALS_OCELOT, "OCELOT" ] ]), "NAME");

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['circle'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(260);
		this.appendDummyInput().appendField(Blockly.Msg.CIRCLE);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown([ [ Blockly.Msg.EMPTY, "0" ], [ Blockly.Msg.FULL, " " ] ]), "fill");
		this.appendValueInput("radius").setCheck("Number").appendField(Blockly.Msg.RADIUS);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown(blocks), "material");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['rectangle'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(260);
		this.appendDummyInput().appendField(Blockly.Msg.RECTANGLE);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown([ [ Blockly.Msg.EMPTY, "0" ], [ Blockly.Msg.FULL, " " ] ]), "fill");
		this.appendValueInput("width").setCheck("Number").appendField(Blockly.Msg.WIDTH);
		this.appendValueInput("lenght").setCheck("Number").appendField(Blockly.Msg.LENGTH);
		this.appendDummyInput().appendField(Blockly.Msg.M_MATERIAL);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown(blocks), "material");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['mountain'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(260);
		this.appendDummyInput().appendField("mountain");
		this.appendValueInput("width").setCheck("Number").appendField("width");
		this.appendValueInput("lenght").setCheck("Number").appendField("lenght");
		this.appendValueInput("height").setCheck("Number").appendField("height");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks['alternator'] = {
	init : function() {
		this.setHelpUrl('');
		this.setColour(260);
		this.appendDummyInput().appendField(Blockly.Msg.RECTANGLE);
		this.appendValueInput("width").setCheck("Number").appendField(Blockly.Msg.WIDTH);
		this.appendValueInput("lenght").setCheck("Number").appendField(Blockly.Msg.LENGTH);
		this.appendDummyInput().appendField(Blockly.Msg.M_MATERIAL);
		this.appendDummyInput().appendField(new Blockly.FieldDropdown(blocks), "material1");
		this.appendDummyInput().appendField(new Blockly.FieldDropdown(blocks), "material2");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};
