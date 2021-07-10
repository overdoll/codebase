import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'
import uid from 'uid-safe'
import gcm from '../utilities/gcm'

const RedisStore = connect(session)

export default {
  store: new RedisStore({
    client: redis.createClient({ host: process.env.REDIS_URL, db: 0 }),
    serializer: {
      parse: (string) => JSON.parse(gcm.decrypt(string, Buffer.from(process.env.SESSION_SECRET, 'base64'))),
      stringify: (object) => gcm.encrypt(JSON.stringify(object), Buffer.from(process.env.SESSION_SECRET, 'base64'))
    },
    prefix: 'session:'
  }),
  genid: (req) => {
    // Match method in express-session
    // See https://github.com/expressjs/session/blob/v1.15.6/index.js#L502
    let id = uid.sync(24)
    if (req.accountId) {
      id += `:account:${req.accountId}`
    }
    return id
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 28800000,
    signed: true
  }
}
