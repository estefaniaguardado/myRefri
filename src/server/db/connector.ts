import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER || 'postgres',
  host: 'localhost',
  database: process.env.USER || 'postgres',
  password: '12345',
  port: 5432,
});

pool.connect();

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

export default pool;
