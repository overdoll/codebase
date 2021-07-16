import { ApolloGateway, RemoteGraphQLDataSource, LocalGraphQLDataSource } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server-express'
import parseCookies from './Domain/parseCookies'
import services from '../../config/services'
import { matchQueryMiddleware } from 'relay-compiler-plus'
import queryMapJson from '../../queries.json'
import protobuf from 'protobufjs'
import passportJSON from './passport.json'
import { gql } from 'apollo-server'
import { graphqlSync, parse, visit } from 'graphql'
import { buildFederatedSchema } from '@apollo/federation'

const NODE_SERVICE_NAME = 'NODE_SERVICE'

const isNode = node =>
  node.interfaces.some(({ name }) => name.value === 'Node')

const DIVIDER_TOKEN = ':'

const typeDefs = gql`
  """
  An object with an ID.
  Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
  """
  interface Node {
    id: ID!
  }
`

const toTypeDefs = name =>
  gql`
  extend type ${name} implements Node @key(fields: "id") {
  id: ID! @external
  }
`

const resolvers = {
  Node: {
    __resolveType ({ id }) {
      // TODO: Add validation around `fromId`
      const [typename] = fromId(id)
      return typename
    }
  }
}

/**
 * Decodes a Base64 encoded global ID into typename and key
 *
 * @param {string} id Base64 encoded Node ID
 * @returns {[string, Buffer]} A tuple of the decoded typename and key.
 *   The key is not decoded, since it may be binary. There's no validation
 *   of the typename.
 * @throws {RangeError} If id cannot be decoded
 */
const fromId = (id) => {
  const b = Buffer.from(id, 'base64')
  const i = b.indexOf(DIVIDER_TOKEN)

  if (i === -1) {
    throw new RangeError('Invalid Node ID')
  }

  const typename = b.slice(0, i).toString('ascii')
  const key = b.slice(i)
  return [typename, key]
}

/**
 * Encodes a typename and key into a global ID
 *
 * @param {string} typename GraphQL typename
 * @param {string | Buffer} key Type-specific identifier
 * @returns {string} Base64 encoded Node ID
 */
const toId = (typename, key) => {
  const prefix = Buffer.from(typename + DIVIDER_TOKEN, 'ascii')
  const keyEncoded = typeof key === 'string' ? Buffer.from(key, 'ascii') : key

  return Buffer.concat(
    [prefix, keyEncoded],
    prefix.length + keyEncoded.length
  ).toString('base64')
}

/**
 * A GraphQL module which enables global object look-up by translating a global
 * ID to a concrete object with an ID.
 */
class RootModule {
  /**
   * @param {Set<string>} nodeTypes Supported typenames
   */
  constructor (nodeTypes) {
    this.resolvers = {
      Query: {
        node (_, { id }) {
          const [typename] = fromId(id)
          if (!nodeTypes.has(typename)) {
            throw new Error(`Invalid node ID "${id}"`)
          }

          return { id }
        }
      }
    }
  }

  typeDefs = gql`
    type Query {
      node(id: ID!): Node
    }
  `
}

/**
 * An ApolloGateway which provides `Node` resolution across all federated
 * services, and a global `node` field, like Relay.
 */
class NodeGateway extends ApolloGateway {
  async loadServiceDefinitions (config) {
    const defs = await super.loadServiceDefinitions(config)

    // Once all real service definitions have been loaded, we need to find all
    // types that implement the Node interface. These must also become concrete
    // types in the Node service, so we build a GraphQL module for each.
    const modules = []
    const seenNodeTypes = new Set()
    for (const service of defs.serviceDefinitions) {
      // Manipulate the typeDefs of the service
      service.typeDefs = visit(service.typeDefs, {
        ObjectTypeDefinition (node) {
          const name = node.name.value

          // Remove existing `query { node }` from service to avoid collisions
          if (name === 'Query') {
            return visit(node, {
              FieldDefinition (node) {
                if (node.name.value === 'node') {
                  return null
                }
              }
            })
          }

          // Add any new Nodes from this service to the Node service's modules
          if (isNode(node) && !seenNodeTypes.has(name)) {
            // We don't need any resolvers for these modules; they're just
            // simple objects with a single `id` property.
            modules.push({ typeDefs: toTypeDefs(name) })
            seenNodeTypes.add(name)
          }
        }
      })
    }

    if (!modules.length) {
      return defs
    }

    // Dynamically construct a service to do Node resolution. This requires
    // building a federated schema, and introspecting it using the
    // `_service.sdl` field so that all the machinery is correct. Effectively
    // this is what would have happened if this were a real service.
    const nodeSchema = buildFederatedSchema([
      // The Node service must include the Node interface and a module for
      // translating the IDs into concrete types
      { resolvers, typeDefs },
      new RootModule(seenNodeTypes),

      // The Node service must also have concrete types for each type. This
      // just requires the a type definition with an `id` field for each
      ...modules
    ])

    // This is a local schema, but we treat it as if it were a remote schema,
    // because all other schemas are (probably) remote. In that case, we need
    // to provide the Federated SDL as part of the type definitions.
    const res = graphqlSync({
      schema: nodeSchema,
      source: 'query { _service { sdl } }'
    })

    defs.serviceDefinitions.push({
      typeDefs: parse(res.data._service.sdl),
      schema: nodeSchema,
      name: NODE_SERVICE_NAME
    })

    return defs
  }

