import amqp from 'amqplib/callback_api';
import logs from '../config/log';
import database from '../database/database';

const receivedData = [];

function connectToServer() {
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://rabbitmq', (err, conn) => {
      if (err) {
        logs.error(`Error on connect Consumer server => ${err}`);
        reject(err);
      } else {
        logs.success('Consumer server connected');
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
        logs.success('Channel on Consumer server created');
        resolve({
          channel: ch,
          conn,
        });
      }
    });
  });
}

function getFromQueue(info) {
  const q = 'languages';
  let total = 0;

  info.channel.assertQueue(q, { durable: false });
  logs.info('Waiting for messages in languages queue. To exit press CTRL+C');

  info.channel.checkQueue(q, (err, infos) => {
    total = infos.messageCount;
  });

  info.channel.consume(q, (msg) => {
    receivedData.push(JSON.parse(msg.content.toString()));
    if (receivedData.length === total) {
      database(receivedData);
    }
  }, { noAck: true });
}

export default () => {
  logs.info('Connecting on Consumer server to receive...');
  return connectToServer()
    .then(createChannel)
    .then(getFromQueue)
    .catch((err) => {
      logs.error(`Error on process queue => ${err}`);
      return err;
    });
};
