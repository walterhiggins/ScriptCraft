package net.walterhiggins.scriptcraft;

import org.mozilla.javascript.*;
import java.util.List;
import java.io.*;
import javax.swing.JFileChooser;
import org.bukkit.entity.Player;

public class ScriptCraftEvaluator 
{
    protected static IScriptCraft sc = null;
    protected Context ctx = null;
    protected Scriptable scope = null;

    public static class MCScope extends ImporterTopLevel{
        /**
         * 
         */
        private static final long serialVersionUID = 1L;

        public MCScope(Context ctx){
            super(ctx);
        }
    }
    public ScriptCraftEvaluator(IScriptCraft scImpl)
    {
        ScriptCraftEvaluator.sc = scImpl;
        this.ctx = Context.enter();
        ScriptableObject importer = new ScriptCraftEvaluator.MCScope(ctx);
        this.scope = this.ctx.initStandardObjects(importer);
        //
        // for mcp debug only
        //ctx.evaluateString(scope,"importPackage(net.minecraft.src)","<cmd>",1,null);
        //
        String[] names = { 
            "print" 
            ,"load" 
            ,"help"
            ,"getPlayerPos"
            ,"getMousePos" 
            ,"putBlock"
            ,"getBlock"
            ,"putSign"
        };
        importer.defineFunctionProperties(names, 
                                          ScriptCraftEvaluator.class,
                                          ScriptableObject.DONTENUM);
    }
    /**
     * So clients can add their own properties ...
     * 
     * evaluator.getScope().defineProperty("jsVarName",javaObject);
     */
    public ScriptableObject getScope()
    {
        return (ScriptableObject)this.scope;
    }
    //
    // wph 20130105 - Only the console user should be able to load a script
    // players should not be able to open scripts
    //
    private static Object invoker = null;
    

    public Object eval(String javascript, Object invoker)
    {
        ScriptCraftEvaluator.invoker = invoker;
        
        ScriptCraftEvaluator.sc.setInvoker(invoker);
        ScriptCraftEvaluator.sc.notifyAdministrators("js> " + javascript);
        Object result = null;
        try 
        {
            result = ctx.evaluateString(this.scope, javascript, "<cmd>", 1, null);
        }
        catch(Exception e)
        {
            e.printStackTrace(System.err);
            ScriptCraftEvaluator.sc.notifyAdministrators("Exception: " + e.getMessage());
        }
        if (result != null)
        {
            ScriptCraftEvaluator.sc.notifyAdministrators(Context.toString(result));
        }
        return result;
    }
    
    /**
     * Load a javascript source file and evaluate its contents.
     */
    public static Object load(Context cx, Scriptable thisObj, Object[] args, Function funObj)
    {
        if (ScriptCraftEvaluator.invoker instanceof Player){
            ScriptCraftEvaluator.sc.notifyAdministrators(invoker.toString() + " tried to load a script.\n" + 
                                                         "Only the console user can load scripts.\n" +
                                                         "Players cannot load scripts.");
            return null;
        }
        
        Object result = null;
        
        File scriptFile = null;
        String filename = null;
        
        if (args.length == 0)
        {
            JFileChooser fc = new javax.swing.JFileChooser();
            int rc = fc.showOpenDialog(null);
            if (rc ==JFileChooser.APPROVE_OPTION){
                scriptFile = fc.getSelectedFile();
            }else{
                return result;
            }
        }else{
            scriptFile = new File((String)args[0]);
        }
        
        FileReader in = null;
        try {
            in = new FileReader(scriptFile);
        }
        catch (FileNotFoundException ex) 
        {
            ex.printStackTrace(System.err);
            ScriptCraftEvaluator.sc.notifyAdministrators( "Error - File not found " + args[0]);
            Context.reportError("Couldn't open file \"" + scriptFile + "\".");
            return null;
        }
        filename = scriptFile.getAbsolutePath();
        System.out.println("ScripCraftEvaluator: filename=" + filename);
        File parentFile = scriptFile.getParentFile();
        String filedir = null;
        if (parentFile !=null){
            filedir = parentFile.getAbsolutePath();
        }
        //
        // setup the special script-context-only variables
        //
        ((ScriptableObject)thisObj).defineProperty("$SCRIPT",filename,ScriptableObject.DONTENUM);
        ((ScriptableObject)thisObj).defineProperty("$SCRIPT_DIR",filedir==null?"":filedir,ScriptableObject.DONTENUM);
        
        try {
            // Here we evalute the entire contents of the file as
            // a script. Text is printed only if the print() function
            // is called.
            ScriptCraftEvaluator.sc.notifyAdministrators( "Loading " + filename);
            result = cx.evaluateReader(thisObj, in, filename, 1, null);
            ScriptCraftEvaluator.sc.notifyAdministrators( "Successfully loaded " + filename);
        }
        catch (WrappedException we) {
            we.printStackTrace(System.err);
            String wes = we.getWrappedException().toString();
            ScriptCraftEvaluator.sc.notifyAdministrators("WrappedException while loading " + filename + ": " + wes);
            System.err.println(wes);
            we.printStackTrace();
        }
        catch (EvaluatorException ee) {
            ee.printStackTrace(System.err);
            System.err.println("js: " + ee.getMessage());
            ScriptCraftEvaluator.sc.notifyAdministrators( "EvaluatorException while loading " + filename + ": " + ee.getMessage());
        }
        catch (JavaScriptException jse) {
            jse.printStackTrace(System.err);
            System.err.println("js: " + jse.getMessage());
            ScriptCraftEvaluator.sc.notifyAdministrators("JavascriptException while loading " + filename + ": " + jse.getMessage());
        }
        catch (IOException ioe) {
            ioe.printStackTrace(System.err);
            System.err.println(ioe.toString());
            ScriptCraftEvaluator.sc.notifyAdministrators( "IOException while loading " + filename + ": " + ioe.getMessage());
        }
        finally {
            try {
                in.close();
            }
            catch (IOException ioe) {
                System.err.println(ioe.toString());
            }
        }
        return result;
    }
    public static void help(Context cx, Scriptable thisObj, Object[] args, Function funObj)
    {
        String cwd = java.lang.System.getProperty("user.dir");
        String[] helpArgs = {"Current Working Directory: " + cwd,
                             "load('path-to-script.js')",
                             "load() (with no params) lets you choose a script file",
                             "getPlayerPos() returns player coords",
                             "getMousePos() returns mouse/crosshair coords",
                             "getBlock(x,y,z) returns the block and metadata e.g. '98' for a stone block or '98:2' for a mossy stone block",
                             "putBlock(x,y,z,blockId,meta) e.g. putBlock(100,2,50,44,2) puts a sandstone slab (44:2) at position 100,2,50. See http://www.minecraftinfo.com/idlist.htm for block ids"
        };
        print(cx,thisObj,helpArgs,funObj);
    }
    
