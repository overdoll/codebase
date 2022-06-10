const Redis = require('ioredis')
const path = require('path')

if (process.env.BUILDKITE_BUILD_ID != null) {
  // load CI .env.ci when in CI
  require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.ci')
  })
} else if (process.env.NODE_ENV !== 'production') {
  // load local .env
  require('dotenv').config()
}

const client = new Redis(6379, process.env.REDIS_HOST, { db: 2 })

client.on('error', function (error) {
  console.error(error)
  process.exit(1)
})

async function pushSingleQuery (queryId, queryText) {
  await client.set('query:' + queryId, queryText)
  console.log('pushed query with id: ' + queryId)
}

module.exports = {
  pushSingleQuery
}
