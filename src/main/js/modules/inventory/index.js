/************************************************************************
## Inventory Module
This module provides functions to add items to, remove items from and check the 
contents of a player or NPC's inventory. 

### Usage
The inventory module is best used in conjunction with the items module. See below for examples of usage.

```javascript
var inventory = require('inventory');
var items = require('items');
var utils = require('utils');

// gives every player a cookie and a baked potatoe
utils.players(function(player){
  inventory(player)
    .add( items.cookie(1) )
    .add( items.bakedPotato(1) )
});

// give a player 6 cookies then take away 4 of them

inventory(player)
  .add( items.cookie(6) )
  .remove ( items.cookie(4) )

// check if a player has any cookies

var hasCookies = inventory(player).contains( items.cookie(1) );

```
The inventory module exposes a single function which when passed a player or NPC will return an object with 3 methods:

* add : Adds items to the inventory (Expects parameters of type `net.canarymod.api.inventory.Item` - I strongly recommend using the `items` module for constructing items)
* remove : removes items from the inventory (Expects parameters of type `net.canarymod.api.inventory.Item` - I strongly recommend using the `items` module for constructing items)
* contains : checks to see if there is the specified type and amount of item in the inventory (Expects parameters of type `net.canarymod.api.inventory.Item` - I strongly recommend using the `items` module for constructing items)

The Inventory module currently only works with CanaryMod.

***/
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
