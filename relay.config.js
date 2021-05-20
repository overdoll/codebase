const { resolve } = require('path')

module.exports = {
  schema: resolve(__dirname, 'applications/medusa/schema/schema.graphql'),
  src: resolve(__dirname, 'applications/medusa/src'),
  persistOutput: resolve(
    __dirname,
    'applications/medusa/src/server/queries.json'
  ),
  watch: true,
  language: 'js-flow-uncommented',
  artifactDirectory: resolve(__dirname, 'applications/medusa/src/__generated__')
}
