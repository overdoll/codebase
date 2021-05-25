const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@//:modules': path.resolve(__dirname, 'src/modules'),
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__'),
      '@//:types': path.resolve(__dirname, 'src/types/custom')
    }
  }
}
