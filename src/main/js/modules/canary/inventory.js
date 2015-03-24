function inventory(entity){
  var inv = entity.inventory;
  var result = {
    add: function(items){
      inv['addItem(net.canarymod.api.inventory.Item)'](items);
      return result;
    },
    remove: function(items){
      inv['decreaseItemStackSize(int, int)'](items.id, items.amount);
      return result;
    },
    contains: function(items){
      var type = items.type;
      var amount = items.amount;
      return inv['hasItemStack(ItemType, int )'](type, amount);
    }
  };
  return result;
}
module.exports = inventory;
