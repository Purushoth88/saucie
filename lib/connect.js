var sc = require('./sc');

module.exports = function connect(opts) {
  return sc(opts).then(function(sauceConnectProcess) {
    sauceConnectProcess.kill = function NOOP() {};
  });
};
