'use strict';
const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/v1/pkpass',
  config: {
    description: 'get pkpass for a given reservation',
    notes: `post to create a signed pkpass`,
    tags: ['api'],
    validate: {
      payload: Joi.object().keys({
          name: Joi.string(),
          restaurantName: Joi.string(),
        }),
    }
  },
  handler: ({ payload }, reply) => {
    console.log(payload);

    return new Promise(reply);
  }
};
