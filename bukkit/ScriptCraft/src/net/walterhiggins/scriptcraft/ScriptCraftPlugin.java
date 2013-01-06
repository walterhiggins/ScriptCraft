package net.walterhiggins.scriptcraft;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.plugin.java.JavaPlugin;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ScriptableObject;

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
            String pluginsDirectoryPath = userDir + System.getProperty("file.separator") + "js-plugins";
            File jsPlugins = new File(pluginsDirectoryPath);
            if (jsPlugins.exists()){
                File[] files = jsPlugins.listFiles();
                for (File f: files){
                    String canonicalPath = null;
                    try {
                        //
                        // fix for bug #11
                        //
                        canonicalPath = f.getCanonicalPath();
                        canonicalPath = canonicalPath.replaceAll("\\\\", "/");
                        this.evaluator.eval("load(\"" + canonicalPath + "\")", null);
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
                watchPluginsDirectory(pluginsDirectoryPath, evaluator);
            }
        }
      
    }
    
    private void watchPluginsDirectory(String pluginsDirectory, final ScriptCraftEvaluator evaluator){
    	final Path dir = Paths.get(pluginsDirectory);
    	ExecutorService newFixedThreadPool = Executors.newFixedThreadPool(1);
    	newFixedThreadPool.execute(new Runnable() { 
			public void run() { 
				Context.enter();
				try {
					try {
						new WatchJsPlugins(dir, true).processEvents(evaluator);
					} catch (IOException e) {
						e.printStackTrace();
					}
				} finally {
				    Context.exit();
				}
			}
		});
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
