/*************************************************************************
## The recipes module

The Recipes module provides convenience functions for adding and removing recipes
from the game.

### Example
To add an EnderBow to the game (assumes there's an enchanted Item variable called enderBow)...

    var recipes = require('recipes');
    var items = require('items');
    ...
    var enderBowRecipe = recipes.create( {
      result: enderBow,
      ingredients: {
        E: items.enderPearl(1),
        S: items.stick(1),
        W: items.string(1)
      },
      shape: [ 'ESW',
               'SEW',
               'ESW' ]
    } );
    // add to server
    var addedRecipe = server.addRecipe( enderBowRecipe );
    // to remove...
    server.removeRemove( addedRecipe );

***/
if (__plugin.canary) {
  module.exports = require('./canary/recipes');
} else {
  module.exports = require('./bukkit/recipes');
}
