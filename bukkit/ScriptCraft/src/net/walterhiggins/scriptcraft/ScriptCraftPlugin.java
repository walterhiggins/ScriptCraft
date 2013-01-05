package net.walterhiggins.scriptcraft;
import java.io.File;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.command.*;
import org.mozilla.javascript.*;

public class ScriptCraftPlugin extends JavaPlugin
{
    // right now all ops share the same JS context/scope
    // need to look at possibly having context/scope per operator
    //protected Map<CommandSender,ScriptCraftEvaluator> playerContexts = new HashMap<CommandSender,ScriptCraftEvaluator>();
    protected ScriptCraftEvaluator evaluator = null;
    
    @Override
        public void onEnable(){
        getLogger().info("ScriptCraft enabled.");
        if (this.evaluator == null){
            this.evaluator = new ScriptCraftEvaluator(new ScriptCraftBukkit(this));
            this.evaluator.getScope().defineProperty("plugin", this, ScriptableObject.READONLY);
            //
            // Auto-load Javascript plugins from the js-plugins directory 
            // in the current working directory
            //
            String userDir = System.getProperty("user.dir");
            File jsPlugins = new File(userDir + System.getProperty("file.separator") + "js-plugins");
            if (jsPlugins.exists()){
                File[] files = jsPlugins.listFiles();
                for (File f: files){
                    String canonicalPath = null;
                    try {
                        //
                        // fix for bug #11
                        //
                        canonicalPath = f.getCanonicalPath();
                        canonicalPath.replaceAll("\\\\", "/");
                        this.evaluator.eval("load(\"" + canonicalPath + "\")", null);
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            }
        }
      
    }
    
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args)
    {
        if(cmd.getName().equalsIgnoreCase("js"))
        { 
            this.evaluator.getScope().defineProperty("self", sender, ScriptableObject.DONTENUM);
            String javascriptCode = "";
            for (int i = 0;i < args.length; i++){
                javascriptCode = javascriptCode + args[i] + " ";
            }
            this.evaluator.eval(javascriptCode, sender);
            return true;
        } 
        return false; 
    }

}
