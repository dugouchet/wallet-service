'use strict';

const Joi = require('joi');

// Schemas are not detailed here:
// we are only passing through the object from customer-service

const offlineCustomer = Joi.object()
    .label('Offline Customer')
    .description('A customer as seen, created or modified by a restaurant');

const onlineCustomer = Joi.object()
    .label('Online Customer')
    .description('A customer from TheFork online');

module.exports = Joi.alternatives()
    .try(offlineCustomer, onlineCustomer)
    .label('Customer')
    .description('The customer who made the reservation')
    .notes([
        'Use the `customerContext` parameter to specify whether to embed an offline customer or an online customer',
    ]);
