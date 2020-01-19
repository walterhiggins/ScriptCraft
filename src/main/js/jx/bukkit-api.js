module.exports = {
   _: function (object) {
      var type = jx.type(object);
      if (type.contains('.entity.')) {
         return jx.api.entityType[object.type];
      } else if (type.contains('.block.') || type.contains('ItemStack')) {
         return jx.api.material[object.type];
      } else {
         return null;
      }
   },
   api: {
      attribute: (function () {
         var output = {};
         var values = org.bukkit.attribute.Attribute.values();
         [].slice.call(values).forEach(function (entry) {
            var key = entry.name().split('_').slice(1).join('_').toLowerCase();
            output[key] = entry;
            output[entry.name()] = key;
         });
         return output;
      })(),
      enchantment: (function () {
         var output = {};
         var values = org.bukkit.enchantments.Enchantment.values();
         [].slice.call(values).forEach(function (entry) {
            output[entry.key.key] = entry;
            output[entry.name] = entry.key.key;
         });
         return output;
      })(),
      entityType: (function () {
         var output = {};
         var values = org.bukkit.entity.EntityType.values();
         [].slice.call(values).forEach(function (entry) {
            if (entry.name() === 'UNKNOWN') {
               output['unknown'] = entry;
               output['UNKNOWN'] = 'unknown';
            } else {
               output[entry.key.key] = entry;
               output[entry.name()] = entry.key.key;
            }
         });
         return output;
      })(),
      gameRule: (function () {
         var output = {};
         var values = org.bukkit.GameRule.values();
         [].slice.call(values).forEach(function (entry) {
            output[entry.name] = entry;
         });
         return output;
      })(),
      lootTables: (function () {
         var output = {};
         var values = org.bukkit.loot.LootTables.values();
         [].slice.call(values).forEach(function (entry) {
            output[entry.key.key.split('/').join('$')] = entry.lootTable;
            output[entry.name()] = entry.key.key.split('/').join('$');
         });
         return output;
      })(),
      material: (function () {
         var output = {},
            values = org.bukkit.Material.values();
         [].slice.call(values).forEach(function (entry) {
            if (entry.name().startsWith('LEGACY')) {
               output[entry.name().toLowerCase()] = entry;
               output[entry.name()] = entry.name().toLowerCase();
            } else {
               output[entry.key.key] = entry;
               output[entry.name()] = entry.key.key;
            }
         });
         return output;
      })(),
      operation: (function () {
         var output = {};
         var values = org.bukkit.attribute.AttributeModifier.Operation.values();
         [].slice.call(values).forEach(function (entry) {
            var name = entry.name();
            if (name === 'MULTIPLY_SCALAR_1') name = 'MULTIPLY_SCALAR';
            output[name.toLowerCase()] = entry;
            output[name] = name.toLowerCase();
         });
         return output;
      })(),
      potionEffectType: (function () {
         var output = {};
         var values = org.bukkit.potion.PotionEffectType.values();
         [].slice.call(values).forEach(function (entry) {
            output[entry.handle.c().split('.')[2]] = entry;
            output[entry.name] = entry.handle.c().split('.')[2];
         });
         return output;
      })(),
      sound: (function () {
         var output = {};
         var values = org.bukkit.Sound.values();
         [].slice.call(values).forEach(function (entry) {
            var vanilla = entry.name().toLowerCase().split('_').join('.');
            output[vanilla] = entry;
            output[entry.name()] = vanilla;
         });
         return output;
      })(),
      soundCategory: (function () {
         var output = {};
         var values = org.bukkit.SoundCategory.values();
         [].slice.call(values).forEach(function (entry) {
            var vanilla = entry.name().toLowerCase();
            output[vanilla] = entry;
            output[entry.name()] = vanilla;
         });
         return output;
      })()
   }
};

module.exports.init = function (jx) {
   global._ = jx._;
};
