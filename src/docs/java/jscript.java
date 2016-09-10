import javax.script.*;
import java.io.FileReader;
import net.canarymod.api.inventory.ItemType;

public class jscript
{
    public static void main(String[] args) throws Exception
    {
        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        java.io.File file = new java.io.File(args[0]);
        engine.put("engine",engine);
        engine.put("args",args);
	engine.put("cmItemTypeClass",ItemType.class);
        FileReader fr = new java.io.FileReader(file);
        engine.eval(fr);
        fr.close();
    }
}
