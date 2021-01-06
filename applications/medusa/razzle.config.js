'use strict';

module.exports = {
  experimental: {
    newExternals: true,
    newSplitChunks: true,
    newContentHash: true,
    newMainFields: true,
    reactRefresh: true,
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
