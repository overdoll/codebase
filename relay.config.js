const { resolve } = require('path');
const crypto = require('crypto');

module.exports = {
  schema: resolve(__dirname, 'applications/medusa/schema/schema.graphql'),
  src: resolve(__dirname, 'applications/medusa/src'),
  persistOutput: resolve(__dirname, 'applications/hades/queries.json'),
  persistFunction: function(text) {
    const hasher = crypto.createHash('sha256');
    hasher.update(text);
    const id = hasher.digest('hex');
    return Promise.resolve(id);
  },
  watch: true,
};
