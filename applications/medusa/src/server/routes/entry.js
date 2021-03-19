import { ChunkExtractor } from '@loadable/server';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { fetchQuery, RelayEnvironmentProvider } from 'react-relay/hooks';
import routes from '../../client/routes';
import theme from '../../client/theme';
import path from 'path';
import serialize from 'serialize-javascript';
import RouteRenderer from '@//:modules/routing/RouteRenderer';
import RoutingContext from '@//:modules/routing/RoutingContext';
import prepass from 'react-ssr-prepass';

import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

import createRouter from '@//:modules/routing/createRouter';
import createMockHistory from '@//:modules/routing/createMockHistory';
import { ThemeProvider } from 'theme-ui';

const entry = async (req, res, next) => {
  try {
    let forwardCookies = [];

    const csrfToken = req.csrfToken();

    let fetchCookies = null;

    // Make sure we include a csrf cookie in our fetchRelay function, since
    // the initial call does not contain it
    if (req.cookies._csrf === undefined) {
      if (req.headers.cookie !== undefined) {
        fetchCookies = `${req.headers.cookie},csrf=${req.csrf.csrfSecret}`;
      } else {
        fetchCookies = `_csrf=${req.csrf.csrfSecret}`;
      }
    }

    async function fetchRelay(params, variables, _cacheConfig) {
      const response = await axios({
        url: 'http://hades:8000/graphql',
        withCredentials: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
          ...req.headers,
          cookie: fetchCookies !== null ? fetchCookies : req.headers.cookie,
        },
        data: {
          query: 'empty',
          operationName: params.name,
          extensions: {
            apq: {
              hash: params.id,
            },
          },
          variables,
        },
      });

      // Need to make sure we forward our cookies from API calls
      if (response.headers.hasOwnProperty('set-cookie')) {
        forwardCookies = [...forwardCookies, ...response.headers['set-cookie']];
      }

      // Throw an error, which will be caught by our server
      if (Array.isArray(response.data.errors)) {
        console.log(response.data.errors);
        throw new Error(response.data.errors);
      }

      return response.data;
    }

    // Set up relay environment
    const environment = new Environment({
      network: Network.create(fetchRelay),
      store: new Store(new RecordSource(), {
        gcReleaseBufferSize: 100,
      }),
    });

    // Before going further and creating our router, we pre-emptively resolve the RootQuery routes, so that the user object
    // can be available for permission checking & redirecting on the server & client
    const root = routes[0].prepare({});
    const rootKeys = Object.keys(root);

    // Get all prepared statements, and wait for fetchQuery to resolve
    for (let i = 0; i < rootKeys.length; i++) {
      const { query, variables, options } = root[rootKeys[i]];
      await fetchQuery(environment, query, variables, options).toPromise();
    }

    const context = {};

    // Create a router
    const router = createRouter(
      routes,
      createMockHistory({ context, location: req.url }),
      environment,
    );

    const App = (
      <ThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={environment}>
          <RoutingContext.Provider value={router.context}>
            <RouteRenderer />
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>
      </ThemeProvider>
    );

    // Collect relay App data from our routes, so we have faster initial loading times.
    await prepass(App);

    // If no CSRF cookie exists, we set it
    if (req.cookies._csrf === undefined) {
      forwardCookies = [
        ...forwardCookies,
        `_csrf=${req.csrf.csrfSecret}; Path=/; HttpOnly; Secure`,
      ];
    }

    // Add any cookies that may have been added in our API requests, and headers from any possible middleware
    res.setHeader('set-cookie', forwardCookies);

    // Disable caching for this page - it MUST be regenerated with each request
    res.setHeader(
      'cache-control',
      'private, no-cache, no-store, must-revalidate',
    );

    // check for another redirect, this time by the body of the whole app
    if (context.url) {
      res.redirect(301, context.url);
      return;
    }

    // Get our i18next store, and we will send this to the front-end
    const initialI18nStore = {};

    req.i18n.languages.forEach(l => {
      initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
    });

    // Get our relay store
    const relayData = environment
      .getStore()
      .getSource()
      .toJSON();

    // Get any extra assets we need to load, so that we dont have to import them in-code
    const assets = router.context.get().entries.map(entry => entry.id);

    // Set up our chunk extractor, so that we can preload our resources
    const extractor = new ChunkExtractor({
      statsFile: path.resolve(__dirname, 'loadable-stats.json'),
      entrypoints: ['client', ...assets],
    });

    const cache = createCache({ key: 'css', nonce: res.locals.cspNonce });
    const { extractCritical } = createEmotionServer(cache);

    const element = <CacheProvider value={cache}>{App}</CacheProvider>;

    const { html, css, ids } = extractCritical(
      renderToString(extractor.collectChunks(element)),
    );

    res.render('default', {
      title: 'Title',
      scripts: extractor.getScriptTags(),
      preload: extractor.getLinkTags(),
      styles: extractor.getStyleTags(),
      nonce: res.locals.cspNonce,
      emotionIds: ids.join(' '),
      emotionCss: css,
      html: html,
      csrfToken: csrfToken,
      relayStore: serialize(relayData),
      i18nextStore: serialize(initialI18nStore),
      i18nextLang: req.i18n.language,
    });
  } catch (e) {
    next(e);
  }
};

export default entry;
