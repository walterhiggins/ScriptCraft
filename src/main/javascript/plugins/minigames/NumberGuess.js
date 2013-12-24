/*
  A basic number-guessing game that uses the Bukkit Conversation API.
 */
ready(function(){
    
    global.GuessTheNumber = function()
    {
        importPackage(org.bukkit.conversations);

        var number = Math.ceil(Math.random() * 10);

        var prompt = new Prompt()
        {
            getPromptText: function(ctx){
                var hint = "";
                var h = ctx.getSessionData("hint");
                if (h){
                    hint = h;
                }
                return hint + "Think of a number between 1 and 10";
            },
            acceptInput: function(ctx, s)
            {
                s = s.replace(/^[^0-9]+/,""); // strip leading non-numeric characters (e.g. '/' )
                s = parseInt(s);
                if (s == number){
                    setTimeout(function(){
                        ctx.forWhom.sendRawMessage("You guessed Correct!");
                    },100);
                    return null;
                }else{
                    if (s < number)
                        ctx.setSessionData("hint","too low\n");
                    if (s > number)
                        ctx.setSessionData("hint","too high\n");
                    return prompt;
                }
            },
            blocksForInput: function(ctx){ return true; }
        };
        var cf = new ConversationFactory(__plugin);
        var conv = cf.withModality(true)
            .withFirstPrompt(prompt)
            .withPrefix(new ConversationPrefix(){ getPrefix: function(ctx){ return "[1-10] ";} })
            .buildConversation(self);
        conv.begin();
    };
});
