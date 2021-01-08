const { resolve } = require('path');

module.exports = {
  schema: resolve(__dirname, 'applications/medusa/schema/schema.graphql'),
  src: resolve(__dirname, 'applications/medusa/src'),
  persistOutput: resolve(__dirname, 'applications/hades/queries.json'),
  watch: true,
};
