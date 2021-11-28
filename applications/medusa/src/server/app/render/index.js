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

import routes from '../../../client/routes'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import axios from 'axios'
import express from 'express'

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
    network: Network.create(async function (params, variables) {
      // call on local network
      // TODO: forward headers, and set headers on return
      const response = await axios.post(
        'http://puppy:8000/api/graphql',
        {
          operationName: params.name,
          queryId: params.id,
          variables
        },
        {}
      )

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
    csrfToken: req.csrfToken ? req.csrfToken() : null,
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
