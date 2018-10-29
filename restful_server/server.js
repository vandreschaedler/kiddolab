import express from 'express';
import configExpress from './src/config/express';
import logs from './src/config/log';

const app = express();

configExpress(app);

app.listen(3002, () => {
  logs.success('Server started with success!!');
});
