import express from 'express';

// cache env # https://github.com/nodejs/node/issues/3104
process.env = JSON.parse(JSON.stringify(process.env));

// Unhandled errors && exceptions should crash the process (if some graph services are unavailable, we sometimes get into an undefined state)
process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at ', promise);
  process.exit(1);
});

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = 8080;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
