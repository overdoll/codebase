const { resolve } = require('path')

module.exports = {
  schema: resolve(__dirname, 'schema/schema.graphql'),
  src: resolve(__dirname, 'src'),
  // persistOutput: resolve(
  //   __dirname,
  //   '../puppy/queries.json'
  // ),
  watch: true,
  language: 'js-flow-uncommented',
  artifactDirectory: resolve(
    __dirname,
    'src/__generated__'
  )
}
