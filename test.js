const AMQPLog = require('./index');

const logger = new AMQPLog('amqp://producer:DYjpp4fbCQ8zpiDIoJwP@172.18.0.2', __dirname);

logger.info('Hej, nu testar vi lite').then(() => {
  process.exit(0);
}, () => {
  process.exit(1);
});
