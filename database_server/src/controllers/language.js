import express from 'express';
import httpResponse from '../tools/Http/response';
import Language from '../models/Language';
import logs from '../config/log';

const router = express.Router();

const fetch = (req, res) => {
  logs.info('Fetching data');
  return Language.find()
    .then(languages => httpResponse.successRes(res, languages))
    .catch(err => httpResponse.errorRes(res, err));
};

const insert = (req, res) => Language.create(req.body)
  .then(language => httpResponse.successRes(res, language))
  .catch(err => httpResponse.errorRes(res, err));

const update = (req, res) => Language.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(language => httpResponse.successRes(res, language))
  .catch(err => httpResponse.errorRes(res, err));

const remove = (req, res) => {
  Language.findByIdAndRemove(req.params.id, req.body)
    .then(language => httpResponse.successRes(res, language))
    .catch(err => httpResponse.errorRes(res, err));
};

const get = (req, res) => Language.findById(req.params.id)
  .then(languages => httpResponse.successRes(res, languages))
  .catch(err => httpResponse.errorRes(res, err));

router.get('/fetch', fetch);
router.post('/insert', insert);
router.put('/update/:id', update);
router.delete('/remove/:id', remove);
router.get('/get/:id', get);

export default (app) => {
  app.use('/v1/database', router);
};
