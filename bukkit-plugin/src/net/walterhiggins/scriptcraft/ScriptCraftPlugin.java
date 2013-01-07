package net.walterhiggins.scriptcraft;

import java.io.File;
import java.io.FileReader;
import javax.script.*;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.command.*;



public class ScriptCraftPlugin extends JavaPlugin
{
    // right now all ops share the same JS context/scope
    // need to look at possibly having context/scope per operator
    //protected Map<CommandSender,ScriptCraftEvaluator> playerContexts = new HashMap<CommandSender,ScriptCraftEvaluator>();
    protected ScriptEngine engine = null;
    
    @Override
        public void onEnable(){
        if (this.engine == null){
            try{
                ScriptEngineManager factory = new ScriptEngineManager();
                File boot = new File("js-plugins2/core/_scriptcraft.js");
                this.engine = factory.getEngineByName("JavaScript");
                this.engine.put("__engine",engine);
                this.engine.put("__plugin",this);
                this.engine.put("__script",boot.getCanonicalPath().replaceAll("\\\\","/"));
                this.engine.eval(new FileReader(boot));  
            }catch(Exception e){
                e.printStackTrace();
            }
            
        }
    }
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args)
    {
        if(cmd.getName().equalsIgnoreCase("js"))
        { 
            this.engine.put("__self",sender);
            String javascriptCode = "";
            for (int i = 0;i < args.length; i++){
                javascriptCode = javascriptCode + args[i] + " ";
            }
            try{
                Object result = this.engine.eval(javascriptCode);
                if (result != null)
                    sender.sendMessage(result.toString());
                return true;
            }catch (Exception e){
                sender.sendMessage(e.getMessage());
                e.printStackTrace();
            }
            return true;
        } 
        return false; 
    }

}
