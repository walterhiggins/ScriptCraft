/*global require, exports,  command*/
var cr = require('classroom');

command(
  function classroom(params, sender) {
    if (params[0] == 'on') {
      cr.allowScripting(true, sender);
    } else {
      cr.allowScripting(false, sender);
    }
  },
  ['on', 'off']
);
exports.classroom = cr;
