'use strict';

const logger = require('./lib/logger');
const path = require('path');
const { createService } = require('@thefork/service-platform');
const Joi = require('joi');
const { createPkpassSchema } = require('./src/schemas/pkpassSchema');
const generatePkpass = require('./lib/generatePkpass');
const nodePackage = require('./package');
const config = require('config');
const bodyParser = require('body-parser');


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

// parse application/json
service.connect.use(bodyParser.json());

service.connect.use('/foo', function fooMiddleware(req, res, next) {
  Joi.validate(req.body, createPkpassSchema, function (err, value) {
    if (err) {
      res.statusCode = 400;
      res.end();
    }

     generatePkpass(req.body).render(res, function(error) {
        if (error)
          console.error(error);
     });
  });
});

// not use because it's not a json-rpc service anymore
//service.loadMethods(path.resolve(__dirname, 'src/methods/*.js'));

module.exports = service;
