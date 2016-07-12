var Bluebird = require('bluebird');
var launcher = require('sauce-connect-launcher');
var retry = require('bluebird-retry');

var launcherAsync = Bluebird.promisify(launcher);

module.exports = function sc (opts) {
  var maxTries = 1;

  if (opts && opts.connectTries) {
    maxTries = opts.connectTries;
    delete opts.connectTries;
  }

  function launchTunnel() {
    return launcherAsync(opts);
  }

  return retry(launchTunnel, { max_tries: maxTries, backoff: 2, interval: 5000 });
};
