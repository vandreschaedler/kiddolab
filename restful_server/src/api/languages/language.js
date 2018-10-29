import express from 'express';
import axios from 'axios';
import httpResponse from '../../tools/Http/response';

const router = express.Router();

const fetch = (req, res) => axios.get('http://localhost:3000/v1/database/fetch')
  .then(info => httpResponse.successRes(res, info))
  .catch(err => httpResponse.errorRes(res, err));


router.get('/fetch', fetch);

export default (app) => {
  app.use('/v1/api', router);
};
