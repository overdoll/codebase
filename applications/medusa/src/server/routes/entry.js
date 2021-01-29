import { ChunkExtractor } from '@loadable/server';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import routes from '../../client/routes';
import path from 'path';
import serialize from 'serialize-javascript';
import preloadDataFromRoutes from '@//:modules/routing/preloadDataFromRoutes';

const entry = async (req, res, next) => {
  try {
    const context = {};
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
        throw new Error(response.data.errors);
      }

      return response.data;
    }

    // Set up relay environment
    const environment = new Environment({
      network: Network.create(fetchRelay),
      store: new Store(new RecordSource(), {
        gcReleaseBufferSize: 10,
      }),
    });

    // Preload data from our routes
    await preloadDataFromRoutes(routes, req.url, environment, context);

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

    // check for redirect first
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

    // Set up our chunk extractor, so that we can preload our resources
    const extractor = new ChunkExtractor({
      statsFile: path.resolve(__dirname, 'loadable-stats.json'),
      entrypoints: ['client'],
    });

    // TODO: grab the assets from the list, and then
    console.log(extractor.stats.assets);
    console.log(await routes[0].component.getModuleId());

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
  } catch (e) {
    next(e);
  }
};

export default entry;
