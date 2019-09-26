const URL = require('url');
/**
 * 关键点：
 * 1、如果需要支持 cookies, 
 *    Access-Control-Allow-Origin 不能设置为 *,
 *    并且 Access-Control-Allow-Credentials 需要设置为 true  
 *    (注意前端请求需要设置 withCredentials = true)
 * 2、当 method = OPTIONS 时, 属于预检(复杂请求), 当为预检时, 可以直接返回空响应体, 对应的 http 状态码为 204
 * 3、通过 Access-Control-Max-Age 可以设置预检结果的缓存, 单位(秒)
 * 4、通过 Access-Control-Allow-Headers 设置需要支持的跨域请求头
 * 5、通过 Access-Control-Allow-Methods 设置需要支持的跨域请求方法
 */
module.exports = async function (ctx, next) {
  // ctx.get('origin')在哪来的
  const origin = URL.parse(ctx.get('origin') || ctx.get('referer') || '');
  console.log(11111111111);
  console.log(ctx);
  
  if (origin.protocol && origin.host) {
    ctx.set('Access-Control-Allow-Origin', `${origin.protocol}//${origin.host}`);
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, User-Agent, Referer, Content-Type, Cache-Control,accesstoken');
    ctx.set('Access-Control-Max-Age', '86400');
    ctx.set('Access-Control-Allow-Credentials', 'true');
  }
  if (ctx.method !== 'OPTIONS') {
    await next();
  } else {
    ctx.body = '';
    ctx.status = 204;
  }
};