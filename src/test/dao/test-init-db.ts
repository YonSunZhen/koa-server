import { test_dao } from './test-dao';

export async function initDb() {
  await test_dao.ensure();
}