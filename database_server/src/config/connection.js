import mongoose from 'mongoose';
import logs from './log';

const mongoDB = 'mongodb://mongo/kiddolab';

export default () => mongoose.connect(mongoDB, (err) => {
  if (err) logs.error('error on connect', err);
  logs.success('connect to mongodb with success!');
});


mongoose.Promise = global.Promise;
