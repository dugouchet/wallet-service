'use strict';

require('newrelic');

  require('dnscache')({
  enable: true,
  ttl: 300,
  cachesize: 1000,
});

const gateway = require('./gateway');

gateway.start();
