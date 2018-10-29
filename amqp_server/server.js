import jobManager from './src/tasks/jobs';
import logs from './src/config/log';

logs.success('server started');


jobManager();
