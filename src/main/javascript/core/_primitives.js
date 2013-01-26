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
        if (typeof self == "undefined")
            return;
        return self.location;
    };

    var _getMousePos = function(){
        if (typeof self == "undefined")
            return;
        // self might be CONSOLE or a CommandBlock
        if (!self.getTargetBlock)
            return;
        var targetedBlock = self.getTargetBlock(null,5);
        if (targetedBlock == null || targetedBlock.isEmpty()){
            return null;
        }
        return targetedBlock.location;
    };

    var _putBlock = function(x,y,z,blockId,metadata){

        if (typeof metadata == "undefined")
            metadata = 0;
        var pl = org.bukkit.entity.Player;
        var cs = org.bukkit.command.BlockCommandSender;
        var world = (self instanceof pl)?self.location.world:(self instanceof cs)?self.block.location.world:null;
        var block = world.getBlockAt(x,y,z);
        if (block.typeId != blockId || block.data != metadata)
            block.setTypeIdAndData(blockId,metadata,false);

    };

    var _putSign = function(texts, x, y, z, blockId, meta){
        if (blockId != 63 && blockId != 68)
            throw new Error("Invalid Parameter: blockId must be 63 or 68");
        putBlock(x,y,z,blockId,meta);
        var block = _getBlockObject(x,y,z);
        var state = block.state;
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
        if (world){
            if (typeof z == "undefined"){
                var loc = _getMousePos()
                if (loc)
                    return world.getBlockAt(loc);
            }else{
                return world.getBlockAt(x,y,z);
            }
        }
    };

    var _getWorld = function(){
        if (self instanceof org.bukkit.entity.Player)
            return self.location.world;
        if (typeof self == "undefined")
            return;
        if (self instanceof org.bukkit.command.BlockCommandSender)
            return self.block.location.world;
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
        if (typeof self == "undefined"){
            java.lang.System.out.println(msg);
            return;
        }
        self.sendMessage(msg);
    };

    global.getPlayerPos = _getPlayerPos;
    global.getMousePos = _getMousePos;
    global.putBlock = _putBlock;
    global.getBlock = _getBlock;
    global.putSign = _putSign;
    global.notifyAdministrators = _notifyAdministrators;
    global.echo = _echo;
    
}());
