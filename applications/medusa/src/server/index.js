import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import i18nextMiddleware from 'i18next-http-middleware'
import i18next from './config/i18next'
import session from 'express-session'
import sessionCfg from './config/session'
import version from './app/version'
import hbs from 'express-handlebars'
import helmet from 'helmet'
import nonce from './app/nonce'
import hbsConfig from './config/hbs'
import coverage from './app/coverage'
import csrfConfig from './config/csrf'
import flash from './app/flash'
import helmetConfig from './config/helmet'
import graphql from './app/graphql'
import cookieConfig from './config/cookie'
import error from './app/error'
import render from './app/render'

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

// Add i18next middleware
index.use(i18nextMiddleware.handle(i18next))

// cookie-parser
index.use(cookieParser(cookieConfig))

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

// GraphQL Server
const server = graphql(index)

// Our entrypoint
index.use(render(server))

// If an error occurs in the entrypoint, this will catch it
// usually this is because a server error occurred (a service is down, etc..)
index.use(error)

export default index
