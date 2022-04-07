import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import express from 'express'
import hbs from 'express-handlebars'
import session from 'express-session'
import helmet from 'helmet'
import path from 'path'
import universalCookies from 'universal-cookie-express'
import coverage from './app/coverage'
import error from './app/error'
import flash from './app/flash'
import nonce from './app/nonce'
import render from './app/render'
import version from './app/version'
import cookieConfig from './config/cookie'
import csrfConfig from './config/csrf'
import hbsConfig from './config/hbs'
import helmetConfig from './config/helmet'
import sessionCfg from './config/session'

const index = express()

// Add public routes - build folder + public folder
index.use(express.static(path.resolve(__dirname, 'public')))
index.use(express.static(path.resolve(__dirname, '../public')))

index.set('trust proxy', 1)

// handlebars engine
index.engine('hbs', hbs(hbsConfig))

// Set handlebars templating
index
  .set('views', path.join(__dirname, '../src/server/views'))
  .set('view engine', 'hbs')

// cookie-parser
index.use(cookieParser(cookieConfig))

// universal-cookies middleware for react
index.use(universalCookies())

// Generate a Nonce tag
index.use(nonce)

// helmet (security headers)
index.use(helmet(helmetConfig))

// Sessions
index.use(session(sessionCfg))

// CSRF
index.use(csrf(csrfConfig))

// Flash sessions
index.use(flash)

// add coverage endpoint if in app_debug
index.use(coverage)

// Version endpoint - used by the client to always stay up-to-date
index.use(version)

// Our entrypoint
index.use(render)

// If an error occurs in the entrypoint, this will catch it
// usually this is because a server error occurred (a service is down, etc..)
index.use(error)

export default index
