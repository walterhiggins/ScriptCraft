package net.walterhiggins.scriptcraft;
import java.util.Set;

import org.bukkit.command.*;
import org.bukkit.entity.*;
import org.bukkit.block.*;
import org.bukkit.Location;
import org.bukkit.OfflinePlayer;
import org.bukkit.World;
import org.bukkit.plugin.java.JavaPlugin;

public class ScriptCraftBukkit implements IScriptCraft
{
    /* (non-Javadoc)
     * @see net.walterhiggins.scriptcraft.IScriptCraft#putSign(java.lang.String[], int, int, int, int, int)
     */
    @Override
        public void putSign(String[] texts, int x, int y, int z, int blockId, int meta) {
        // TODO Auto-generated method stub
        putBlock(x,y,z,blockId,meta);
        Block block = this.getBlockObjectAt(x, y, z);
        BlockState blockState = block.getState();
        if (blockState instanceof Sign){
            Sign sign = (Sign)blockState;
            for (int i = 0; i < texts.length;i++){
                sign.setLine(i%4, texts[i]);
            }
            sign.update(true);
        }
    }
    private void _putBlock(World world,int x, int y, int z, int blockId, int meta){
        Block block = world.getBlockAt(x, y, z);
        block.setTypeId(blockId);
        block.setData((byte)meta);
        // TODO - add support for trees.
    }
    /* (non-Javadoc)
     * @see net.walterhiggins.scriptcraft.IScriptCraft#putBlock(int, int, int, int, int)
     */
    @Override
        public void putBlock(int x, int y, int z, int blockId, int meta) {
        World world = this.getInvokerWorld();
        this._putBlock(world, x, y, z, blockId, meta);
    }
    private final World getInvokerWorld(){
        if (this.invoker instanceof Player){
            Player player = (Player)this.invoker;
            return player.getLocation().getWorld();
        }
        if (this.invoker instanceof BlockCommandSender){
            BlockCommandSender bcs = (BlockCommandSender)this.invoker;
            return bcs.getBlock().getLocation().getWorld();
        }
        return null;
    }
    private final Block getBlockObjectAt(int x,int y, int z){
        World world = getInvokerWorld();
        if (world != null)
            return world.getBlockAt(x, y, z);
        return null;
    }
    /* (non-Javadoc)
     * @see net.walterhiggins.scriptcraft.IScriptCraft#getBlock(int, int, int)
     */
    @Override
        public String getBlock(int x, int y, int z) {
        Block block = this.getBlockObjectAt(x, y, z);
        if (block !=null)
            return "" + block.getTypeId() + ":" + block.getData();
        return null;
    }
    /* (non-Javadoc)
     * @see net.walterhiggins.scriptcraft.IScriptCraft#notifyAdministrators(java.lang.String)
     */
    @Override
        public void notifyAdministrators(String message) {
      
        Set<OfflinePlayer> ops = this.plugin.getServer().getOperators(); 
        for (OfflinePlayer op : ops){
            if (op.isOnline()){
                op.getPlayer().chat(message);
            }
        }
        this.plugin.getLogger().info(message);
    }
    protected JavaPlugin plugin = null;
    public CommandSender invoker = null;
    
    public void setInvoker(Object invoker)
    {
        this.invoker = (CommandSender)invoker;
    }
    public ScriptCraftBukkit(JavaPlugin plugin){
        this.plugin = plugin;
    }
    public double[] getPlayerPos()
    {
        double[] result = new double[4];
        if (this.invoker instanceof Player){
            Player player = (Player)this.invoker;
            Location location = player.getLocation();
            result[0] = location.getX();
            result[1] = location.getY();
            result[2] = location.getZ();
            result[3] = location.getYaw();
            return result;
        }else{
            return null;
        }
    }
    public double[] getMousePos()
    {
        double[] result = new double[4];
        if (this.invoker instanceof Player){
            Player player = (Player)this.invoker;
            Block targetedBlock = player.getTargetBlock(null,5);
            if (targetedBlock == null || targetedBlock.isEmpty()){
                return null;
            }
            Location location = targetedBlock.getLocation();
            result[0] = location.getX();
            result[1] = location.getY();
            result[2] = location.getZ();
            result[3] = location.getYaw();
            return result;
        }else{
            return null;
        }
    }
    

}
