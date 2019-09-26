const router = require('koa-router')()
const { login } = require('../controller/user_controller');
router.prefix('/');

router.post('/login', login);

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router;
