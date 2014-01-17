package net.walterhiggins.scriptcraft;

import java.io.InputStreamReader;
import javax.script.*;
import java.util.List;
import java.util.ArrayList;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.command.*;
import org.bukkit.event.Listener;

public class ScriptCraftPlugin extends JavaPlugin implements Listener
{
    // right now all ops share the same JS context/scope
    // need to look at possibly having context/scope per operator
    //protected Map<CommandSender,ScriptCraftEvaluator> playerContexts = new HashMap<CommandSender,ScriptCraftEvaluator>();
    protected ScriptEngine engine = null;
    @Override
        public void onEnable()
    {
        try{
            ScriptEngineManager factory = new ScriptEngineManager();
            this.engine = factory.getEngineByName("JavaScript");
            Invocable inv = (Invocable)this.engine;
            this.engine.eval(new InputStreamReader(this.getResource("boot.js")));
            inv.invokeFunction("__scboot", this, engine);

        }catch(Exception e){
            e.printStackTrace();
            this.getLogger().severe(e.getMessage());
        }
    }
    public List<String> onTabComplete(CommandSender sender, Command cmd,
                                      String alias,
                                      String[] args)
    {
        List<String> result = new ArrayList<String>();
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
