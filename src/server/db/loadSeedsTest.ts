// tslint:disable:max-line-length

import path from 'path';
import fs from 'fs';
import { db } from './connector';
import logger from '../logger';

const log = logger('loadSeedsTest');

async function loadSeeds() {
  const seedsSql = fs.readFileSync(path.join(__dirname, './seedsTest.sql'), 'utf-8');

  try {
    log.info('Loaded data');

    await db.none(seedsSql);
  } catch (error) {
    log.error('ERROR_LOADING_SEEDS', error);
  }
}

loadSeeds();
