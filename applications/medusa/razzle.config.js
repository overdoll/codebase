'use strict'
const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

module.exports = {
  experimental: {
    newExternals: true,
    reactRefresh: true
  },
  options: {
    cssPrefix: 'css',
    jsPrefix: 'js'
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

    if (!env.dev) {
      config.fileLoaderOutputName = `${options.razzleOptions.mediaPrefix}/[contenthash].[ext]`
      config.urlLoaderOutputName = `${options.razzleOptions.mediaPrefix}/[contenthash].[ext]`

      config.cssOutputFilename = `${options.razzleOptions.cssPrefix}/[contenthash].css`
      config.cssOutputChunkFilename = `${options.razzleOptions.cssPrefix}/[contenthash].chunk.css`

      config.jsOutputFilename = `${options.razzleOptions.jsPrefix}/[contenthash].js`
      config.jsOutputChunkFilename = `${options.razzleOptions.jsPrefix}/[contenthash].chunk.js`
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
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__')
    }

    if (opts.env.target === 'node') {
      if (!opts.env.dev) {
        config.externals = {}
      }
    }

    if (opts.env.target === 'web') {
      const filename = path.resolve(__dirname, 'build')

      if (!opts.env.dev) {
        config.output.filename = 'js/[contenthash].js'
        config.output.chunkFilename = 'js/[contenthash].js'
      }

      if (opts.env.dev) {
        config.devServer.proxy = {
          context: () => true,
          target: 'http://localhost:8080'
        }

        config.devServer.index = ''
        config.devServer.public = process.env.URL
        config.devServer.hot = true
      }

      config.optimization = {
        moduleIds: 'size',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all'
        }
      }

      // saving stats file to build folder
      // without this, stats files will go into
      // build/public folder
      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename }
        })
      )

      if (process.env.ANALYZE_BUNDLE === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }

    return config
  }
}
