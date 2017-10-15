if (__plugin.canary) { 
  module.exports = require('./canary/sounds');
} else {
  module.exports = require('./bukkit/sounds');
}
