var global = this;
//
// Define these primitive methods used by drone.js (and potentiall others)
//
//  getPlayerPos returns the player's x,y,z and yaw (direction)
//  getMousePos returns the x,y,z of the current block being targeted.
//  putBlock(x,y,z,blockId,metadata) puts a block at a location in current world
//  getBlock(x,y,z) gets the block and metadata (returned as a string in form '35:15') 
//  putSign(texts,x,y,z,blockId,metadata) puts a sign at the given location
//  notifyAdministrators(msg) sends a message to all admins/ops.
//  echo(msg) prints a message on screen to current user.
//
(function(){

    // 
    // only execute once
    //
    if (typeof getPlayerPos != "undefined"){
        return;
    }

    var _getPlayerPos = function(){
        if (typeof __self == "undefined")
            return;
        return __self.location;
    };

    var _getMousePos = function(){
        if (typeof __self == "undefined")
            return;
        // __self might be CONSOLE or a CommandBlock
        if (!__self.getTargetBlock)
            return;
        var targetedBlock = __self.getTargetBlock(null,5);
        if (targetedBlock == null || targetedBlock.isEmpty()){
            return null;
        }
        return targetedBlock.location;
    };

    var _putBlock = function(x,y,z,blockId,metadata){
        
        if (typeof metadata == "undefined"){
            metadata = 0;
        }
        var world = _getWorld();
        if (!world)
            return;
        
        var block = world.getBlockAt(x,y,z);

        if (blockId === 6){
            var treeType = null;
            switch (metadata){
            case 0:
                treeType = org.bukkit.TreeType.BIG_TREE;
                break;
            case 1:
                treeType = org.bukkit.TreeType.REDWOOD;
                break;
            case 2:
                treeType = org.bukkit.TreeType.BIRCH;
                break;
            case 3:
                treeType = org.bukkit.TreeType.JUNGLE;
                break;
            }
            return world.generateTree(block.location,treeType);
        }else{
            block.setTypeId(blockId);
            block.setData(metadata);
        }
    };

    var _putSign = function(texts, x, y, z, blockId, meta){
        putBlock(x,y,z,blockId,meta);
        var block = _getBlockObject(x,y,z);
        state = block.state;
        if (state instanceof org.bukkit.block.Sign){
            for (var i = 0;i < texts.length; i++)
                state.setLine(i%4,texts[i]);
            state.update(true);
        }
    };

    var _getBlock = function(x,y,z){
        var block = _getBlockObject(x,y,z);
        if (block)
            return "" + block.typeId + ":" + block.data;
    };

    var _getBlockObject = function(x,y,z){
        var world = _getWorld();
        if (world)
            return world.getBlockAt(x,y,z);
    };

    var _getWorld = function(){
        if (typeof __self == "undefined")
            return;
        if (__self instanceof org.bukkit.command.BlockCommandSender)
            return __self.block.location.world;
        if (__self instanceof org.bukkit.entity.Player)
            return __self.location.world;
    };
    
    var _notifyAdministrators = function(msg){
        var ops = __plugin.server.operators;
        for (var i = 0; i < ops.size();i++){
            if (ops[i].isOnline())
                ops[i].player.chat(msg);
        }
        __plugin.logger.info(msg);
    };
    var _echo = function(msg){
        __plugin.logger.info(msg);
        if (typeof __self == "undefined"){
            java.lang.System.out.println(msg);
            return;
        }
        __self.sendMessage(msg);
    };

    global.getPlayerPos = _getPlayerPos;
    global.getMousePos = _getMousePos;
    global.putBlock = _putBlock;
    global.getBlock = _getBlock;
    global.putSign = _putSign;
    global.notifyAdministrators = _notifyAdministrators;
    global.echo = _echo;
    
}());
