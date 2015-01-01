package org.scriptcraftjs.canarymod;

import java.io.InputStreamReader;
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.Invocable;
import java.util.List;
import java.util.ArrayList;

import net.canarymod.plugin.Plugin;
import net.canarymod.plugin.PluginListener;
import net.canarymod.tasks.ServerTask;
import net.canarymod.tasks.TaskOwner;
import net.canarymod.commandsys.CommandListener;
import net.canarymod.commandsys.Command;
import net.canarymod.commandsys.TabComplete;
import net.canarymod.chat.MessageReceiver;
import net.canarymod.Canary;
import net.canarymod.api.inventory.recipes.CraftingRecipe;
import net.canarymod.api.inventory.recipes.RecipeRow;
import net.canarymod.api.inventory.Item;
// event help stuff
import net.canarymod.hook.Dispatcher;
import net.canarymod.plugin.PluginListener;
import net.canarymod.hook.Hook;

public class ScriptCraftPlugin extends Plugin implements PluginListener, CommandListener
{
    public boolean canary = true;
    public boolean bukkit = false;
    private String NO_JAVASCRIPT_MESSAGE = "No JavaScript Engine available. " + 
        "ScriptCraft will not work without Javascript.";
    protected ScriptEngine engine = null;
    @Override
    public void disable(){
        try { 
            ((Invocable)this.engine).invokeFunction("__onDisable", this.engine, this);
        }catch ( Exception e) {
            this.getLogman().error(e.getMessage());
        }
    }
    @Override
    public boolean enable()
    {
        try{
            ScriptEngineManager factory = new ScriptEngineManager();
            this.engine = factory.getEngineByName("JavaScript");
            if (this.engine == null){
                this.getLogman().error(NO_JAVASCRIPT_MESSAGE);
            } else { 
                Invocable inv = (Invocable)this.engine;
                //File f = new File(this.getJarPath());
                InputStreamReader reader = new InputStreamReader(getClass()
                                                                 .getClassLoader()
                                                                 .getResourceAsStream("boot.js"));
                this.engine.eval(reader);
                inv.invokeFunction("__scboot", this, engine, getClass().getClassLoader());
            }

            Canary.commands().registerCommands(this, this, false);
        }catch(Exception e){
            e.printStackTrace();
            this.getLogman().error(e.getMessage());
        }
        return true;
    }
    public static interface IDispatcher {
        public void execute(PluginListener listener, Hook hook);
    }
    public Dispatcher getDispatcher(final IDispatcher impl){
        return new Dispatcher(){
            public void execute(PluginListener listener, Hook hook){
                impl.execute(listener, hook);
            }
        };
    }
    static class ScriptCraftTask extends ServerTask {
        private Runnable runnable = null;
        public ScriptCraftTask(Runnable runnable, TaskOwner owner, long delay, boolean continuous){
            super(owner, delay, continuous);
            this.runnable = runnable;
        }
        @Override
        public void run(){
            this.runnable.run();
        }
    }

    public ServerTask createServerTask(Runnable runnable, long delay, boolean continuous){
        return new ScriptCraftTask(runnable, this, delay, continuous);
    }

    private void executeCommand( MessageReceiver sender, String[] args) {
        boolean result = false;
        String javascriptCode = "";
        Object jsResult = null;
        if (this.engine == null){
            this.getLogman().error(NO_JAVASCRIPT_MESSAGE);
            return;
        }
        try { 
            jsResult = ((Invocable)this.engine).invokeFunction("__onCommand", sender, args);
        }catch (Exception se){
            this.getLogman().error(se.toString());
            se.printStackTrace();
            sender.message(se.getMessage());
        }
        if (jsResult != null){
            return ;
        }
        return;
    }
    @Command(
             aliases = { "js" },
             description = "Execute Javascript code",
             permissions = { "scriptcraft.evaluate" },
             toolTip = "/js javascript expression")
             public void jsCommand(MessageReceiver sender, String[] args) {

        executeCommand(sender, args);
    }
    /*
      groupmod permission add visitors canary.jsp
      groupmod permission add visitors canary.command.jsp
    */
    @Command(
             aliases = { "jsp" },
             description = "Run javascript-provided command",
             permissions = { "" },
             toolTip = "/jsp command")
             public void jspCommand(MessageReceiver sender, String[] args) {

        executeCommand(sender, args);
    }

    private List<String> complete(MessageReceiver sender, String[] args, String cmd){
        List<String> result = new ArrayList<String>();
        if (this.engine == null){
            this.getLogman().error(NO_JAVASCRIPT_MESSAGE);
            return null;
        }
        try {
            Invocable inv = (Invocable)this.engine;
            inv.invokeFunction("__onTabComplete", result, sender, args, cmd);
        }catch (Exception e){
            sender.message(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
    @TabComplete (commands = { "js" })
    public List<String> jsComplete(MessageReceiver sender, String[] args){
        return complete(sender, args, "js");
    }
    @TabComplete (commands = { "jsp" })
    public List<String> jspComplete(MessageReceiver sender, String[] args){
        return complete(sender, args, "jsp");
    }
}
