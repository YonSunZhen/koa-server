:: 启动开发版
set PORT=8085
:: 数据库密码
set DB_PASSWORD=xxxx
npm run start:dev

set NODE_CONFIG={"test":{"db":{"password":"root"}}}
npm run start:dev
