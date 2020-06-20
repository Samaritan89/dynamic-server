const Server = require('../src/index');

const server = new Server({
	port: 9527,
});

server.start();
