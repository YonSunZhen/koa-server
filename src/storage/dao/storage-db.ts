import { storage_logger } from '../logger/storage-logger';
import Knex from 'knex';
import config from 'config';

export const storage_db = Knex({
  debug: true,
  client: 'mysql',
  connection: config.get('storage.db'),
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10000,

  log: {
    debug: (msg: any) => storage_logger.debug(msg),
    warn: (msg: any) => storage_logger.warn(msg),
    error: (msg: any) => storage_logger.error(msg)
  }
});