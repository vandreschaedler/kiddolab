import amqp from 'amqplib/callback_api';
import logs from '../config/log';

function connectToServer() {
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://localhost', (err, conn) => {
      if (err) {
        logs.error(`Error on connect AMQP server => ${err}`);
        reject(err);
      } else {
        logs.success('AMQP server connected');
        resolve(conn);
      }
    });
  });
}

function createChannel(conn) {
  return new Promise((resolve, reject) => {
    conn.createChannel((err, ch) => {
      if (err) {
        logs.error(`Error on create channel => ${err}`);
        reject(err);
      } else {
        logs.success('Channel on AMQP server created');
        resolve({
          channel: ch,
          conn,
        });
      }
    });
  });
}

function sendToQueue(info, languages) {
  const q = 'languages';
  info.channel.assertQueue(q, { durable: false });

  languages.forEach((language) => {
    info.channel.sendToQueue(q, Buffer.from(JSON.stringify(language)));
  });

  logs.success('Message sent!');
  return new Promise(resolve => resolve(info.conn));
}

export default (data) => {
  logs.info('Connecting on AMQP server...');
  return connectToServer()
    .then(createChannel)
    .then(info => sendToQueue(info, data))
    .catch((err) => {
      logs.error(`Error on process queue => ${err}`);
      return err;
    })
    .then((conn) => {
      setTimeout(() => {
        conn.close();
      });
    });
};
