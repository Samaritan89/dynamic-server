const Router = require('./util/router');

const router = new Router();

router
  .get(/^\/file\/.+/, async (ctx, next) => {
    await next();
    const { path } = ctx;
    ctx.body = `get file: ${path}`;
  })
  .get(/^\/data\/.+/, async (ctx, next) => {
    await next();
    const { path } = ctx;
    ctx.body = `get data: ${path}`;
  })
  .get(/.*/, async (ctx, next) => {
    await next();
    const { path } = ctx;
    ctx.body = `error: ${path}`;
  });

module.exports = router.routes();
