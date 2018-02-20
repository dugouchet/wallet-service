'use strict';

require('newrelic');

  require('dnscache')({
  enable: true,
  ttl: 300,
  cachesize: 1000,
});

const service = require('./service');

service
  .start()
  .tap(() => console.log("start promise resolved"))
  .tap(service => service.injectJsonRpc("insertPkpass", {
    payload: {
      name: "toto",
      restaurantName: "resto",
    }
  }))
  .tapCatch((err)=>console.error(err.stack))
;

