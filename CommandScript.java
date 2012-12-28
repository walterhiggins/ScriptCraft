package net.minecraft.src;

import java.util.List;
import java.io.*;
import javax.swing.JFileChooser;
import net.minecraft.server.MinecraftServer;
import sun.org.mozilla.javascript.*;
import net.minecraft.client.*;
/**
 * This mod lets you load and run javascript to build structures which would otherwise be tedious.
 * Build road networks, rows of houses, factories and sky-scrapers. ScriptCraft takes building to a whole new level
 * by making it easy to create javascript scripts that do the building for you.
 * The following code creates a simple cottage at the crosshair location or the player's current location...
 * load("./drone.js");
 * var drone = new Drone();
 * drone.box0(48,7,6,2)     // 4 walls
 *      .right(3).door()    // a door front-center
 *      .left(2).box(102)   // windows left and right of door
 *      .right(4).box(102)  // 
 *      .home().up(2).prism0(53,7,6); // a gable roof
 *
 */
public class CommandScript extends CommandBase {

    public static class MCScope extends ImporterTopLevel{
        public MCScope(Context ctx){
            super(ctx);
        }
    }
    public static class PlayerPos
    {
        public double x;
        public double y;
        public double z;
        public double rotationYaw;
        public String toString(){
            return super.toString() + " x:" + this.x + " ,y:" + this.y + " ,z:" + this.z + " ,rotationYaw:" + this.rotationYaw;
        }
        
    }

    
    public static PlayerPos getPlayerPosImpl()
    {
        PlayerPos pos = new PlayerPos();
        EntityPlayer player = (EntityPlayer)CommandScript.sender;
        
        pos.x = player.posX;
        pos.y = player.posY;
        pos.z = player.posZ;
        pos.rotationYaw = player.rotationYaw;
        return pos;
    }
    public static PlayerPos getMousePosImpl()
    {
        Minecraft mc = net.minecraft.client.Minecraft.getMinecraft();
        MovingObjectPosition omo = mc.objectMouseOver;
        if (omo == null){
            return null;
        }
        PlayerPos pos = new PlayerPos();
        pos.x = omo.blockX;
        pos.y = omo.blockY;
        pos.z = omo.blockZ;
        return pos;
    }
    public static void putSignImpl(String[] texts, int x, int y, int z, int block, int meta)
    {
        CommandScript.putBlockImpl(x,y,z,block,meta);
        EntityPlayer player = (EntityPlayer)CommandScript.sender;
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
    
    public static void putBlockImpl(int x, int y, int z, int blockId, int meta){
        EntityPlayer player = (EntityPlayer)CommandScript.sender;
        player.worldObj.setBlockAndMetadata(x,y,z,blockId,meta);
    }
    
    public String getCommandName() {
        return "js";
    }
    private Context ctx = null;
    private Scriptable scope = null;

    public int getRequiredPermissionLevel() {
        // WPH     return 2;
       return 0;
    }
    private static ICommandSender sender;
    
    public void processCommand(ICommandSender par1ICommandSender, String[] args) 
    {
        CommandScript.sender = par1ICommandSender;
        
        if (this.ctx == null){
            this.ctx = Context.enter();
        }
        if (this.scope == null){
            ScriptableObject importer = new CommandScript.MCScope(ctx);
            this.scope = this.ctx.initStandardObjects(importer);
            ctx.evaluateString(scope,"importPackage(net.minecraft.src)","<cmd>",1,null);
            String[] names = { 
                "print" 
                ,"load" 
                ,"help"
                ,"getPlayerPos"
                ,"getMousePos" 
                ,"putBlock"
                ,"putSign"
            };
            importer.defineFunctionProperties(names, CommandScript.class,ScriptableObject.DONTENUM);            
            importer.defineProperty("minecraft", net.minecraft.client.Minecraft.getMinecraft(),ScriptableObject.DONTENUM);
            EntityPlayer player = (EntityPlayer)par1ICommandSender;
            importer.defineProperty("player", player,ScriptableObject.DONTENUM);
            importer.defineProperty("world", player.worldObj,ScriptableObject.DONTENUM);
        }
        if (System.out !=null){
            System.out.println(this.scope);
        }

        // Collect the arguments into a single string.
        String s = "";
        for (int i=0; i < args.length; i++) {
            s += args[i] + " ";
        }
        // Now evaluate the string we've colected.
        notifyAdmins(par1ICommandSender, "js> " + s, (Object[])args);
        Object result = ctx.evaluateString(scope, s, "<cmd>", 1, null);
        if (result != null){
            notifyAdmins(par1ICommandSender, Context.toString(result), (Object[])args);
        }
        return;
    }
    public static void load(Context cx, Scriptable thisObj,
                             Object[] args, Function funObj)
    {
        File scriptFile = null;
        String filename = null;
        
        if (args.length == 0){
            JFileChooser fc = new javax.swing.JFileChooser();
            int rc = fc.showOpenDialog(null);
            if (rc ==JFileChooser.APPROVE_OPTION){
                scriptFile = fc.getSelectedFile();
            }else{
                return;
            }
        }else{
            scriptFile = new File((String)args[0]);
        }
        
        FileReader in = null;
        try {
            in = new FileReader(scriptFile);
        }
        catch (FileNotFoundException ex) {
            Context.reportError("Couldn't open file \"" + scriptFile + "\".");
            return;
        }
        filename = scriptFile.getAbsolutePath();
        ((ScriptableObject)thisObj).defineProperty("$SCRIPT",scriptFile.getAbsolutePath(),ScriptableObject.DONTENUM);
        ((ScriptableObject)thisObj).defineProperty("$SCRIPT_DIR",scriptFile.getParentFile().getAbsolutePath(),ScriptableObject.DONTENUM);
        
        try {
            // Here we evalute the entire contents of the file as
            // a script. Text is printed only if the print() function
            // is called.
            cx.evaluateReader(thisObj, in, filename, 1, null);
        }
        catch (WrappedException we) {
            System.err.println(we.getWrappedException().toString());
            we.printStackTrace();
        }
        catch (EvaluatorException ee) {
            System.err.println("js: " + ee.getMessage());
        }
        catch (JavaScriptException jse) {
            System.err.println("js: " + jse.getMessage());
        }
        catch (IOException ioe) {
            System.err.println(ioe.toString());
        }
        finally {
            try {
                in.close();
            }
            catch (IOException ioe) {
                System.err.println(ioe.toString());
            }
        }
    }
    public static void help(Context cx, Scriptable thisObj,
                             Object[] args, Function funObj)
    {
        String cwd = java.lang.System.getProperty("user.dir");
        String[] helpArgs = {"Current Working Directory: " + cwd,
                             "load('path-to-script.js')",
                             "load() (with no params) lets you choose a script file",
                             "getPlayerPos() returns player coords",
                             "getMousePos() returns mouse/crosshair coords",
                             "putBlock(x,y,z,blockId,meta) e.g. putBlock(100,2,50,44,2) puts a sandstone slab (44:2) at position 100,2,50. See http://www.minecraftinfo.com/idlist.htm for block ids"
        };
        print(cx,thisObj,helpArgs,funObj);
    }
    
    
    public static void print(Context cx, Scriptable thisObj,
                             Object[] args, Function funObj)
    {
        for (int i=0; i < args.length; i++) {
            if (i > 0){
                System.out.print(" ");
            }
            
            // Convert the arbitrary JavaScript value into a string form.
            String s = Context.toString(args[i]);
            notifyAdmins(CommandScript.sender, s, args);
            System.out.print(s);
        }
        System.out.println();
    }
    public static PlayerPos getPlayerPos(Context cx, Scriptable thisObj,Object[] args, Function funObj){
        return getPlayerPosImpl();
    }
    public static PlayerPos getMousePos(Context cx, Scriptable thisObj,Object[] args, Function funObj){
        return getMousePosImpl();
    }
    public static void putBlock(Context cx, Scriptable thisObj,Object[] args, Function funObj){
        int x = new Double(args[0].toString()).intValue();
        int y = new Double(args[1].toString()).intValue();
        int z = new Double(args[2].toString()).intValue();
        int b = new Double(args[3].toString()).intValue();
        int m = new Double(args[4].toString()).intValue();
        putBlockImpl(x,y,z,b,m);
        switch (b){
        case 6: 
            EntityPlayer player = (EntityPlayer)CommandScript.sender;
            World world = player.worldObj;
            ((BlockSapling)Block.sapling).growTree(world,x,y,z,world.rand);
            break;
        }
    }
    public static void putSign(Context cx, Scriptable thisObj,Object[] args, Function funObj){
        List jsArray = (List)args[0];
        System.out.println("putSign jsArray=" + jsArray);
        
        String[] texts = new String[4];
        for (int i = 0; i < jsArray.size() && i <= 3;i++){
            texts[i] = (String)jsArray.get(i);
        }
        int x = new Double(args[1].toString()).intValue();
        int y = new Double(args[2].toString()).intValue();
        int z = new Double(args[3].toString()).intValue();
        int b = new Double(args[4].toString()).intValue();
        int m = new Double(args[5].toString()).intValue();
        putSignImpl(texts,x,y,z,b,m);
    }

}
