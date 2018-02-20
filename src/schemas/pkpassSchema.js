'use strict';

const Joi = require('joi');
const offer = require('./offer');
const customer = require('../schemas/customer');
const restaurant = require('../schemas/restaurant');
const reservationStatus = require('../schemas/reservationStatus');


const commonKeys = {
  mealDate: Joi.string()
    .isoDate()
    .notes([
      'ISO8601 date time with timezone',
    ])
    .example('2017-01-31T20:00:00+02:00')
    .description('The date and time (with timezone) of this reservation')
    .required(),
  partySize: Joi.number()
    .integer()
    .positive()
    .min(1)
    .required()
    .description('The number of people who will come to the restaurant for this reservation')
    .example(2),
  customerNote: Joi.string()
    .optional()
    .allow(null)
    .description('A note that the customer can add when booking, with special requests/messages')
    .example('Please give us a table with a nice view on the terrace'),
  tableName: Joi.string()
    .optional()
    .allow(['', null])
    .description('The name of the table associated with the reservation')
    .example('Table 28')
    .example('Chef\'s table'),
};

const reservationRequestSchema = Joi.object()
  .label('Reservation request')
  // show all validation errors at once
  .options({
    abortEarly: false,
  })
  .keys(commonKeys);

const responseKeys = {
  reservationUuid: Joi.string()
    .uuid()
    .required()
    .example('00000000-0000-0000-0000-000000000000')
    .description('The reservation UUID'),
  status: reservationStatus
    .required(),
  createdTs: Joi.string()
    .isoDate()
    .notes([
      'ISO8601 date time with timezone',
    ])
    .example('2017-01-31T20:00:00+02:00')
    .description('The date and time (with timezone) of reservation creation'),
};

const reservationResponseSchema = Joi.object()
  .keys(Object.assign(responseKeys, commonKeys))
  .label('Reservation');

const embedKeys = {
  offer,
  customer,
  restaurant,
};

const createPkpassSchema = Joi.object()
  .keys(Object.assign(responseKeys, commonKeys, embedKeys))
  .label('Reservation with optional embeds');

module.exports = {
  reservationRequestSchema,
  reservationResponseSchema,
  createPkpassSchema,
};
