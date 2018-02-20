'use strict';

const Joi = require('joi');
const _ = require('lodash');
const constants = require('../../lib/constants');

module.exports = Joi.string()
    .description('The status of the reservation')
    .notes([
        'REQUESTED: the restaurant needs to confirm this reservation',
        'RECORDED: current default status', // TODO: remove, see https://jira.lafourchette.io/browse/BBDA-444
        'CONFIRMED: currently unused', // TODO: change description once we use this
        'REFUSED: the restaurant did not accept the reservation request',
        'CANCELED: after a reservation has been canceled',
        'NO_SHOW: after a reservation has been declared as no show',
    ])
    .valid(_.values(constants.RESERVATION_STATES));
