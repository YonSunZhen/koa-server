const userDal = require('../dal/user_dal');
const handleData = require('../../core/utils/handleData');

async function getUserInfoByUserName (username) {
  const dbData = await userDal.getUserInfoByUserName(username);
  return handleData.getFirstRow(dbData);
}

module.exports = {
  getUserInfoByUserName
}