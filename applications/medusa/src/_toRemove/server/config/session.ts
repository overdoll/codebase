import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'
import gcm from '@//:modules/utilities/gcm'

const RedisStore = connect(session)

export default {
  store: new RedisStore({
    client: redis.createClient({
      host: process.env.REDIS_HOST,
      db: 0
    }),
    serializer: {
      parse: (string) => JSON.parse(gcm.decrypt(string, process.env.SESSION_SECRET)),
      stringify: (object) => gcm.encrypt(JSON.stringify(object), process.env.SESSION_SECRET)
    },
    prefix: 'session:'
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
