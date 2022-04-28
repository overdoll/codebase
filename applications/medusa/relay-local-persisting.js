const http = require('http')
const crypto = require('crypto')
const fs = require('fs')
const push = require('./push-queries')

require('dotenv').config()

function md5 (input) {
  return crypto.createHash('md5').update(input).digest('hex')
}

function * entries (obj) {
  for (const key in obj) {
    yield [key, obj[key]]
  }
}

class QueryMap {
  constructor (fileMapName) {
    this._fileMapName = fileMapName
    this._queryMap = new Map(entries(JSON.parse(fs.readFileSync(this._fileMapName))))
  }

  _flush () {
    const data = JSON.stringify(Object.fromEntries(this._queryMap))
    fs.writeFileSync(this._fileMapName, data)
  }

  saveQuery (text) {
    const id = md5(text)
    this._queryMap.set(id, text)
    this._flush()
    return id
  }
}

const queryMap = new QueryMap('./src/queries.json')

async function requestListener (req, res) {
  if (req.method === 'POST') {
    const buffers = []
    for await (const chunk of req) {
      buffers.push(chunk)
    }
    const data = Buffer.concat(buffers).toString()
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    try {
      if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
        throw new Error(
          'Only "application/x-www-form-urlencoded" requests are supported.'
        )
      }
      const text = new URLSearchParams(data).get('text')
      if (text == null) {
        throw new Error('Expected to have `text` parameter in the POST.')
      }
      const id = queryMap.saveQuery(text)
      await push.pushSingleQuery(id, text)
      res.end(JSON.stringify({ id: id }))
    } catch (e) {
      console.error(e)
      res.writeHead(400)
      res.end(`Unable to save query: ${e}.`)
    }
  } else {
    res.writeHead(400)
    res.end('Request is not supported.')
  }
}

const PORT = 2999
const server = http.createServer(requestListener)
server.listen(PORT)

console.log(`Relay persisting server listening on ${PORT} port.`)
