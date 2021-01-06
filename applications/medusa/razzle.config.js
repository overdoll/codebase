'use strict';
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
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

    config.resolve.alias = {
      '@//:modules': path.resolve(__dirname, 'src/modules'),
    };

    if (opts.env.target === 'web') {
      const filename = path.resolve(__dirname, 'build');

      config.output.filename = opts.env.dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';

      config.entry.vendor = [
        require.resolve('react'),
        require.resolve('react-dom'),
        // ... add any other vendor packages with require.resolve('xxx')
      ];

      config.optimization = {
        splitChunks: {
          // Chunk splitting optimiztion
          chunks: 'all',
          // Switch off name generation, otherwise files would be invalidated
          // when more chunks with the same vendors are added
          name: false,
        },
      };

      // saving stats file to build folder
      // without this, stats files will go into
      // build/public folder
      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      );

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
