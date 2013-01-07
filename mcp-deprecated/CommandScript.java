package net.minecraft.src;
/**
 * This mod lets you load and run javascript to build structures which
 * would otherwise be tedious. Build road networks, rows of houses,
 * factories and sky-scrapers. ScriptCraft takes building to a whole
 * new level by making it easy to create javascript scripts that do
 * the building for you.  The following code creates a simple cottage
 * at the crosshair location or the player's current location...
 *
 * load("./drone.js");
 * var drone = new Drone().chkpt('cornerstone');
 * drone.box0(48,7,2,6)     // 4 walls
 *      .right(3).door()    // a door front-center
 *      .left(2).box(102)   // windows left and right of door
 *      .right(4).box(102)  // 
 *      .move('cornerstone').up(2).prism0(53,7,6); // a gable roof
 *
 */

public class CommandScript extends CommandBase 
{
    ScriptCraftEvaluator evaluator = null;
    
    public String getCommandName() { return "js"; }

    public int getRequiredPermissionLevel() { return 0; }

    public void processCommand(ICommandSender par1ICommandSender, String[] args) 
    {
        if (this.evaluator == null)
            this.evaluator = new ScriptCraftEvaluator(new ScriptCraftMCP(this));
            
        // Collect the arguments into a single string.
        String s = "";
        for (int i=0; i < args.length; i++) {
            s += args[i] + " ";
        }
        // Now evaluate the string we've colected.
        this.evaluator.eval(s,par1ICommandSender);
        
        return;
    }
}
