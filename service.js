'use strict';

const logger = require('./lib/logger');
const path = require('path');
const { createService } = require('@thefork/service-platform');

const nodePackage = require('./package');
const config = require('config');

const swaggerOptions = {
  info: {
    title: 'wallet service Documentation',
    version: nodePackage.version,
  },
  documentationPath: '/v1/documentation',
};

const service = createService({
  name: nodePackage.name,
  host: config.host,
  port: process.env.NODE_PORT || config.port,
  path: '/',
  logger,
});

service.loadMethods(path.resolve(__dirname, 'src/methods/*.js'));

module.exports = service;
