const { resolve } = require('path')

module.exports = {
  schema: resolve(__dirname, 'schema/schema.graphql'),
  src: resolve(__dirname, 'src'),
  persistOutput: resolve(
    __dirname,
    'src/server/queries.json'
  ),
  watch: true,
  language: 'typescript',
  artifactDirectory: resolve(
    __dirname,
    'src/__generated__'
  ),
  customScalars: {
    URI: 'string',
    BCP47: 'string'
  }
}
