'use strict';

require('newrelic');

const service = require('./service');

service
  .start()
  .tap(() => console.log("start promise resolved"))
  .tapCatch((err)=>console.error(err.stack))
;
