/*************************************************************************
# NumberGuess mini-game: 

## Description
This is a very simple number guessing game. Minecraft will ask you to
guess a number between 1 and 10 and you will tell you if you're too
hight or too low when you guess wrong. The purpose of this mini-game
code is to demonstrate use of Bukkit's Conversation API.

## Example
    
    /js Game_NumberGuess.start()

Once the game begins, guess a number by typing the `/` character
followed by a number between 1 and 10.

***/
exports.Game_NumberGuess = {
    start: function() {
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
    }
};
