import pgPromise from 'pg-promise';

const initOptions = {
  connect(client) {
    const cp = client.connectionParameters;
    console.log('Connected to database:', cp.database);
  },
};

const config = {
  user: process.env.USER || 'postgres',
  host: 'localhost',
  database: process.env.USER || 'myRefri',
  password: '12345',
  port: 5432,
};

const pgp = pgPromise(initOptions);
const db = pgp(config);

export = db;