  /**
   * Override `createDataSource` to let the local Node resolution service be
   * created without complaining about missing a URL.
   */
  createDataSource (serviceDef) {
    if (serviceDef.schema) {
      return new LocalGraphQLDataSource(serviceDef.schema)
    }
    return super.createDataSource(serviceDef)
  }
}

// https://github.com/apollographql/apollo-server/issues/3099#issuecomment-671127608 (slightly modified)
// Forwards cookies from services to our gateway (we place implicit trust on our services that they will use headers in a proper manner)
class CookieDataSource extends RemoteGraphQLDataSource {
  /**
   * Processes set-cookie headers from the service back to the
   * client, so the cookies are set within their browser
   */
  async process ({ request, context }) {
    const response = await super.process({ request, context })

    const cookie = response.http?.headers.get('set-cookie')
    const passport = response.http?.headers.get('X-Modified-Passport')

    if (cookie) {
      const cookies = parseCookies(cookie)
      cookies.forEach(({ cookieName, cookieValue, options }) => {
        if (context && context.res) {
          context.res.cookie(cookieName, cookieValue, options)
        }
      })
    }

    // If the service sends back an X-Modified-Passport, we modify the session's passport
    // we will validate the passport by parsing it
    // TODO: passport && sessions for accounts should eventually be handled by an ingress service
    if (passport) {
      let validPassport = false

      // if an account modification is made (different ID) we set it in the request object
      // so the session can be regenerated with this new account ID
      if (passport !== '') {
        const root = protobuf.Root.fromJSON(passportJSON)

        const Passport = root.lookupType('libraries.passport.v1.Passport')

        try {
          const message = Passport.decode(Uint8Array.from(Buffer.from(passport, 'base64').toString(), c => c.charCodeAt(0)))

          const object = Passport.toObject(message, {
            longs: String,
            enums: String,
            bytes: String
          })

          context.req.accountId = object?.account?.id

          validPassport = true
        } catch (e) {
          console.log(e)
          if (e instanceof protobuf.util.ProtocolError) {
            // e.instance holds the so far decoded message with missing required fields
          } else {
            // wire format is invalid
          }
        }
      }

      if (validPassport) {
        // await session regeneration or else it bugs out
        await new Promise(resolve => context.req.session.regenerate(resolve))
        context.req.session.passport = passport
        context.req.session.details = {
          userAgent: context.req.headers['user-agent'],
          ip: context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress,
          created: new Date().toISOString()
        }
      }
    }

    return response
  }

  /**
   * Sends any cookies found within the clients request headers then
   * pushes them to the requested services context
   */
  willSendRequest (requestContext) {
    if (!requestContext.context.req) {
      return
    }

    // add extensions object if it doesn't exist
    if (!Object.prototype.hasOwnProperty.call(requestContext.request, 'extensions')) {
      requestContext.request.extensions = {}
    }

    // remove "passport" from request in case user sends it (they could impersonate any user otherwise)
    if (Object.prototype.hasOwnProperty.call(requestContext.request.extensions, 'passport')) {
      delete requestContext.request.extensions.passport
    }

    const { passport } = requestContext.context.req.session

    if (passport) {
      requestContext.request.extensions.passport = passport
    }

    // Forward all headers
    Object.entries(
      requestContext.context.req.headers || {}
    ).forEach(([key, value]) =>
      requestContext.request.http?.headers.set(key, value)
    )
  }
}

const gateway = new NodeGateway({
  serviceList: services,
  persistedQueries: true,
  buildService ({ url }) {
    return new CookieDataSource({ url })
  }
})

// GraphQL Server
const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      'request.credentials': 'same-origin'
    }
  }
})

export default function (index) {
  server.applyMiddleware({
    path: '/api/graphql',
    app: index.use(matchQueryMiddleware(queryMapJson))
  })

  return server
}
