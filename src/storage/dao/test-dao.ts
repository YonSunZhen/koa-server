import { storage_db } from './storage-db';
import { storage_logger } from '../logger/storage-logger';
import { TestDB } from './test-types';
import { DaoType } from './dao-types';
import { DataOptions, dbHelper } from './utils';

async function ensure() {
  if (!await storage_db.schema.hasTable('test')) {
    storage_logger.info('create table \'test table\' now...');
    await storage_db.schema.createTable('test', (t) => {
      t.charset('utf8mb4');
      t.increments('id').primary().notNullable().comment('id');
      t.integer('name', 1).defaultTo(1).comment('name');
    })
      .catch((err) => storage_logger.error(err));
  }
}

async function insert(test: TestDB): Promise<number>{
  await ensure();
  const result = await storage_db.table('test')
    .insert<TestDB>(test)
    .catch((err) => storage_logger.error(err));
  return result[0]; // 自定义id添加成功返回0 || 自增id添加成功返回增加的id
}

async function getTest (options: DaoType<TestDB> = {}): Promise<TestDB[]> {
  const _model = DataOptions(options.model);
  let result = storage_db('test').where(_model);
  result = dbHelper.handlePaging(result, options.pageNo, options.pageSize);
  result.catch((err) => storage_logger.error(err));
  return result;
}



export const test_dao = {
  ensure,
  insert,
  getTest
};