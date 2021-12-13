import { ApolloGateway, LocalGraphQLDataSource, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server-express'
import services from '../../config/services'
import { matchQueryMiddleware } from 'relay-compiler-plus'
import queryMapJson from '../../queries.json'
import { defaultPlaygroundOptions, gql } from 'apollo-server'
import { DocumentNode, graphqlSync, parse, visit } from 'graphql'
import { buildFederatedSchema } from '@apollo/federation'
import { renderPlaygroundPage } from '@apollographql/graphql-playground-html'
import { CompositionUpdate } from '@apollo/gateway/dist/config'
import { GraphQLDataSource } from '@apollo/gateway/src/datasources/types'
import { ServiceEndpointDefinition } from '@apollo/gateway/src/config'
import { GraphQLResponse } from 'apollo-server-types'

const NODE_SERVICE_NAME = 'NODE_SERVICE'

const isNode = (node): boolean =>
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

const toTypeDefs = (name: string): DocumentNode => gql`
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
 *   The key is not decoded, since it may be binary. There's no validation
 *   of the typename.
 */
const fromId = (id: string): [string, string] => {
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
  private readonly resolvers: { Query: { node: (_, { id }: { id: any }) => { id: any } } }

  constructor (nodeTypes: Set<string>) {
    this.resolvers = {
      Query: {
        node (_, { id }) {
          const [typename] = fromId(id)
          if (!(nodeTypes.has(typename))) {
            throw new Error(`Invalid node ID "${id as string}"`)
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

interface Module {
  typeDefs: DocumentNode
}

/**
 * An ApolloGateway which provides `Node` resolution across all federated
 * services, and a global `node` field, like Relay.
 */
// @ts-expect-error
class NodeGateway extends ApolloGateway {
  async loadServiceDefinitions (config): Promise<CompositionUpdate> {
    const defs = await super.loadServiceDefinitions(config)

    if (!('serviceDefinitions' in defs) || (defs.serviceDefinitions === undefined)) {
      return defs
    }

    // Once all real service definitions have been loaded, we need to find all
    // types that implement the Node interface. These must also become concrete
    // types in the Node service, so we build a GraphQL module for each.
    const modules: Module[] = []
    const seenNodeTypes: Set<string> = new Set()
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

    if (modules.length === 0) {
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
      typeDefs: parse(res?.data?._service.sdl),
      // @ts-expect-error
      schema: nodeSchema,
      name: NODE_SERVICE_NAME
    })

    return defs
  }

  /**
   * Override `createDataSource` to let the local Node resolution service be
   * created without complaining about missing a URL.
   */
  createDataSource (serviceDef: ServiceEndpointDefinition): GraphQLDataSource {
    // @ts-expect-error
    if (serviceDef.schema != null) {
      // @ts-expect-error
      return new LocalGraphQLDataSource(serviceDef.schema)
    }
    // @ts-expect-error
    return super.createDataSource(serviceDef)
  }
}

interface PassportDataResponse extends GraphQLResponse {
  passport?: string
}

// Ensures passport is forwarded from downstream services
class PassportDataSource extends RemoteGraphQLDataSource {
  // Process passport from response
  async process ({
    request,
    context
  }): Promise<GraphQLResponse> {
    const response: PassportDataResponse = await super.process({
      request,
      context
    })

    // make sure passport is forwarded back in the response as well
    if (response.passport != null) {
      const originalSend = context.res.send

      context.res.send = (data) => {
        const parse = JSON.parse(data)
        parse.passport = response.passport
        data = JSON.stringify(parse)

        context.res.send = originalSend // set function back to avoid the 'double-send'

        return context.res.send(data) // just call as normal with data
      }
    }

    return response
  }

  // Send passport from request to body
  willSendRequest (requestContext): void {
    if (requestContext.context.req === undefined) {
      return
    }

    const passportForward = requestContext.context.req.body.passport

    if (passportForward != null) {
      requestContext.request.passport = passportForward
    }
  }
}

const gateway = new NodeGateway({
  serviceList: services,
  buildService ({ url }) {
    return new PassportDataSource({ url })
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
const renderPlayground = (req, res, next): void => {
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
      'request.credentials': 'same-origin',
      'schema.polling.enable': false,
      'schema.polling.endpointFilter': '',
      'schema.polling.interval': 0
    },
    tabs: [
      {
        query: '',
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

export default function graphql (index): void {
  server.applyMiddleware({
    path: '/api/graphql',
    app: index.use('/api/graphql', renderPlayground, matchQueryMiddleware(queryMapJson))
  })
}
