import { ApolloGateway, RemoteGraphQLDataSource, LocalGraphQLDataSource } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server-express'
import parseCookies from './Domain/parseCookies'
import services from '../../config/services'
import { matchQueryMiddleware } from 'relay-compiler-plus'
import queryMapJson from '../../queries.json'
import { defaultPlaygroundOptions, gql } from 'apollo-server'
import { graphqlSync, parse, visit } from 'graphql'
import { buildFederatedSchema } from '@apollo/federation'
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html'

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

const toTypeDefs = name => gql`
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
  const key = b.slice(i).toString('ascii')
  return [typename, key]
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
                  throw new Error(`Service "${service.name} should not implement "node" Query type`)
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
      {
        resolvers,
        typeDefs
      },
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
  async process ({
    request,
    context
  }) {
    const response = await super.process({
      request,
      context
    })

    const cookie = response.http?.headers.get('set-cookie')

    if (cookie) {
      const cookies = parseCookies(cookie)
      cookies.forEach(({
        cookieName,
        cookieValue,
        options
      }) => {
        if (context && context.res) {
          context.res.cookie(cookieName, cookieValue, options)
        }
      })
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

    requestContext.request.http?.headers.set('cookie',
      requestContext.context.req.headers.cookie
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
  context: ({
    req,
    res
  }) => ({
    req,
    res
  }),
  // disable playground, add middleware for a custom playground
  playground: false
})

// custom playground that will add a CSRF token
// uses the same playground as apollo, we just needed to make these changes to support CSRF
const renderPlayground = (req, res, next) => {
  if (req.method !== 'GET') {
    next()
    return
  }

  res.setHeader('Content-Type', 'text/html')
  res.write(renderPlaygroundPage({
    endpoint: req.originalUrl,
    ...defaultPlaygroundOptions,
    settings: {
      ...defaultPlaygroundOptions.settings,
      'request.credentials': 'same-origin'
    },
    tabs: [
      {
        endpoint: req.originalUrl,
        name: 'Default',
        headers: {
          'X-CSRF-TOKEN': req.csrfToken()
        }
      }
    ]
  }))
  res.end()
}

export default function (index) {
  server.applyMiddleware({
    path: '/api/graphql',
    app: index.use('/api/graphql', renderPlayground, matchQueryMiddleware(queryMapJson))
  })

  return server
}
