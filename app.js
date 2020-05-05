const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json'); // 输出json格式
const onerror = require('koa-onerror'); // 监控错误
const bodyparser = require('koa-bodyparser'); // body解析器
const logger = require('koa-logger'); // 打印每一次接口请求响应时间


const index = require('./routes/index');
const users = require('./routes/users');

const {
  koaCors
} = require('./middlewares');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'] // body解析器解析的类型(解析http请求的的数据)
})) 
app.use(koaCors); // 跨域
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})


// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
