async function router(ctx, next) {
  await next();
  const { path, method } = ctx;
  if (/^\/file\/.+/.test(path) && method === 'GET') {
    ctx.body = `get file: ${path}`;
  } else if (/^\/data\/.+/.test(path) && method === 'GET') {
    ctx.body = `get data: ${path}`;
  } else {
    ctx.body = 'error!';
  }
}

module.exports = router;
