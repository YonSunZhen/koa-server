import { test_logger } from '../logger/test-logger';
import Knex from 'knex';
import config from 'config';

export const test_db = Knex({
  debug: true,
  client: 'mysql',
  connection: config.get('test.db'),
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10000,

  log: {
    debug: (msg: any) => test_logger.debug(msg),
    warn: (msg: any) => test_logger.warn(msg),
    error: (msg: any) => test_logger.error(msg)
  }
});