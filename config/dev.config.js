const { MARIADBPWD } = require('./variate');
// 本地开发版
module.exports = {
  mariadb: {
    host: 'localhost',
    user: 'root',
    password: MARIADBPWD,
    database: 'wxappdb'
  },
  dfs: {
    assetUrlBase: 'http://10.219.107.250:8082/repository/wxapp-upload',
    host: 'http://10.219.107.250:8082',
    baseUrl: '/service/rest/v1',
    account: {
      user: 'admin',
      pass: 'simple'
    }
  }
};