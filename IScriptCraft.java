package net.minecraft.src;

public interface IScriptCraft
{
    public double[] getPlayerPos();
    public double[] getMousePos();
    public void putSign(String[] texts,int x, int y, int z, int block, int meta);
    public void putBlock(int x, int y, int z, int blockId, int meta);
    public String getBlock(int x, int y, int z);
    public void notifyAdministrators(String message);
    public void setInvoker(Object invoker);
}
