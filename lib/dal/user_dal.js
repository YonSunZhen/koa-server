const dbHelper = require('../../initSQL/dbHelper');

async function getUserInfoByUserName (username) {
  const sqlStr = 'select * from user_info where username=?';
  const sqlParmas = username;
  return await dbHelper.query(sqlStr, sqlParmas);
}

module.exports = {
  getUserInfoByUserName
}