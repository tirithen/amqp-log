# amqp-log - An npm package to send log messages with ActiveMQ and the amqp protocol

This package are meant to be used together with the docker image https://hub.docker.com/tirithen/amqp-log-printer.

Whenever writing a Node.js docker container service for an ActiveMQ system together with amqp-log-printer, import and use this logger as in the usage example below.

## Usage example

    // Import the constructor
    const AMQPLog = require('amqp-log');

    // Logger without package information
    const logger = new AMQPLog('amqp://user:password@host');

    // Logging examples
    logger.info('Logging on info level');
    logger.warning('Logging on warning level');
    logger.error('Logging on error level');
    logger.info({ log: with: { object: 'tada! :)' } });

    // Logger with package information, supply the path to the directory with
    // the logging package package.json file to use that info in the log message
    const logger2 = new AMQPLog('amqp://user:password@host', \_\_dirname || pathToPackageThatLogs);

## docker-compose.yml - And usage with docker

The docker-compose.yml file is an example of a docker container system setup with amqp-log-printer (that prints logs sent by this package) and a ActiveMQ instance that handles all the amqp messages.

To try this out run docker-compose.yml with:

    $ docker-compose up

While waiting for the containers to start. Modify the host to whatever ip address the activemq service got in test.js and run it, that should produce a printed log like:

    name of the container                                   package name    level
            ⇓                                                    ⇓            ⇓
    amqp-log-printer_1            | 2016-10-08T10:02:54.676Z amqp-log 0.1.0 info Hej, nu testar vi lite
                                            ⇑                           ⇑                  ⇑
                                       date of log               package version      log message
