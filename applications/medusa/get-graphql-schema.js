const fs = require('fs')
const cli = require('@graphql-codegen/cli')
const path = require('path')
const Cookie = require('cookie')
const _crypto = require('crypto')

require('dotenv').config()

// a custom graphql fetcher that implements CSRF, so we can have CSRF always enabled
async function generate () {
  const token = _crypto.randomBytes(64).toString('hex')

  const iv = _crypto.randomBytes(12)
  const cipher = _crypto.createCipheriv('aes-256-gcm', process.env.SECURITY_SECRET, iv)
  const encrypted = Buffer.concat([iv, cipher.update(token), cipher.final(), cipher.getAuthTag()]).toString(
    'hex'
  )

  const output = await cli.generate(
    {
      schema: {
        [process.env.APP_URL + '/api/graphql']: {
          headers: {
            'X-overdoll-Security': token,
            Cookie: Cookie.serialize('od.security', encrypted)
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
