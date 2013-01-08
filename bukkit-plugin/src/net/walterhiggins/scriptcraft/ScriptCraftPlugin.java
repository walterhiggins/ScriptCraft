package net.walterhiggins.scriptcraft;

import java.io.File;
import java.io.FileReader;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.script.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.command.*;



public class ScriptCraftPlugin extends JavaPlugin
{
    // right now all ops share the same JS context/scope
    // need to look at possibly having context/scope per operator
    //protected Map<CommandSender,ScriptCraftEvaluator> playerContexts = new HashMap<CommandSender,ScriptCraftEvaluator>();
    protected ScriptEngine engine = null;
    private static final String JS_PLUGINS_DIR = "js-plugins";
    
    @Override
        public void onEnable()
    {
        //
        // does the js-plugins directory exist?
        //
        File jsPlugins = new File(JS_PLUGINS_DIR);
        if (!jsPlugins.exists())
        {
            getLogger().info("Directory " + JS_PLUGINS_DIR + " does not exist.");
            getLogger().info("Initializing " + JS_PLUGINS_DIR + " directory with contents from plugin archive.");
            
            jsPlugins.mkdir();
            
            ZipInputStream zis = new ZipInputStream(getResource(JS_PLUGINS_DIR + ".zip"));
            ZipEntry entry;
            try {
                while ( ( entry = zis.getNextEntry() ) != null)
                {
                    String filename = entry.getName();
                    getLogger().info("Unzipping " + filename);
                    File newFile = new File(jsPlugins.getName() + File.separator + filename);
 
                    //create all non exists folders
                    //else you will hit FileNotFoundException for compressed folder
                    if (entry.isDirectory()){
                        newFile.mkdirs();
                    }else{
                        FileOutputStream fout = new FileOutputStream(newFile);             
                        for (int c = zis.read(); c != -1; c = zis.read()) {
                            fout.write(c);
                        }
                        fout.close();

                    }
                    zis.closeEntry();
                }
                zis.close();
            }catch (IOException ioe){
                getLogger().warning(ioe.getMessage());
                ioe.printStackTrace();
            }
        }
        
        if (this.engine == null){
            try{
                ScriptEngineManager factory = new ScriptEngineManager();
                File boot = new File(JS_PLUGINS_DIR + "/core/_scriptcraft.js");
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
