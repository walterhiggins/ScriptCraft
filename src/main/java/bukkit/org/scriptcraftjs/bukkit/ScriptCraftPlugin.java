package org.scriptcraftjs.bukkit;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class ScriptCraftPlugin extends JavaPlugin implements Listener
{
    public boolean canary = false;
    public boolean bukkit = true;
    // right now all ops share the same JS context/scope
    // need to look at possibly having context/scope per operator
    //protected Map<CommandSender,ScriptCraftEvaluator> playerContexts = new HashMap<CommandSender,ScriptCraftEvaluator>();
    private String NO_JAVASCRIPT_MESSAGE = "No JavaScript Engine available. ScriptCraft will not work without Javascript.";
    protected ScriptEngine engine = null;
    @Override
        public void onEnable()
    {
        Thread currentThread = Thread.currentThread();
        ClassLoader previousClassLoader = currentThread.getContextClassLoader();
        currentThread.setContextClassLoader(getClassLoader());
        try{
            ScriptEngineManager factory = new ScriptEngineManager();
            this.engine = factory.getEngineByName("JavaScript");
	    if (this.engine == null){
		this.getLogger().severe(NO_JAVASCRIPT_MESSAGE);
	    } else {
		Invocable inv = (Invocable)this.engine;
		this.engine.eval(new InputStreamReader(this.getResource("boot.js")));
		inv.invokeFunction("__scboot", this, engine);
	    }
        }catch(Exception e){
            e.printStackTrace();
            this.getLogger().severe(e.getMessage());
        }finally{
            currentThread.setContextClassLoader(previousClassLoader);
        }
    }
    public List<String> onTabComplete(CommandSender sender, Command cmd,
                                      String alias,
                                      String[] args)
    {
        List<String> result = new ArrayList<String>();
	if (this.engine == null){
	    this.getLogger().severe(NO_JAVASCRIPT_MESSAGE);
	    return null;
	}
        try {
            Invocable inv = (Invocable)this.engine;
            inv.invokeFunction("__onTabComplete", result, sender, cmd, alias, args);
        }catch (Exception e){
            sender.sendMessage(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
    
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args)
    {
        boolean result = false;
        String javascriptCode = "";
        Object jsResult = null;
	if (this.engine == null){
	    this.getLogger().severe(NO_JAVASCRIPT_MESSAGE);
	    return false;
	}
        try {
            jsResult = ((Invocable)this.engine).invokeFunction("__onCommand", sender, cmd, label, args);
        }catch (Exception se){
            this.getLogger().severe(se.toString());
            se.printStackTrace();
            sender.sendMessage(se.getMessage());
        }
        if (jsResult != null){
            return ((Boolean)jsResult).booleanValue();
        }
        return result;
    }
}
