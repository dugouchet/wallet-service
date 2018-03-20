'use strict';

const Joi = require('joi');

const restaurantKeys = {
  name: Joi.string()
  .example('Goumard')
  .description('Restaurant name')
  .error(new Error('restaurant.name is missing'))
  .required(),
}

const customerKeys = {
  firstName: Joi.string()
  .example("John")
  .error(new Error('firstName is missing'))
  .required(),
  lastName: Joi.string()
  .example("Appleseed")
  .error(new Error('lastName is missing'))
  .required(),
  phone: Joi.string()
  .example('+33692343545')
  .optional(),
}

const createPkpassSchema = {
  mealDate: Joi.string()
    .isoDate()
    .notes([
      'ISO8601 date time with timezone',
    ])
    .example('2017-01-31T20:00:00+02:00')
    .error(new Error('mealDate is missing'))
    .description('The date and time (with timezone) of this reservation')
    .required(),
  partySize: Joi.number()
    .integer()
    .positive()
    .min(1)
    .required()
    .error(new Error('partySize is missing'))
    .description('The number of people who will come to the restaurant for this reservation')
    .example(2),
  restaurant: Joi.object().keys(restaurantKeys),
  customer: Joi.object().keys(customerKeys),
}

module.exports = {
  createPkpassSchema,
};
