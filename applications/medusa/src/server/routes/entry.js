import { ChunkExtractor } from '@loadable/server';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import createRouter from '@//:modules/routing/createRouter';
import routes from '../../client/routes';
import createMockHistory from '@//:modules/routing/createMockHistory';
import path from 'path';
import serialize from 'serialize-javascript';
import ssrPrepass from 'react-ssr-prepass';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from '@//:modules/routing/RoutingContext';
import RouterRenderer from '@//:modules/routing/RouteRenderer';

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

    // TODO: add a _csrf cookie to the headers, if one doesn't exist
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

      // When we encounter a network error in our server-side rendering,
      // the Prepass will bailout on that component, and the network call will be done by the client.
      // This allows us to gracefully handle errors with errorBoundaries on the client. However, this also means the API call is
      // made twice: once on the server, and once on the client when the client loads the component. This is an okay tradeoff,
      // because otherwise the server will throw a 500 error, which is not good for user experience. We also can't directly pass down
      // 'throw new Error' into the client from the server.
      if (Array.isArray(response.data.errors)) {
        throw new Error(JSON.stringify(response.data.errors));
      }

      console.log('loaded');

      return response.data;
    }

    // Set up relay environment
    const environment = new Environment({
      network: Network.create(fetchRelay),
      store: new Store(new RecordSource(), {
        gcReleaseBufferSize: 10,
      }),
    });

    const context = {};

    const router = createRouter(
      routes,
      createMockHistory({ context, location: req.url }),
      environment,
    );

    // Set up our chunk extractor, so that we can preload our resources
    const extractor = new ChunkExtractor({
      statsFile: path.resolve(__dirname, 'loadable-stats.json'),
      entrypoints: ['client'],
    });

    // Collect relay store data from our routes, so we have faster initial loading times.
    await ssrPrepass(
      extractor.collectChunks(
        <RelayEnvironmentProvider environment={environment}>
          <RoutingContext.Provider value={router.context}>
            <RouterRenderer preloadQueries />
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>,
      ),
    );

    console.log('finish prepass');

    // Get our relay store
    const relayData = environment
      .getStore()
      .getSource()
      .toJSON();

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

    // Get our i18next store, and we will send this to the front-end
    const initialI18nStore = {};

    req.i18n.languages.forEach(l => {
      initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
    });

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.render('default', {
        title: 'Title',
        scripts: extractor.getScriptTags(),
        preload: extractor.getLinkTags(),
        styles: extractor.getStyleTags(),
        csrfToken: csrfToken,
        relayStore: serialize(relayData),
        i18nextStore: serialize(initialI18nStore),
        i18nextLang: req.i18n.language,
      });
    }
  } catch (e) {
    next(e);
  }
};

export default entry;
