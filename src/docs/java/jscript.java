import javax.script.*;
import java.io.FileReader;
import net.canarymod.api.inventory.ItemType;

public class jscript
{
    public static void main(String[] args) throws Exception
    {
        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        // Adding bindings to work with GraalJS
        Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE);
        bindings.put("polyglot.js.allowAllAccess", true);
        bindings.put("polyglot.js.nashorn-compat", true);

        java.io.File file = new java.io.File(args[0]);
        engine.put("engine",engine);
        engine.put("args",args);
	try {
	    engine.put("cmItemTypeClass",Class.forName("net.canarymod.api.inventroy.ItemType"));
	}catch(Exception e){
	}
        FileReader fr = new java.io.FileReader(file);
        engine.eval(fr);
        fr.close();
    }
}
