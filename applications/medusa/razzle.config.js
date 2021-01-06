'use strict';

const path = require('path');

module.exports = {
  experimental: {
    newExternals: true,
    newSplitChunks: true,
    newContentHash: true,
    newMainFields: true,
    reactRefresh: true,
  },
  modifyPaths({
    webpackObject, // the imported webpack node module
    options: {
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
    paths, // the default paths that will be used by Razzle.
  }) {
    paths.appClientIndexJs = path.join(paths.appPath, 'src/client');
    return paths;
  },
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;

    if (opts.env.target === 'web') {
      config.devServer.proxy = {
        context: () => true,
        target: 'http://localhost:8080',
      };
      config.devServer.index = '';
      config.devServer.public = 'https://projecth.test';
      config.devServer.host = 'projecth.test';
      config.devServer.hot = true;
    }

    return config;
  },
};
