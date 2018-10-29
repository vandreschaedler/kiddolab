import fs from 'fs';
import path from 'path';
import cron from 'node-schedule';
import csv from 'csvtojson';
import logs from '../config/log';
import amqp from '../amqp/sender';

const EVERY_MINUTE = '*/30 * * * * *';

const getDataFromFiles = (files) => {
  function deleteFile(file) {
    logs.warn('Deleting .csv file...');

    fs.unlink(file, (err) => {
      if (err) {
        logs.error(`Error on deleting file => ${err}`);
      } else {
        logs.success('File deleted!');
      }
    });
  }

  const dirPath = `${path.normalize(`${__dirname}/../../charges`)}`;
  files.forEach((file) => {
    if (path.extname(`${dirPath}/${file}`) === '.csv') {
      logs.info(`Reading file ${file}`);
      const filePath = `${dirPath}/${file}`;
      csv()
        .fromFile(filePath)
        .then(amqp)
        .then(() => deleteFile(filePath))
        .catch(err => logs.error(err));
    }
  });
};

const getDataFromDirectory = () => {
  logs.info('Starting getting data from files!');
  const dirPath = `${path.normalize(`${__dirname}/../../charges`)}`;
  fs.readdir(dirPath, (err, files) => {
    if (files.length) {
      getDataFromFiles(files);
    } else {
      logs.warn(`There is no data on directory ${dirPath}`);
    }
  });
};


export default () => {
  cron.scheduleJob(EVERY_MINUTE, getDataFromDirectory);
};
