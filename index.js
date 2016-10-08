const AMQP = require('amqp10');

class AMQPLog {
  constructor(url, packageDirectory) {
    if (packageDirectory) {
      this.package = require(`${packageDirectory}/package.json`);
    }

    this.client = new AMQP.Client(AMQP.Policy.ActiveMQ);
    this.client.connect(url).then(() => {
      this.client.createSender('topic://logs').then((sender) => {
        this.sender = sender;
      });
    });

    this.client.on(AMQP.Client.ErrorReceived, error => console.error(error));
  }

  send(data, level) {
    return new Promise((resolve, reject) => {
      if (this.sender) {
        this.sender.send({
          level,
          data,
          date: Date.now(),
          package: !this.package ? undefined : {
            name: this.package.name,
            version: this.package.version
          }
        }).then(resolve, reject);
      } else {
        setTimeout(() => {
          this.send(data, level).then(resolve, reject);
        }, 10);
      }
    });
  }

  log(data, level = 'info') {
    if (Array.isArray(data) && data.length === 1) {
      return this.send(data[0], level);
    }

    return this.send(data, level);
  }

  debug(...data) {
    return this.log(data, 'debug');
  }

  info(...data) {
    return this.log(data, 'info');
  }

  warn(...data) {
    return this.warning(...data);
  }

  warning(...data) {
    return this.log(data, 'info');
  }

  error(...data) {
    return this.log(data, 'info');
  }
}

module.exports = AMQPLog;
