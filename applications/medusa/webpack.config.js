const path = require('path')
// NOTE: this webpack config is for editor integration only! please edit the webpack configuration inside of next.config.js!
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
  }
}
// NOTE: this webpack config is for editor integration only! please edit the webpack configuration inside of next.config.js!
