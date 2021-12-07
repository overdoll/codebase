import { ChunkExtractor } from '@loadable/server'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import path from 'path'
import serialize from 'serialize-javascript'
import prepass from 'react-ssr-prepass'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import { createServerRouter } from '@//:modules/routing/router'
import Bootstrap from '../../../client/Bootstrap'
import createMockHistory from './Domain/createMockHistory'
import axios from 'axios'
import routes from '../../../client/routes'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import express from 'express'
import parseCookies from '../../utilities/parseCookies'

// All values listed here will be passed down to the client
// Don't include anything sensitive
// Useful for passing down runtime variables (i.e. non-sensitive API keys)
const runtime = {
  APP_VERSION: process.env.APP_VERSION
}

// Request handles a basic request and rendering all routes
async function request (req, res, next) {
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
        'Csrf-Token': req.csrfToken()
      }

      Object.entries(
        req.headers || {}
      ).forEach(([key, value]) => {
        headers[key] = value
      })

      const setCookie = res.getHeader('set-cookie')

      // on the server, we need to pass the _csrf cookie as a real cookie or else it bugs out
      if (setCookie !== undefined) {
        if (headers.cookie === undefined) {
          headers.cookie = setCookie
        } else {
          headers.cookie += ',' + setCookie
        }
      }

      const response = await axios.post(
        'http://puppy:8000/api/graphql',
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

      // forward cookies if any set-cookie is sent over
      const cookie = response.headers['set-cookie']

      if (cookie) {
        // parse set-cookie and add it to our cookies
        const cookies = parseCookies(cookie.join(','))

        cookies.forEach(({
          cookieName,
          cookieValue,
          options
        }) => {
          res.cookie(cookieName, cookieValue, options)
        })
      }

      const json = response.data

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

  const context = {}

  // Create a router
  const router = await createServerRouter(
    routes,
    createMockHistory({
      context,
      location: req.url
    }),
    environment,
    req
  )

  const helmetContext = {}
  const nonce = res.locals.cspNonce

  const cache = createCache({
    key: EMOTION_CACHE_KEY,
    nonce
  })
  const { extractCritical } = createEmotionServer(cache)

  const App = (
    <Bootstrap
      environment={environment}
      i18next={req.i18n}
      emotionCache={cache}
      routerContext={router.context}
      runtimeContext={runtime}
      helmetContext={helmetContext}
      flash={req.flash}
    />
  )

  // Collect relay App data from our routes, so we have faster initial loading times.
  await prepass(App)

  // Disable caching for this page - it MUST be regenerated with each request
  res.setHeader(
    'cache-control',
    'private, no-cache, no-store, must-revalidate'
  )

  // check for another redirect, this time by the body of the whole app
  if (context.url) {
    res.redirect(301, context.url)
    return
  }

  // Get our i18next store, and we will send this to the front-end
  const initialI18nStore = {}

  req.i18n.languages.forEach(l => {
    // By passing the i18n instance to the provider above, each namespace that is requested
    // will be passed to reportNamespaces. With reportNamespaces, we filter out
    // our cached data and make sure that we give the user all the namespaces that were requested
    const languageData = req.i18n.services.resourceStore.data[l]

    // reportNamespaces may be undefined (namespaces weren't used in a route) so we check for that here
    if (!req.i18n.reportNamespaces) {
      initialI18nStore[l] = {}
      return
    }

    req.i18n.reportNamespaces.getUsedNamespaces().forEach(key => {
      // If the store doesn't contain key, we need to add it
      if (!Object.prototype.hasOwnProperty.call(initialI18nStore, l)) {
        initialI18nStore[l] = {}
      }

      initialI18nStore[l][key] = languageData[key]
    })
  })

  // Get any extra assets we need to load, so that we dont have to import them in-code
  const assets = router.context.get().entries.map(entry => entry.id)

  // Set up our chunk extractor, so that we can preload our resources
  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, 'loadable-stats.json'),
    entrypoints: ['client', ...assets]
  })

  const {
    html,
    css,
    ids
  } = extractCritical(
    renderToString(extractor.collectChunks(App))
  )

  res.render('index', {
    title: helmetContext.helmet.title.toString(),
    meta: helmetContext.helmet.meta.toString(),
    link: helmetContext.helmet.link.toString(),
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
    i18nextStore: serialize(initialI18nStore),
    flashStore: serialize(req.flash.flush()),
    i18nextLang: req.i18n.language
  })
}

const router = express.Router()

// render function
// all routes
router.get('/*', async function render (req, res, next) {
  try {
    await request(req, res, next)
  } catch (e) {
    next(e)
  }
})

export default router
