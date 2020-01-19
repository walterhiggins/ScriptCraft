//////////////////////////////////////////////////////////////////////
//                                                                  //
//  ########  ########  ########  ########            ##  ########  //
//  ##        ##    ##  ##    ##  ##                  ##  ##        //
//  ##        ##    ##  ##    ##  ##                  ##  ##        //
//  ##        ##    ##  ########  #######             ##  ########  //
//  ##        ##    ##  ## ###    ##                  ##        ##  //
//  ##        ##    ##  ##  ###   ##                  ##        ##  //
//  ########  ########  ##   ###  ########  ##  ########  ########  //
//                                                                  //
//////////////////////////////////////////////////////////////////////

module.exports = {
   all: function (script, exception) {
      server.onlinePlayers.forEach(function (player) {
         if (exception && jx.player(exception).uuid === jx.player(player).uuid) {
            return false;
         }
         script(jx.player(player));
      });
   },
   color: function (text) {
      return text.toString().split('&').join('\xA7').split('\xA7\xA7').join('&');
   },
   console: function (command) {
      server.dispatchCommand(server.consoleSender, command.toString());
   },
   data: {
      store: {
         server: persist('jx-server'),
         player: {}
      },
      server: function () {
         return jx.util.traverse(jx.data.store.server, arguments);
      },
      player: function (player) {
         var store = jx.data.store.player;
         player = jx.player(player);
         var data = store[player.uuid] || (store[player.uuid] = persist('jx-player.' + player.uuid));
         return jx.util.traverse(data, jx.util.array(arguments).slice(1));
      }
   },
   interface: function (player, rows, title, items) {
      player = jx.player(player).instance;
      player.closeInventory();
      var inv = server.createInventory(player, Number(rows) * 9, title.toString());
      var data = jx.data.server('interface');
      var uuid = inv.hashCode().toString();
      data[uuid] = {};
      Object.keys(items).forEach(function (slot) {
         var item = items[slot];
         inv.setItem(slot, item.stack);
         data[uuid][slot] = { command: item.command, event: item.event };
      });
      player.openInventory(inv);
   },
   perm: function (target, permission, value) {
      var player = jx.player(target).instance;
      switch (value) {
         case null:
            player.effectivePermissions.forEach(function (info) {
               if (info.permission === permission) {
                  player.removeAttachment(info.attachment);
               }
            });
            break;
         case true:
         case false:
            player.addAttachment(__plugin, permission, value);
            break;
      }
      jx.data.player(player, 'perm')[permission] = value;
   },
   player: function (query) {
      if (query.uuid) {
         return query;
      }
      var output = {};
      var players = jx.data.server('players');
      var player = query.uniqueId ? query : server.getOfflinePlayer(players[query] || query);
      output.uuid = player.uniqueId.toString();
      output.instance = server.getPlayer(player.uniqueId);
      output.online = !!output.instance;
      output.name = players[output.uuid];
      output.data = function () {
         return jx.util.traverse(jx.data.player(output), arguments);
      };
      return output;
   },
   query: function (selector, context) {
      if (jx.type(context) === 'string') {
         return server.selectEntities(jx.player(context).instance, selector);
      } else {
         return server.selectEntities(context || server.consoleSender, selector);
      }
   },
   rand: {
      integer: function (limit) {
         return Math.floor(Math.random() * Math.abs(limit + 1));
      },
      minmax: function (min, max) {
         return jx.rand.integer(max - min) + min;
      },
      chance: function (chance) {
         return Math.random() < chance;
      }
   },
   spawn: {
      block: function (location, type) {
         return $(jx.util.loc(location).block).set(type).block;
      },
      entity: function (location, type) {
         location = jx.util.loc(location);
         return location.world.spawnEntity(location, jx.api.entityType[type.toString()]);
      },
      item: function (type, amount) {
         return new org.bukkit.inventory.ItemStack(jx.api.material[type.toString()], Number(amount) || 1);
      },
      sound: function (player, type, options) {
         options = options || {};
         player = jx.player(player).instance;
         var type = jx.api.sound[type.toString()];
         var category = jx.api.soundCategory[(options.category || 'master').toString()];
         var location = jx.util.loc(options.location || player.location);
         player.playSound(location, type, category, options.volume || 1, options.pitch || 1);
      }
   },
   text: function (player, message, actionbar) {
      player = jx.player(player).instance;
      if (actionbar) {
         var bkClass = Java.type('net.md_5.bungee.api.ChatMessageType').ACTION_BAR;
         var bkClass2 = Java.type('net.md_5.bungee.api.chat.TextComponent');
         player.sendMessage(bkClass, new bkClass2(jx.color(message)));
      } else {
         player.sendMessage(jx.color(message));
      }
   },
   type: function (object) {
      if (object == null) {
         return object + '';
      } else if (typeof object === 'object') {
         var name = (object.constructor || {}).name || 'Object';
         return name === 'Object' ? toString.call(object).slice(8, -1) : name;
      } else {
         return typeof object;
      }
   },
   util: {
      array: function (input) {
         if (input.forEach) {
            var array = [];
            input.forEach(function (value) {
               array.push(value);
            });
            return array;
         } else {
            return [].slice.call(input);
         }
      },
      auto: function (object, key, placeholder) {
         return object[key] || (object[key] = placeholder);
      },
      camel: function (text) {
         var pascal = jx.util.pascal(text);
         return pascal[0].toLowerCase() + pascal.slice(1);
      },
      class: function (subject, filter) {
         if (!subject.interfaces) {
            return false;
         }
         var match = false;
         while (subject.interfaces.length && match === false) {
            if (subject.name.contains(filter)) {
               var match = true;
            } else {
               subject = subject.interfaces[0];
            }
         }
         return match;
      },
      json: function (loc) {
         if (!loc.world.name) {
            return loc;
         }
         return { world: loc.world.name, x: loc.x, y: loc.y, z: loc.z, yaw: loc.yaw, pitch: loc.pitch };
      },
      loc: function (json) {
         if (json.world.name) {
            return json;
         }
         var world = server.getWorld(json.world || 'world');
         return new org.bukkit.Location(world, json.x, json.y, json.z, json.yaw || 0, json.pitch || 0);
      },
      merge: function (base) {
         jx.util.array(arguments).forEach(function (object) {
            Object.keys(object).forEach(function (key) {
               base[key] = object[key];
            });
         });
      },
      pascal: function (text) {
         var array = text.toString().split(' ').map(function (chunk) {
            return chunk[0].toUpperCase() + chunk.slice(1);
         });
         return array.join('');
      },
      traverse: function (context, nodes) {
         jx.util.array(nodes).forEach(function (node) {
            context = jx.util.auto(context, node, {});
         });
         return context;
      }
   }
};

module.exports.init = function (jx) {
   jx.all(jx.data.player);
   jx.data.store.server.interface = {};
   jx.event.player.join(function (player, instance) {
      var players = jx.data.server('players');
      if (!players[player.uuid]) {
         // runs when player joins for the first time
      }
      jx.data.server('players')[player.uuid] = instance.name;
      var perm = player.data('perm');
      Object.keys(perm).forEach(function (key) {
         jx.perm(instance, key, perm[key]);
      });
   });
   jx.event.player.click(function (x, inventory, instance, event) {
      var data = jx.data.server('interface');
      var hash = inventory.hashCode().toString();
      if (data[hash]) {
         event.setCancelled(true);
         var item = data[hash][event.slot];
         if (item.event) {
            jx.event.fire(item.event, instance);
         }
         if (item.command) {
            instance.chat(item.command);
         }
      }
   });
   jx.event.player.close(function (x, inventory) {
      var data = jx.data.server('interface');
      var hash = inventory.hashCode().toString();
      if (data[hash]) {
         data[hash] = void 0;
      }
   });
};
