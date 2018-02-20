'use strict';
const Joi = require('joi');

module.exports = {
  name: 'insertPkpass',
  description: 'insert pkpass',
  config: {
    validate: {
      payload: Joi.object().keys({
        name: Joi.string(),
        restaurantName: Joi.string(),
      })
    },
    handler: ({payload}, databaseClient) => {
      console.log('INPUT !!!',payload);

      return (payload);
    }
  }
};
