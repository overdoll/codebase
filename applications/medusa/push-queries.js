const Redis = require('ioredis')

require('dotenv').config()

console.log(process.env.REDIS_HOST)

const client = new Redis(6379, process.env.REDIS_HOST, { db: 2 })

client.on('error', function (error) {
  console.error(error)
})

async function pushSingleQuery (queryId, queryText) {
  await client.set('query:' + queryId, queryText)
  console.log('pushed query with id: ' + queryId)
}

module.exports = {
  pushSingleQuery
}
