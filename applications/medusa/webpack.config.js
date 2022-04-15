const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@//:modules': path.resolve(__dirname, 'src/modules'),
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__'),
      '@//:types': path.resolve(__dirname, 'src/types'),
      '@//:assets': path.resolve(__dirname, 'src/assets'),
      '@//:domain': path.resolve(__dirname, 'src/domain'),
      '@//:common': path.resolve(__dirname, 'src/common')
    }
  },
  optimization: {
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  }
}
