import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'
import uid from 'uid-safe'

const RedisStore = connect(session)

export default {
  store: new RedisStore({
    client: redis.createClient({ host: process.env.REDIS_URL, db: 0 })
  }),
  genid: (req) => {
    // Match method in express-session
    // See https://github.com/expressjs/session/blob/v1.15.6/index.js#L502
    let id = uid.sync(24)
    if (req.accountId) {
      id += `:${req.accountId}`
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
