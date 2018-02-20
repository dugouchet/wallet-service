'use strict';
const Joi = require('joi');
const { createPkpassSchema } = require('../schemas/pkpassSchema');
module.exports = {
  name: 'insertPkpass',
  description: 'insert pkpass',
  config: {
    validate: {
      payload: createPkpassSchema
    },
    handler: ({payload}, databaseClient) => {
      console.log('INPUT !!!',payload);

      return (payload);
    }
  }
};
