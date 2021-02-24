// This mainly exists just for editor completion to work correctly

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@//:modules': path.resolve(__dirname, 'src/modules'),
      '@//:artifacts': path.resolve(__dirname, 'src/__generated__'),
    },
  },
};
