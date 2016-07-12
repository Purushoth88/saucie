var Bluebird = require('bluebird');

var sc = require('./sc');

module.exports = function (config) {
  if (!config.connect) {
    return Bluebird.resolve();
  }

  return sc(config.launcherOptions()).then(function (sauceConnectProcess) {
    console.log("# Started Sauce Connect tunnel");
    return sauceConnectProcess;
  }).disposer(function(sauceConnectProcess) {
    var closeAsync = Bluebird.promisify(sauceConnectProcess.close);
    return closeAsync().tap(function () {
      console.log("# Closed Sauce Connect tunnel");
    });
  });
};
