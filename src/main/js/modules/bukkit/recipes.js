var bkShapedRecipe = org.bukkit.inventory.ShapedRecipe;

exports.add = function( recipe ){
  var result = new bkShapedRecipe( recipe.result );
  result.shape(recipe.shape[0], recipe.shape[1], recipe.shape[2]);
  for (var i in recipe.ingredients ){
    result.setIngredient( new java.lang.Character(i), recipe.ingredients[i].getData() );
  }
  server.addRecipe(result);
  return result;
};
exports.remove = function( recipe ) {
  server.removeRecipe(recipe);
};
