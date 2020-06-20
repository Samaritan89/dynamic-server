const http = require('http');

const compose = require('./util/compose');
const routes = require('./route');
const body = require('./middleware/body');

const defaultConf = require('./config');

class Server {
  constructor(options = {}) {
    this.config = Object.assign(defaultConf, options);
  }

  start() {
    const { port } = this.config;

    this.server = http.createServer((req, res) => {
      const { url, method } = req;

      // 准备中间件的执行环境
      const ctx = {
        req,
        res,
        config: this.config,
        path: url,
        method,
      };

      // 按顺序调用中间件
      compose([body].concat(routes))(ctx);
    }).listen(port, () => {
      console.log(`Dynamic server started at port ${port}`);
    });
  }

  stop() {
    this.server.close(() => {
      console.log(`Dynamic server closed.`);
    });
  }
}

module.exports = Server;
