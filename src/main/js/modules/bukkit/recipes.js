var items = require('items');
var bkShapedRecipe = org.bukkit.inventory.ShapedRecipe;

exports.add = function( recipe ){
  var result = new bkShapedRecipe( recipe.result );
  result.shape( recipe.shape );
  for (var i in recipe.ingredients ){
    result.setIngredient( i, recipe.ingredients[i] );
  }
  server.addRecipe(result);
  return result;
};
exports.remove = function( recipe ) {
  server.removeRecipe(recipe);
};
