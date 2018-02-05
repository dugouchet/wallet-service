'use strict';

'use strict';

const {
  createLogger,
  APPLICATION_TYPES,
  STREAM_NAMES,
  LEVELS,
} = require('@thefork/node-logger');

const appLogger = createLogger({
  applicationName: 'demo',
  applicationType: APPLICATION_TYPES.APP,
  level: LEVELS.INFO,
  streamsOptions: [STREAM_NAMES.LOGSTASH_FILE, STREAM_NAMES.LOGSTASH_STDOUT],
});

module.exports = appLogger;
