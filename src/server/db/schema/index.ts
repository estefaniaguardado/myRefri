import path from 'path';
import fs from 'fs';
import { db } from '../connector';

async function restoreDatabase() {
  const createSql = fs.readFileSync(path.join(__dirname, './create.sql'), 'utf-8');
  const dropSql = fs.readFileSync(path.join(__dirname, './drop.sql'), 'utf-8');

  try {
    await db.none(dropSql);
    await db.none(createSql);

    console.log('Create schema');
  } catch (error) {
    console.error(error);
  }
}

restoreDatabase();
