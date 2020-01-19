module.exports = {
   $: function (object) {
      var type = jx.type(object);
      if (type.contains('.entity.')) {
         return jx.entity(object);
      } else if (type.contains('.block.')) {
         return jx.block(object);
      } else if (type.contains('ItemStack')) {
         return jx.item(object);
      } else {
         return null;
      }
   },
   block: function (subject) {
      var block = subject;
      var that = {
         get block () {
            return block;
         }
      };
      that.type = _(block);
      return that;
   },
   entity: function (subject) {
      var entity = subject;
      var that = {
         get entity () {
            return entity;
         }
      };
      that.type = _(entity);
      that.effect = function (type, level, time, force) {
         if (type) {
            type = jx.api.potionEffectType[type.toString()];
            if (level) {
               time = Number(time || -1);
               var ticks = time === -1 ? 2147483647 : time * 20;
               var effect = type.createEffect(ticks, Number(level === void 0 ? 1 : level) - 1);
               entity.addPotionEffect(effect, force || true);
               return that;
            } else if (Number(level) === 0) {
               entity.removePotionEffect(type);
               return that;
            } else {
               return entity.getPotionEffect(type);
            }
         } else {
            return jx.util.array(org.bukkit.potion.PotionEffectType.values()).map(function (entry) {
               return entity.getPotionEffect(entry);
            });
         }
      };
      that.attribute = function (type, value) {
         if (type) {
            type = type.toString();
            if (value) {
               entity.getAttribute(jx.api.attribute[type]).setBaseValue(Number(value));
               return that;
            } else {
               return Number(entity.getAttribute(jx.api.attribute[type]).baseValue);
            }
         } else {
            return jx.util.array(org.bukkit.attribute.Attribute.values()).map(function (entry) {
               return Number(entity.getAttribute(entry).baseValue);
            });
         }
      };
      that.equip = function (equipment) {
         var nothing = jx.spawn.item('air');
         entity.equipment.setItemInMainHand(equipment.itemInMainHand || nothing);
         entity.equipment.setItemInOffHand(equipment.offhand || nothing);
         entity.equipment.setHelmet(equipment.helmet || nothing);
         entity.equipment.setChestplate(equipment.chestplate || nothing);
         entity.equipment.setLeggings(equipment.leggings || nothing);
         entity.equipment.setBoots(equipment.boots || nothing);
         return that;
      };
      that.heal = function (amount) {
         entity.setHealth(Number(amount || entity.maxHealth));
         return that;
      };
      that.feed = function (amount) {
         entity.setFoodLevel(Number(amount || 20));
         return that;
      };
      that.damage = function (amount) {
         entity.damage(Number(amount || entity.health + 1));
         return that;
      };
      that.clear = function () {
         entity.inventory.clear();
         return that;
      };
      that.give = function (item) {
         entity.inventory.addItem(jx.api.material[item.toString()]);
         return that;
      };
      that.take = function (item) {
         entity.inventory.remove(jx.api.material[item.toString()]);
         return that;
      };
      that.tag = function (tag, add) {
         add ? entity.addScoreboardTag(tag.toString()) : entity.removeScoreboardTag(tag.toString());
         return that;
      };
      that.mod = function (options) {
         if (options.health) {
            options.health = Number(options.health);
            entity.setMaxHealth(options.health);
            entity.setHealth(options.health);
         }
         if (options.equipment) {
            that.equip(options.equipment);
         }
         if (options.effects) {
            Object.keys(options.effects).forEach(function (effect) {
               var value = options.effects[effect];
               that.effect(effect, Number(value.level || 1), Number(value.time || -1), true);
            });
         }
         if (options.attributes) {
            Object.keys(options.attributes).forEach(function (attribute) {
               that.attribute(attribute, Number(options.attributes[attribute]));
            });
         }
         return that;
      };
      return that;
   },
   item: function (subject) {
      var item = subject;
      var that = {
         get item () {
            return item;
         }
      };
      that.type = _(item);
      that.enchantment = function (type, level) {
         var enchantments = {};
         item.enchantments.entrySet().forEach(function (entry) {
            var name = jx.api.enchantment[entry.key.name];
            enchantments[name] = Number(entry.value);
         });
         if (type) {
            type = type.toString();
            if (level) {
               item.addUnsafeEnchantment(jx.api.enchantment[type], Number(level));
               return that;
            } else {
               return enchantments[type];
            }
         } else {
            return enchantments;
         }
      };
      that.attribute = function (type, value, operation) {
         var meta = item.itemMeta;
         if (type) {
            type = type.toString();
            if (value) {
               var uuid = java.util.UUID.randomUUID();
               var operation = jx.api.operation[operation.toString()];
               var modifier = new org.bukkit.attribute.AttributeModifier(uuid, type, Number(value), operation);
               meta.addAttributeModifier(jx.api.attribute[type], modifier);
               item.setItemMeta(meta);
               return that;
            } else {
               meta.getAttributeModifiers(jx.api.attribute[type]);
            }
         } else {
            return jx.util.array(org.bukkit.attribute.Attribute.values()).map(function (entry) {
               return meta.getAttributeModifiers(entry);
            });
         }
      };
      that.meta = function (property, value) {
         var meta = item.itemMeta;
         if (property) {
            var name = jx.util.pascal(property.toString());
            if (value) {
               meta['set' + name](value);
               item.setItemMeta(meta);
               return that;
            } else {
               return meta[property];
            }
         } else {
            return meta;
         }
      };
      that.amount = function (amount) {
         if (amount) {
            item.setAmount(Number(amount));
            return that;
         } else {
            return Number(item.amount);
         }
      };
      that.hide = function (flags) {
         var meta = item.itemMeta;
         var flags = [];
         if (flags.attributes) {
            flags.push(org.bukkit.inventory.ItemFlag.HIDE_ATTRIBUTES);
         }
         if (flags.destroys) {
            flags.push(org.bukkit.inventory.ItemFlag.HIDE_DESTROYS);
         }
         if (flags.enchants) {
            flags.push(org.bukkit.inventory.ItemFlag.HIDE_ENCHANTS);
         }
         if (flags.places) {
            flags.push(org.bukkit.inventory.ItemFlag.HIDE_PLACED_ON);
         }
         if (flags.effects) {
            flags.push(org.bukkit.inventory.ItemFlag.HIDE_POTION_EFFECTS);
         }
         if (flags.unbreakable) {
            flags.push(org.bukkit.inventory.ItemFlag.HIDE_UNBREAKABLE);
         }
         meta.addItemFlags(flags);
         item.setItemMeta(meta);
         return that;
      };
      that.mod = function (options) {
         if (options.amount) {
            that.setAmount(options.amount);
         }
         if (options.hide) {
            that.hide(options.hide);
         }
         if (options.meta) {
            Object.keys(options.meta).forEach(function (property) {
               that.meta(property, options.meta[property]);
            });
         }
         if (options.enchantments) {
            Object.keys(options.enchantments).forEach(function (enchantment) {
               that.enchantment(enchantment, Number(options.enchantments[enchantment]));
            });
         }
         if (options.attributes) {
            Object.keys(options.attributes).forEach(function (attribute) {
               that.attribute(attribute, Number(options.attributes[attribute]));
            });
         }
         return that;
      };
      return that;
   }
};

module.exports.init = function (jx) {
   global.$ = jx.$;
};
