import mongoose from 'mongoose';
import logs from './log';

const mongoDB = 'mongodb://127.0.0.1/kiddolab';

export default () => mongoose.connect(mongoDB, (err) => {
  if (err) logs.error('error on connect', err);
  logs.success('connect to mongodb with success!');
});


mongoose.Promise = global.Promise;
