'use strict'
const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')
const webpack = require('webpack')

const supportedLocales = require('./locales.config')
const unlikelyToChangeChunk = ['react', 'react-dom', 'react-relay', 'relay-runtime', '@lingui', 'make-plural', 'history', '@casl', 'axios']

module.exports = {
  options: {
    cssPrefix: 'assets',
    jsPrefix: 'assets',
    mediaPrefix: 'assets',
    enableReactRefresh: true
  },
  modifyPaths ({
    webpackObject, // the imported webpack node module
    options: {
      razzleOptions // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
    paths // the default paths that will be used by Razzle.
  }) {
    paths.appClientIndexJs = path.join(paths.appPath, 'src/client')
    paths.appServerJs = path.join(paths.appPath, 'src/server')
    paths.appServerIndexJs = path.join(paths.appPath, 'src')
    return paths
  },
  modifyWebpackOptions ({
    env,
    options
  }) {
    const config = options.webpackOptions
    config.stats = 'verbose'

    if (!env.dev && env.target === 'web') {
      config.fileLoaderOutputName = `${options.razzleOptions.mediaPrefix}/[name].[contenthash].[ext]`
      config.urlLoaderOutputName = `${options.razzleOptions.mediaPrefix}/[name].[contenthash].[ext]`

      config.cssOutputFilename = `${options.razzleOptions.cssPrefix}/[name].[contenthash].css`
      config.cssOutputChunkFilename = `${options.razzleOptions.cssPrefix}/[name].[contenthash].css`

      config.jsOutputFilename = `${options.razzleOptions.jsPrefix}/[name].[contenthash].js`
      config.jsOutputChunkFilename = `${options.razzleOptions.jsPrefix}/[name].[contenthash].js`
    }

    return config
  },
  modifyWebpackConfig (opts) {
    const config = opts.webpackConfig

    // config.module.rules = config.module.rules.reduce((rules, rule) => {
    //   if (rule.exclude && rule.loader.indexOf('file-loader') !== -1) {
    //     const { exclude, options, ...rest } = rule;
    //
    //     rules.push({
    //       ...rest,
    //       ...{
    //         exclude: exclude,
    //         options: {
    //           ...options,
    //           name: opts.env.dev
    //             ? 'media/[name].[ext]'
    //             : 'media/[contenthash].[ext]',
    //         },
    //       },
    //     });
    //   } else {
    //     rules.push(rule);
    //   }
    //
    //   return rules;
    // }, []);

    config.resolve.alias = {
      '@//:modules': path.resolve(__dirname, 'src/modules'),
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__'),
      '@//:assets': path.resolve(__dirname, 'src/assets'),
      '@//:types': path.resolve(__dirname, 'src/types')
    }

    if (!opts.env.dev) {
      config.cache = {
        type: 'filesystem',
        store: 'pack'
      }
    }

    if (opts.env.target === 'node') {
      if (!opts.env.dev) {
        config.externals = {}
      }
    }

    if (opts.env.target === 'web') {
      const filename = path.resolve(__dirname, 'build')

      if (opts.env.dev) {
        // config.devServer.proxy = {
        //   context: () => true,
        //   target: 'http://127.0.0.1:7999'
        // }
        config.devServer.host = 'localhost'
        config.devServer.index = ''
        config.devServer.publicPath = process.env.URL
        config.devServer.hot = true
        config.devServer.https = true
        config.devServer.port = 3001
        config.optimization = {
          moduleIds: 'size',
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all'
          }
        }
      } else {
        config.optimization = {
          // TODO: when switching to webpack 5, change to deterministic
          // cannot switch because hot reload becomes 10x slower?
          moduleIds: 'hashed',
          chunkIds: 'size',
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              bootstrap: {
                test: new RegExp(`[\\/]node_modules[\\/](${unlikelyToChangeChunk.join('|')})[\\/]`),
                name: 'bootstrap',
                chunks: 'all'
              }
            }
          }
        }
      }

      // cacheGroups: {
      //   dateFns: {
      //     test: /[\\/]node_modules[\\/](date-fns)[\\/]/,
      //       name: 'dateFns',
      //       chunks: 'all'
      //   }
      // }

      // saving stats file to build folder
      // without this, stats files will go into
      // build/public folder
      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename }
        })
      )

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /\.js\.flow|\.po|\.ts\.flow/,
          contextRegExp: /date\-fns[\/\\]/
        })
      )

      config.plugins.push(
        new webpack.ContextReplacementPlugin(/date\-fns[\/\\]/, new RegExp(`[/\\\\\](${supportedLocales.join('|')}|en-US)[/\\\\\]`))
      )

      if (process.env.ANALYZE_BUNDLE === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }

    return config
  }
}
