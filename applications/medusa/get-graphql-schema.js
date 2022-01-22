const fs = require('fs')
const cli = require('@graphql-codegen/cli')
const path = require('path')
const Cookie = require('cookie')
const Tokens = require('csrf')
const sign = require('cookie-signature').sign

require('dotenv').config()

// a custom graphql fetcher that implements CSRF, so we can have CSRF always enabled
async function generate () {
  const tokens = new Tokens()

  const secret = tokens.secretSync()

  const token = tokens.create(secret)

  const val = 's:' + sign(secret, process.env.SESSION_SECRET)

  const output = await cli.generate(
    {
      schema: {
        [process.env.URL + '/api/graphql']: {
          headers: {
            'x-csrf-token': token,
            Cookie: Cookie.serialize('_csrf', val)
          }
        }
      },
      generates: {
        [process.cwd() + '/schema/schema.graphql']: {
          plugins: ['schema-ast']
        }
      }
    },
    true
  )

  output.forEach(f => {
    fs.writeFile(path.join(__dirname, './schema/schema.graphql'), f.content, () => {
      console.log('Outputs generated!')
    })
  })
}

generate()
