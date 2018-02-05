'use strict';

const logger = require('./lib/logger');
const path = require('path');
const { createGateway } = require('@thefork/gateway-platform');

const nodePackage = require('./package');
const config = require('config');

const swaggerOptions = {
  info: {
    title: 'wallet Gateway Documentation',
    version: nodePackage.version,
  },
  documentationPath: '/v1/documentation',
};

const gateway = createGateway({
  port: process.env.NODE_PORT || config.port,
  host: config.host,
  logger,
  swagger: swaggerOptions,
  services: config.services,
});

gateway.loadAPIRoutes(path.resolve(__dirname, 'src/routes/*.js'));

module.exports = gateway;
