var cm = Packages.net.canarymod;
var cmRecipe = cm.api.inventory.recipes.CraftingRecipe;
var cmRecipeRow = cm.api.inventory.recipes.RecipeRow;

function addRecipe( recipe ){
  return server.addRecipe( createRecipe( recipe ) );
}
function createRecipe( recipe ){
  if (!recipe){
    return null;
  }
  var result,
    rows,
    i,j,
    cells,
    rr;
  if (recipe.shape){
    rows = [];
    for (i = 0; i < recipe.shape.length; i++){
      cells = recipe.shape[i].split('');
      rr = [];
      for ( j = 0; j < cells.length ; j++){
        if (cells[j] != ' '){
          rr.push(recipe.ingredients[cells[j]]);
        }
      }
      rows.push( new cmRecipeRow(recipe.shape[i], rr) );
    }
    /*
      wph 20150607 short-term workaround for nashorn defect
      https://bugs.openjdk.java.net/browse/JDK-8072596
    */
    if ( typeof Java !== 'undefined' && typeof Java.type === 'function' ) {
      var RecipeRowArrayType = Java.type('net.canarymod.api.inventory.recipes.RecipeRow[]');
      rows = Java.to( rows, RecipeRowArrayType );
    }
    result = cmRecipe.createShapedRecipe( recipe.result, rows);
  } else { 
    result = cmRecipe.createShapelessRecipe( recipe.result, recipe.ingredients );
  }
  return result;
}
function removeRecipe( recipe ){
  server.removeRecipe( recipe );
}
exports.create = createRecipe;
exports.add = addRecipe;
exports.remove = removeRecipe;