    public static void print(Context cx, Scriptable thisObj,Object[] args, Function funObj)
    {
        for (int i=0; i < args.length; i++) {
            if (i > 0){
                System.out.print(" ");
            }
            
            // Convert the arbitrary JavaScript value into a string form.
            String s = Context.toString(args[i]);
            ScriptCraftEvaluator.sc.notifyAdministrators(s);
            System.out.print(s);
        }
        System.out.println();
    }
    public static double[] getPlayerPos(Context cx, Scriptable thisObj,Object[] args, Function funObj)
    {
        return ScriptCraftEvaluator.sc.getPlayerPos();
    }
    public static double[] getMousePos(Context cx, Scriptable thisObj,Object[] args, Function funObj)
    {
        return ScriptCraftEvaluator.sc.getMousePos();
    }
    public static void putBlock(Context cx, Scriptable thisObj,Object[] args, Function funObj)
    {
        int x;
        int y;
        int z;
        int b;
        int m;
        
        if (args.length == 2){
            double[] mousePos = ScriptCraftEvaluator.sc.getMousePos();
            if (mousePos != null){
                x = (int)mousePos[0];
                y = (int)mousePos[1];
                z = (int)mousePos[2];
                b = new Double(args[0].toString()).intValue();
                m = new Double(args[1].toString()).intValue();
            }else{
                return;
            }
        }else {
            x = new Double(args[0].toString()).intValue();
            y = new Double(args[1].toString()).intValue();
            z = new Double(args[2].toString()).intValue();
            b = new Double(args[3].toString()).intValue();
            m = new Double(args[4].toString()).intValue();
        }
        ScriptCraftEvaluator.sc.putBlock(x,y,z,b,m);
    }
    //
    // gets the blockId and metadata at the given coords
    // if no coords are provided then the mouse position is used instead.
    //
    public static String getBlock(Context cx, Scriptable thisObj,Object[] args, Function funObj){
        int x;
        int y;
        int z;
        
        if (args.length != 0){
            x = new Double(args[0].toString()).intValue();
            y = new Double(args[1].toString()).intValue();
            z = new Double(args[2].toString()).intValue();
        }else{
            double[] mousePos = ScriptCraftEvaluator.sc.getMousePos();
            if (mousePos != null){
                x = (int)mousePos[0];
                y = (int)mousePos[1];
                z = (int)mousePos[2];
            }else{
                return null;
            }
        }
        return ScriptCraftEvaluator.sc.getBlock(x,y,z);
    }
    @SuppressWarnings("unchecked")
        public static void putSign(Context cx, Scriptable thisObj,Object[] args, Function funObj){
        List<String> jsArray = (List<String>)args[0];
        
        String[] texts = new String[4];
        int i = 0;
        for (String s : jsArray){
            texts[i++] = s;
        }
        /*
          for (int i = 0; i < jsArray.size() && i <= 3;i++){
          texts[i] = (String)jsArray.get(i);
          }
        */
        int x = new Double(args[1].toString()).intValue();
        int y = new Double(args[2].toString()).intValue();
        int z = new Double(args[3].toString()).intValue();
        int b = new Double(args[4].toString()).intValue();
        int m = new Double(args[5].toString()).intValue();
        ScriptCraftEvaluator.sc.putSign(texts,x,y,z,b,m);
    }
    
}
