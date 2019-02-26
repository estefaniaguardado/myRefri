import pgPromise from 'pg-promise';
import config from '../../config';
import logger from '../logger';

const log = logger('connector');

const initOptions = {
  connect(client) {
    const cp = client.connectionParameters;
    log.info('Connected to database...');
  },
  query(e) {
    log.info(e.query);
  },
  error(error, e) {
    if (e.cn) {
      log.error('Error connection database', { error });
    }
  },
};

const pgp = pgPromise(initOptions);
const database = config('POSTGRES_URL');
export const db = pgp(database);
