import { test_dao } from './test-dao';

async function init() {
  test_dao.ensure();
}

init();