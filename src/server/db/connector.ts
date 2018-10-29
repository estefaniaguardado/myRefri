import pgPromise from 'pg-promise';
import config from '../../config';

const initOptions = {
  connect(client) {
    const cp = client.connectionParameters;
    console.log('Connected to database:', cp.database);
  },
};

const pgp = pgPromise(initOptions);
const database = config('database');
export const db = pgp(database);
