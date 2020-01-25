/*
  A test of the commando plugin.
  Adds a new `/js-time` command with 4 possible options: Dawn, Midday, Dusk, Midnight
*/
if (__plugin.canary) {
  console.warn('commando-test not yet supported in CanaryMod');
  return;
}
var commando = require('./commando').commando,
  times = ['Dawn', 'Midday', 'Dusk', 'Midnight'];

commando(
  'js-time',
  function(params, sender) {
    var time = '' + params[0].toLowerCase(),
      i = 0;
    if (sender.location) {
      for (; i < 4; i++) {
        if (times[i].toLowerCase() == time) {
          sender.location.world.setTime(i * 6000);
          break;
        }
      }
    } else {
      echo(sender, 'This command only works in-world');
    }
  },
  times
);
