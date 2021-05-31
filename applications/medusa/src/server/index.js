import express from 'express'
import path from 'path'
import entry from './routes/entry'
import middleware from './middleware'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import i18nextMiddleware from 'i18next-http-middleware'
import i18next from './utilities/i18next'
import graphql from './routes/graphql'
import { matchQueryMiddleware } from 'relay-compiler-plus'
import queryMapJson from './queries.json'
import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'
import sessionCfg from './config/session'
import version from './routes/version'
import hbs from 'express-handlebars'
import coverage from './routes/coverage'

const index = express()

// Add public routes - build folder + public folder
index.use(express.static(path.resolve(__dirname, 'public')))
index.use(express.static(path.resolve(__dirname, '../public')))

index.set('trust proxy', 1)

// handlebars engine
index.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default'
}))

// Set handlebars templating
index
  .set('views', path.join(__dirname, '../src/server/views'))
  .set('view engine', 'hbs')

// Add i18next middleware
index.use(i18nextMiddleware.handle(i18next))

// cookie-parser
index.use(cookieParser(process.env.SESSION_SECRET))

// Generate a Nonce tag
index.use(middleware.nonce)

// helmet (security headers)
index.use(middleware.helmet)

const RedisStore = connect(session)

// Sessions
index.use(
  session({
    store: new RedisStore({
      client: redis.createClient({ host: process.env.REDIS_URL, db: 1 })
    }),
    ...sessionCfg
  })
)

// CSRF
index.use(
  csrf({
    cookie: {
      secure: true,
      httpOnly: true,
      signed: true
    }
  })
)

// Flash sessions
index.use(middleware.flash())

// add coverage endpoint if in app_debug
if (process.env.APP_DEBUG) {
  index.get('/__coverage__', coverage)
}

// Version endpoint - used by the client to always stay up-to-date
index.get('/api/version', version)

// GraphQL Server
const server = graphql({
  path: '/api/graphql',
  app: index.use(matchQueryMiddleware(queryMapJson))
})

// Our entrypoint
index.get('/*', entry(server))

// If an error occurs in the entrypoint, this will catch it
// usually this is because a server error occurred (a service is down, etc..)
index.use(middleware.error())

export default index
