const userBll = require('../lib/bll/user_bll');
const UserModel = require('../lib/model/user_model');

async function login(ctx) {
  const username = ctx.request.body['username'];
  const password = ctx. request.body['password'];
  console.log(username);
  console.log(password);
  
  userBll.getUserInfoByUserName(username, password).then((res) => {
    console.log(res);
  });
  
  
}

module.exports = {
  login
}