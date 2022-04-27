const { resolve } = require('path')

module.exports = {
  schema: resolve(__dirname, 'schema/schema.graphql'),
  schemaExtensions: [resolve(__dirname, 'schema/extensions')],
  src: resolve(__dirname, 'src'),
  language: 'typescript',
  excludes: ['**/.next/**', '**/node_modules/**', '**/schema/**'],
  artifactDirectory: resolve(
    __dirname,
    'src/__generated__'
  ),
  customScalars: {
    URI: 'string',
    BCP47: 'string'
  },
  persistConfig: {
    url: 'http://localhost:2999',
    params: {}
  }
}
