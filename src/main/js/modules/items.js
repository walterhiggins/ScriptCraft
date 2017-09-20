if (__plugin.canary) {
  module.exports = require('./canary/items');
} else {
  module.exports = require('./bukkit/items');
}
