import { ChunkExtractor } from '@loadable/server'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import path from 'path'
import serialize from 'serialize-javascript'
import prepass from 'react-ssr-prepass'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import { createServerRouter, StaticContext } from '@//:modules/routing/router'
import Bootstrap from '../../../client/Bootstrap'
import createMockHistory from './Domain/createMockHistory'
import axios from 'axios'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import express from 'express'
import parseCookies from './Domain/parseCookies'
import { HelmetData } from 'react-helmet-async'
import { setupI18n } from '@lingui/core'
import * as plurals from 'make-plural'
import routes from '../../../client/routes'

interface Helmet {
  helmet?: HelmetData
}

// All values listed here will be passed down to the client
// Don't include anything sensitive
// Useful for passing down runtime variables (i.e. non-sensitive API keys)
const runtime = {
  APP_VERSION: process.env.APP_VERSION
}

// Request handles a basic request and rendering all routes
async function request (req, res): Promise<void> {
  // Set up relay environment
  const environment = new Environment({
    // We could execute the schema locally, but we want same request patterns on the server as it was
    // on the client, and puppy sets up some special stuff that needs to be proxied before graphql calls can actually happen
    // essentially, we want to replicate the same conditions on the client as on the server
    // eventually, the graphql gateway is gonna be moved to it's own service so its helpful to be ready for that here
    network: Network.create(async function (params, variables) {
      const headers = {
        // add CSRF token since its added by client
        'Content-Type': 'application/json',
        'Csrf-Token': req.csrfToken(),
        cookie: ''
      }

      Object.entries(
        req.headers ?? {}
      ).forEach(([key, value]) => {
        headers[key] = value
      })

      // on the server, we need to pass the _csrf cookie as a real cookie or else it bugs out

      const setCookie = res
        .getHeader('set-cookie')

      if (setCookie != null) {
        setCookie
          .forEach((setCookie) => {
            parseCookies(setCookie)
              .forEach((ck) => {
                if (ck.cookieName === '_csrf') {
                  const actualCookie = '_csrf=' + ck.cookieValue
                  if (headers.cookie === undefined) {
                    headers.cookie = actualCookie
                  } else {
                    headers.cookie += ';' + actualCookie
                  }
                }
              })
          })
      }

      const response = await axios.post(
        process.env.SERVER_GRAPHQL_ENDPOINT as string,
        {
          operationName: params.name,
          queryId: params.id,
          variables
        },
        {
          // forward all headers coming from client
          headers
        }
      )

      const json = response.data

      const responseSetCookie = response.headers['set-cookie']

      if (responseSetCookie != null) {
        responseSetCookie
          .forEach((setCookie) => {
            parseCookies(setCookie)
              .forEach(({
                cookieName,
                cookieValue,
                options
              }) => {
                res.cookie(cookieName, cookieValue, options)
              })
          })
      }

      // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
      // property of the response. If any exceptions occurred when processing the request,
      // throw an error to indicate to the developer what went wrong.
      if (Array.isArray(json.errors)) {
        throw new Error(JSON.stringify(json.errors))
      }

      return json
    }),
    store: new Store(new RecordSource()),
    isServer: true
  })

  const context: StaticContext = {}

  // Get any extra assets we need to load, so that we don't have to import them in-code and wait for suspense boundaries to resolve
  const loadedModules: string[] = []

  const i18n = setupI18n()
  i18n._loadLocaleData(i18n.locale, { plurals: plurals[i18n.locale] })
  req.i18n = i18n

  // Create a router
  const router = await createServerRouter(
    routes,
    createMockHistory({
      context,
      location: req.url
    }),
    environment,
    req,
    loadedModules,
    context
  )

  const helmetContext: Helmet = {}
  const nonce = res.locals.cspNonce

  const cache = createCache({
    key: EMOTION_CACHE_KEY,
    nonce
  })

  const { extractCritical } = createEmotionServer(cache)

  const App = (
    <Bootstrap
      environment={environment}
      i18n={i18n}
      emotionCache={cache}
      router={router.context}
      runtimeContext={runtime}
      helmetContext={helmetContext}
      flash={req.flash}
      cookies={req.universalCookies}
    />
  )

  // Collect relay App data from our routes, so we have faster initial loading times.
  await prepass(App)

  // Disable caching for this page - it MUST be regenerated with each request
  res.setHeader(
    'cache-control',
    'private, no-cache, no-store, must-revalidate'
  )

  if (context.status != null) {
    res.status(context.status)
  }

  // check for another redirect, this time by the body of the whole app
  if (context.url != null) {
    res.redirect(301, context.url)
    return
  }

  // Set up our chunk extractor, so that we can preload our resources
  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, 'loadable-stats.json'),
    entrypoints: ['client', ...loadedModules]
  })

  const {
    html,
    css,
    ids
  } = extractCritical(
    renderToString(extractor.collectChunks(App))
  )

  res.render('index', {
    title: helmetContext?.helmet?.title.toString(),
    meta: helmetContext?.helmet?.meta.toString(),
    link: helmetContext?.helmet?.link.toString(),
    publicPath: process.env.PUBLIC_PATH,
    scripts: extractor.getScriptTags(),
    preload: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
    nonce,
    emotionIds: ids.join(' '),
    emotionCss: css,
    html,
    csrfToken: req.csrfToken(),
    relayStore: serialize(
      environment
        .getStore()
        .getSource()
    ),
    runtimeStore: serialize(runtime),
    flashStore: serialize(req.flash.flush()),
    language: i18n._locale
  })
}

const router = express.Router()

// render function
// all routes
router
  .get('/*', function render (req, res, next) {
    request(req, res)
      .then()
      .catch(e => next(e))
  })

export default router
