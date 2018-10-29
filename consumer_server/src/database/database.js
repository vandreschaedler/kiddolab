import axios from 'axios';
import logs from '../config/log';

export default (data) => {
  logs.warn('Inserting on databse');
  axios.post('http://localhost:3000/v1/database/insert', data);
};
