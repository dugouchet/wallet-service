'use strict';

require('newrelic');

const service = require('./service');

service
  .start()
  .tap(() => console.log("start promise resolved"))
  // .tap(service => service.injectJsonRpc("insertPkpass", {
  //   payload: {
  //     name: "toto",
  //     restaurantName: "resto",
  //   }
  // }))
  .tapCatch((err)=>console.error(err.stack))
;
