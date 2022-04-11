const push = require('./push-queries')
const fs = require('fs')

function * entries (obj) {
  for (const key in obj) {
    yield [key, obj[key]]
  }
}

const queryMap = new Map(entries(JSON.parse(fs.readFileSync('./src/queries.json'))))
let count = 0;

(async () => {
  for (const [key, value] of queryMap) {
    count += 1
    await push.pushSingleQuery(key, value)
  }

  console.log('pushed all queries completed: ' + count)
  process.exit(0)
})()
