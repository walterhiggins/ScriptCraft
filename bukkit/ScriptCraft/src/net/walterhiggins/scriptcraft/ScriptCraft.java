package net.walterhiggins.scriptcraft;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.command.*;
public class ScriptCraft extends JavaPlugin
{
    @Override
    public void onEnable(){
        getLogger().info("ScriptCraft enabled.");
    }
    
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args)
    {
        if(cmd.getName().equalsIgnoreCase("js"))
        { 
            this.getLogger().info(cmd.toString());
            return true;
        } 
        return false; 
    }
}
