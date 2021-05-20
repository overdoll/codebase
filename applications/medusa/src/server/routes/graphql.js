import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import parseCookies from '../utilities/parseCookies';
import services from '../config/services';

// https://github.com/apollographql/apollo-server/issues/3099#issuecomment-671127608 (slightly modified)
// Forwards cookies from services to our gateway (we place implicit trust on our services that they will use headers in a proper manner)
class CookieDataSource extends RemoteGraphQLDataSource {
  /**
   * Processes set-cookie headers from the service back to the
   * client, so the cookies are set within their browser
   */
  async process({ request, context }) {
    const response = await super.process({ request, context });

    const cookie = response.http?.headers.get('set-cookie');
    const passport = response.http?.headers.get('X-Modified-Passport');

    if (cookie) {
      const cookies = parseCookies(cookie);
      cookies.forEach(({ cookieName, cookieValue, options }) => {
        if (context && context.res) {
          context.res.cookie(cookieName, cookieValue, options);
        }
      });
    }

    // If the service sends back an X-Modified-Passport, we modify the session's passport
    if (passport) {
      context.req.session.passport = passport;
    }

    return response;
  }

  /**
   * Sends any cookies found within the clients request headers then
   * pushes them to the requested services context
   */
  willSendRequest(requestContext) {
    if (!requestContext.context.req) {
      return;
    }

    const { passport } = requestContext.context.req.session;

    if (passport) {
      if (!requestContext.request.extensions) {
        requestContext.request.extensions = {};
      }

      requestContext.request.extensions.passport = passport;
    }

    // Forward all headers
    Object.entries(
      requestContext.context.req.headers || {},
    ).forEach(([key, value]) =>
      requestContext.request.http?.headers.set(key, value),
    );
  }
}

export default (config) => {
  const gateway = new ApolloGateway({
    serviceList: services,
    persistedQueries: true,
    buildService({ url }) {
      return new CookieDataSource({ url });
    },
  });

  // GraphQL Server
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ res, req }) => ({ res, req }),
  });

  server.start().then(() => server.applyMiddleware(config));
};
