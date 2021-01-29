'use strict';
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const path = require('path');

module.exports = {
  experimental: {
    newExternals: true,
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
    paths.appServerJs = path.join(paths.appPath, 'src/server');
    paths.appServerIndexJs = path.join(paths.appPath, 'src');
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

      config.optimization = {
        moduleIds: 'size',
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
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
      config.devServer.public = 'https://overdoll.test';
      config.devServer.host = 'overdoll.test';
      config.devServer.hot = true;
    }

    return config;
  },
};
