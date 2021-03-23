'use strict';
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
  experimental: {
    newExternals: true,
    reactRefresh: true,
  },
  options: {
    cssPrefix: 'css',
    jsPrefix: 'js',
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
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__'),
      '@//:types': path.resolve(__dirname, 'src/types'),
    };

    if (opts.env.target === 'node') {
      if (!opts.env.dev) {
        config.externals = {};
      }
    }

    if (opts.env.target === 'web') {
      const filename = path.resolve(__dirname, 'build');

      config.output.filename = opts.env.dev
        ? 'js/[name].js'
        : 'js/[name].[hash:8].js';

      if (opts.env.dev) {
        config.devServer.proxy = {
          context: () => true,
          target: 'http://localhost:8080',
        };

        config.devServer.index = '';
        config.devServer.public = 'https://overdoll.test';
        config.devServer.host = 'overdoll.test';
        config.devServer.hot = true;
      }

      config.optimization = {
        moduleIds: 'size',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
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

      if (process.env.ANALYZE_BUNDLE === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    }

    return config;
  },
};
