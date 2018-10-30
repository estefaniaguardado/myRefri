// tslint:disable:max-line-length

import path from 'path';
import fs from 'fs';
import { db } from './connector';

async function loadSeeds() {
  const seedsSql = fs.readFileSync(path.join(__dirname, './seedsTest.sql'), 'utf-8');

  try {
    await db.none(seedsSql);

    console.log('Loaded data');
  } catch (error) {
    console.error(error);
  }
}

loadSeeds();
