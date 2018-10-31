import path from 'path';
import fs from 'fs';
import { db } from '../connector';
import logger from '../../logger';

const log = logger('schema');

async function restoreDatabase() {
  const createSql = fs.readFileSync(path.join(__dirname, './create.sql'), 'utf-8');
  const dropSql = fs.readFileSync(path.join(__dirname, './drop.sql'), 'utf-8');

  try {
    log.info('Drop schema');
    await db.none(dropSql);

    log.info('Create schema');
    await db.none(createSql);
  } catch (error) {
    log.error('ERROR_RESTORING_DATABASE', error);
  }
}

restoreDatabase();
