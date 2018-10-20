import path from 'path';
import fs from 'fs';
import { db } from '../connector';

async function restoreDatabase() {
  const createSql = fs.readFileSync(path.join(__dirname, './create.sql'), 'utf-8');
  const dropSql = fs.readFileSync(path.join(__dirname, './drop.sql'), 'utf-8');

  try {
    console.log('Drop schema');
    await db.none(dropSql);

    console.log('Create schema');
    await db.none(createSql);
  } catch (error) {
    console.error(error);
  }
}

restoreDatabase();
