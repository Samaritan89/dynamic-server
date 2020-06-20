module.exports = async function (ctx, next) {
  await next();

  const { body } = ctx;

  if (body !== null && body !== undefined) {
    if (typeof ctx.body === 'string') {
      ctx.res.end(ctx.body);
    } else {
      ctx.body.pipe(ctx.res);
    }
  }
};
