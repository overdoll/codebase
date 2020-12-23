const chokidar = require('chokidar');
const config = require('./webpack.config');
const express = require('express');
const http = require('http');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(config);
const app = express();

// Serve hot-reloading bundle to client
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
  }),
);
app.use(webpackHotMiddleware(compiler));

// Include server routes as a middleware
app.use(require('./server/index'));

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('./server');

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log('Clearing /server/ module cache from server');
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

const server = http.createServer(app);
server.listen(8080, '0.0.0.0', function(err) {
  if (err) throw err;

  const addr = server.address();

  console.log('Listening at http://%s:%d', addr.address, addr.port);
});
