import { ChunkExtractor } from '@loadable/server'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { fetchQuery, RelayEnvironmentProvider } from 'react-relay/hooks'
import path from 'path'
import serialize from 'serialize-javascript'
import prepass from 'react-ssr-prepass'
import { HelmetProvider } from 'react-helmet-async'

import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import queryMapJson from '../queries.json'

import { QueryParamProvider } from 'use-query-params'
import { ChakraProvider } from '@chakra-ui/react'
import { createServerRouter } from '@//:modules/routing/router'
import createMockHistory from '@//:modules/routing/createMockHistory'
import CompatibilityRoute from '@//:modules/routing/CompatibilityRoute'
import RoutingContext from '@//:modules/routing/RoutingContext'
import RouteRenderer from '@//:modules/routing/RouteRenderer'
import routes from '../../client/routes'
import theme from '@//:modules/theme'
import { FlashProvider } from '@//:modules/flash'
import { I18nextProvider } from 'react-i18next'

const entry = (apollo) => {
  return async function (req, res, next) {
    try {
      // Set up relay environment
      const environment = new Environment({
        network: Network.create(async function (params, variables) {
          // On the relay environment, we call apollo directly instead of doing an API call
          // This saves a network request and we don't have to worry about the complexities of
          // forwarding cookies

          // here, we grab our queries based on the ID passed by the request
          if (!Object.prototype.hasOwnProperty.call(queryMapJson, params.id)) {
            throw new Error('no query with id found')
          }

          const result = await apollo.executeOperation({
            operationName: params.name,
            variables: variables,
            query: queryMapJson[params.id]
          }, { req, res })

          // Throw an error, which will be caught by our server
          if (Array.isArray(result.errors)) {
            throw new Error(JSON.stringify(result.errors, null, 2))
          }

          return { data: JSON.parse(JSON.stringify(result.data)) }
        }),
        store: new Store(new RecordSource()),
        isServer: true
      })

      const context = {}

      // Create a router
      const router = await createServerRouter(
        routes,
        createMockHistory({ context, location: req.url }),
        environment,
        req
      )

      const helmetContext = {}

      const App = (
        <I18nextProvider i18n={req.i18n}>
          <HelmetProvider context={helmetContext}>
            <FlashProvider override={req.flash}>
              <ChakraProvider theme={theme}>
                <RelayEnvironmentProvider environment={environment}>
                  <RoutingContext.Provider value={router.context}>
                    <QueryParamProvider ReactRouterRoute={CompatibilityRoute}>
                      <RouteRenderer />
                    </QueryParamProvider>
                  </RoutingContext.Provider>
                </RelayEnvironmentProvider>
              </ChakraProvider>
            </FlashProvider>
          </HelmetProvider>
        </I18nextProvider>
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

      const cache = createCache({ key: 'od', nonce: res.locals.cspNonce })
      const { extractCritical } = createEmotionServer(cache)

      const element = <CacheProvider value={cache}>{App}</CacheProvider>

      const { html, css, ids } = extractCritical(
        renderToString(extractor.collectChunks(element))
      )

      const { helmet } = helmetContext

      res.render('default', {
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        link: helmet.link.toString(),
        manifest: `${process.env.PUBLIC_PATH}manifest.json`,
        favicon: `${process.env.PUBLIC_PATH}favicon.ico`,
        scripts: extractor.getScriptTags(),
        preload: extractor.getLinkTags(),
        styles: extractor.getStyleTags(),
        nonce: res.locals.cspNonce,
        emotionIds: ids.join(' '),
        emotionCss: css,
        html,
        csrfToken: req.csrfToken(),
        relayStore: serialize(environment
          .getStore()
          .getSource()
          .toJSON()
        ),
        i18nextStore: serialize(initialI18nStore),
        flashStore: serialize(req.flash.flush()),
        i18nextLang: req.i18n.language
      })
    } catch (e) {
      next(e)
    }
  }
}

export default entry
