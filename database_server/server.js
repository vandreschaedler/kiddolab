import express from 'express';
import configExpress from './src/config/express';
import logs from './src/config/log';
import database from './src/config/connection';

database();

const app = express();

configExpress(app);

app.listen(3003, () => {
  logs.success('Server started with success!!');
});
