'use strict';

const Joi = require('joi');

// Schema is not detailed here:
// we are only passing through the object from restaurant-service

module.exports = Joi.object()
    .label('Restaurant')
    .description('The restaurant where the reservation is taking place');
