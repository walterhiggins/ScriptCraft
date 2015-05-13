/*******************************************************************************
 * Authors: - Lauro Canonica, (Devoxx4kids Lugano 2015.04)
 */

Blockly.JavaScript['box'] = function(block) {
	var dropdown_material = block.getFieldValue('Material');
	var code = "theDrone." + 'box(' + dropdown_material + ');\n';
	return code;
};
Blockly.JavaScript['objects'] = function(block) {
	var dropdown_material = block.getFieldValue('Material');
	var code = "theDrone." + 'box(' + dropdown_material + ');\n';
	return code;
};


Blockly.JavaScript['drone'] = function(block) {
	var fname = Blockly.JavaScript.valueToCode(block, 'param', Blockly.JavaScript.ORDER_ATOMIC);
	var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
	var code = "var scriptcraftExtensions = require('./scriptcraftExtensions');\ncommand( " + fname
			+ ", function ( parameters, player ) {\nvar theDrone = new Drone(player);\ntheDrone.up();\ntheDrone.chkpt('start');\n";
	code = code + "var timeoutStop = new Date().getTime()+500;\n"; // set
	// maximum
	// run time
	// for a
	// script
	code = code + statements_statements;
	code = code + "});";
	return code;
};

Blockly.JavaScript['drone_move'] = function(block) {
	var dropdown_direction = block.getFieldValue('direction');
	var code = "theDrone." + dropdown_direction + ";\n";
	return code;
};

Blockly.JavaScript['drone_tree'] = function(block) {
	var dropdown_direction = block.getFieldValue('direction');
	var code = "theDrone." + dropdown_direction + ";\n";
	return code;
};

Blockly.JavaScript['circle'] = function(block) {
	var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_material = block.getFieldValue('material');
	var dropdown_fill = block.getFieldValue('fill');
	// TODO: Assemble JavaScript into code variable.
	var code = "theDrone.cylinder" + dropdown_fill + "(" + dropdown_material + "," + value_radius + ",1);\n";
	return code;
};

Blockly.JavaScript['rectangle'] = function(block) {
	var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
	var value_lenght = Blockly.JavaScript.valueToCode(block, 'lenght', Blockly.JavaScript.ORDER_ATOMIC);
	var dropdown_material = block.getFieldValue('material');
	var dropdown_fill = block.getFieldValue('fill');
	var code = "theDrone.box" + dropdown_fill + "(" + dropdown_material + "," + value_width + ",1," + value_lenght + ");\n";
	return code;
};

Blockly.JavaScript['mountain'] = function(block) {
	var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
	var value_lenght = Blockly.JavaScript.valueToCode(block, 'lenght', Blockly.JavaScript.ORDER_ATOMIC);
	var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
	var code = "scriptcraftExtensions.piramid(theDrone," + value_width + "," + value_lenght + "," + value_height + ");\n";
	return code;
};

Blockly.JavaScript['spawner'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var code = "Packages.net.canarymod.Canary.factory().entityFactory.newEntity(Packages.net.canarymod.api.entity.EntityType[('" + dropdown_name
			+ "').toUpperCase()], theDrone.getLocation()).spawn();\n";
	return code;
};

Blockly.JavaScript['alternator'] = function(block) {
	var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
	var value_lenght = Blockly.JavaScript.valueToCode(block, 'lenght', Blockly.JavaScript.ORDER_ATOMIC);
	var material1 = block.getFieldValue('material1');
	var material2 = block.getFieldValue('material2');

	var code = "scriptcraftExtensions.boxAlternate(theDrone," + value_width + "," + value_lenght + "," + material1 + "," + material2 + ");\n";
	return code;
};

