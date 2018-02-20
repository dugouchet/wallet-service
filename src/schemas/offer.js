'use strict';

const Joi = require('joi');

// Schema is not detailed here:
// we are only passing through the object from offers-service

module.exports = Joi.object()
    .label('Offer')
    .description('The offer that the customer chose for this reservation, if any');
