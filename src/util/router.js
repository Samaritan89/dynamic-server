class Router {
  constructor() {
    const methods = ['get', 'post'];

    this.stack = {};

    methods.forEach(method => {
      // router.get(path, middleware), router.post(path, middleware)
      // router.register(path, method, middleware) 快捷方式
      Router.prototype[method] = function (path, middleware) {
        this.register(path, method, middleware);

        // 支持链式调用
        return this;
      };

      // 每种方法单独维护一个数组，提升路由匹配性能
      this.stack[method] = [];
    });
  }

  register(path, method, middleware) {
    this.stack[method].push({
      path,
      middleware,
    });
  }

  routes() {
    const stack = this.stack;
    return async function (ctx, next) {
      const middlewareList = stack[ctx.method.toLowerCase()];

      let targetMiddleware;

      for (let i = 0; i < middlewareList.length; i++) {
        const { path, middleware } = middlewareList[i];
        // 忽略了 url 参数等影响
        const isPathMatch = path instanceof RegExp ? path.test(ctx.path) : path === ctx.path;

        if (isPathMatch) {
          targetMiddleware = middleware;
          // 使用匹配到的第一个路由，不再继续尝试
          break;
        }
      }

      if (targetMiddleware) {
        await targetMiddleware(ctx, next);
      } else {
        await next();
      }
    }
  }
}

module.exports = Router;
