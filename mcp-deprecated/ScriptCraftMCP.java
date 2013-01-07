package net.minecraft.src;
import net.minecraft.client.*;
/**
 * An implementation of the IScriptCraft interface for
 * Minecraft Coder Pack-style install
 * 
 */ 
public class ScriptCraftMCP implements IScriptCraft
{
    protected CommandBase command = null;
    
    public ScriptCraftMCP(CommandBase mcpCommand){
        this.command = mcpCommand;
    }
    
    protected ICommandSender invoker;
    //
    // following code depends on MCP
    //
    public double[] getPlayerPos()
    {
        double[] result = new double[4];
        if (this.invoker instanceof EntityPlayer){
            EntityPlayer player = (EntityPlayer)this.invoker;
            result[0] = player.posX;
            result[1] = player.posY;
            result[2] = player.posZ;
            result[3] = player.rotationYaw;
            return result;
        }
        return null;
    }
    public double[] getMousePos()
    {
        Minecraft mc = net.minecraft.client.Minecraft.getMinecraft();
        MovingObjectPosition omo = mc.objectMouseOver;
        if (omo == null){
            return null;
        }
        double[] result = new double[4];
        result[0] = omo.blockX;
        result[1] = omo.blockY;
        result[2] = omo.blockZ;
        return result;
    }
    public void putSign(String[] texts, int x, int y, int z, int block, int meta)
    {
        this.putBlock(x,y,z,block,meta);
        EntityPlayer player = (EntityPlayer)this.invoker;
        World world = player.worldObj;
        TileEntitySign sign = (TileEntitySign)world.getBlockTileEntity(x,y,z);
        for (int i=0 ; i < texts.length && i <= 3;i++){
            String text = texts[i];
            if (text != null){
                if (text.length() > 15){
                    text = text.substring(0,15);
                }
                sign.signText[i] = text;
            }
        }
        sign.onInventoryChanged();
        world.markBlockForUpdate(x,y,z);
    }
    
    public void putBlock(int x, int y, int z, int blockId, int meta)
    {
        World world = null;
        if (this.invoker instanceof EntityPlayer)
        {
            world = ((EntityPlayer)(this.invoker)).worldObj;
        }
        else if (this.invoker instanceof TileEntity)
        {
            world = ((TileEntity)(this.invoker)).getWorldObj();
        }
        world.setBlockAndMetadata(x,y,z,blockId,meta);

        switch (blockId)
        {
        case 6: 
            ((BlockSapling)Block.sapling).growTree(world,x,y,z,world.rand);
            break;
        }
    }
    //
    // returns the block id and metadata at a given location in the world
    // e.g. returns "98" for a stone block or "98:2" for a mossy stone block.
    //
    public String getBlock(int x, int y, int z)
    {
        EntityPlayer player = (EntityPlayer)this.invoker;
        World world = player.worldObj;
        int blockId = world.getBlockId(x,y,z);
        int metadata = world.getBlockMetadata(x,y,z);
        if (metadata !=0){
            return "" + blockId + ":" + metadata;
        }else{
            return "" + blockId;
        }
    }
    public void notifyAdministrators(String message)
    {
        this.command.notifyAdmins(this.invoker,message,(Object[])null);
    }
    public void setInvoker(Object invoker)
    {
        this.invoker = (ICommandSender)invoker;
    }
}
