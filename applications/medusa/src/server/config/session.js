import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'

const RedisStore = connect(session)

export default {
  store: new RedisStore({
    client: redis.createClient({ host: process.env.REDIS_URL, db: 0 })
  }),
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
