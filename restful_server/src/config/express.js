import path from 'path';
import glob from 'glob';
import bodyParser from 'body-parser';
// import logs from './log';

export default (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    req.headers['if-none-match'] = 'no-match-for-this';
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Access-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  const apis = glob.sync(`${path.normalize(`${__dirname}/..`)}/api/**/*.js`, {
    ignore: [
      `${path.normalize(`${__dirname}/..`)}/api/crawler/crawler.js`,
    ],
  });

  apis.forEach((apiPath) => {
    const api = require(apiPath);
    api.default(app);
  });
};
