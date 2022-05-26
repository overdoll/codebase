import { ApolloGateway, LocalGraphQLDataSource, RemoteGraphQLDataSource } from '@apollo/gateway'
import { gql } from 'apollo-server'
import { ApolloServer } from 'apollo-server-express'
import Redis from 'ioredis'
import cors from 'cors'
import { buildSubgraphSchema } from '@apollo/federation'

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import express from 'express'

import http from 'http'

import { DocumentNode, GraphQLSchema, visit } from 'graphql'
import { GraphQLResponse } from 'apollo-server-types'

import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import CoreSchema from '@apollo/core-schema'

const supergraphSdl = readFileSync(join(__dirname, './schema/schema.graphql')).toString()

dotenv.config({
  path: resolve(__dirname, '.env')
})

const NODE_SERVICE_NAME = 'relay'

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
/** @noinspection */
const toTypeDefs = (name: string): DocumentNode => gql` extend type ${name} implements Node @key(fields: "id") { id: ID! @external }`

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

/**
 * An ApolloGateway which provides `Node` resolution across all federated
 * services, and a global `node` field, like Relay.
 */
// @ts-expect-error
class NodeGateway extends ApolloGateway {
  private nodeSchema: GraphQLSchema

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createSchemaFromSupergraphSdl (supergraphSdl: string) {
    const core = CoreSchema.from(
      gql(`${supergraphSdl}`)
    )

    // Once all real service definitions have been loaded, we need to find all
    // types that implement the Node interface. These must also become concrete
    // types in the Node service, so we build a GraphQL module for each.
    const modules = []
    const seenNodeTypes = new Set()

    visit(core.document, {
      ObjectTypeDefinition (node) {
        const name = node.name.value

        // Add any new Nodes from this service to the Node service's modules
        if (isNode(node) && !seenNodeTypes.has(name)) {
          // We don't need any resolvers for these modules; they're just
          // simple objects with a single `id` property.
          // @ts-expect-error
          modules.push({ typeDefs: toTypeDefs(name) })
          seenNodeTypes.add(name)
        }
      }
    })

    // Dynamically construct a service to do Node resolution. This requires
    // building a federated schema, and introspecting it using the
    // `_service.sdl` field so that all the machinery is correct. Effectively
    // this is what would have happened if this were a real service.
    this.nodeSchema = buildSubgraphSchema([
      // The Node service must include the Node interface and a module for
      // translating the IDs into concrete types
      {
        resolvers,
        typeDefs
      },
      // @ts-expect-error
      new RootModule(seenNodeTypes),
      // The Node service must also have concrete types for each type. This
      // just requires the a type definition with an `id` field for each
      ...modules
    ])

    // @ts-expect-error
    return super.createSchemaFromSupergraphSdl(supergraphSdl)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createDataSource (serviceDef) {
    if (serviceDef.name === NODE_SERVICE_NAME) {
      return new LocalGraphQLDataSource(this.nodeSchema)
    }

    // @ts-expect-error
    return super.createDataSource(serviceDef)
  }
}

// Ensures passport is forwarded from downstream services
class PassportDataSource extends RemoteGraphQLDataSource {
  // Process passport from response
  async process ({
    request,
    context
  }): Promise<GraphQLResponse> {
    // @ts-expect-error
    const response: any = await super.process({
      request,
      context
    })

    // make sure passport is forwarded back in the response as well
    if (response.extensions?.passport != null) {
      const originalSend = context.res.send

      context.res.send = (data) => {
        const parse = JSON.parse(data)

        if (parse.extensions == null) {
          parse.extensions = {}
        }

        parse.extensions.passport = response.extensions.passport
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

    const passportForward = requestContext.context.req.body.extensions.passport

    if (passportForward != null) {
      if (requestContext.request.extensions == null) {
        requestContext.request.extensions = {}
      }

      requestContext.request.extensions.passport = passportForward
    }
  }
}

const gateway = new NodeGateway({
  supergraphSdl: supergraphSdl,
  buildService ({ url }) {
    return new PassportDataSource({ url })
  }
})

const jsonParser = bodyParser.json()

// @ts-expect-error
const client = new Redis(6379, process.env.REDIS_HOST, { db: 2 })

function matchQueryMiddleware (req, res, next): void {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return jsonParser(req, res, async () => {
    const { queryId } = req.body.extensions
    if (queryId != null) {
      const query = await client.get(`query:${queryId as string}`)
      if (query != null) {
        req.body.query = query
      } else {
        res.status(400).send({
          data: null,
          errors: [
            {
              path: [],
              locations: [],
              message: `cannot find queryId: ${queryId as string}`
            }
          ]
        })
        return
      }
    }
    next()
  })
}

void (async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    gateway,
    // @ts-expect-error
    subscriptions: false,
    context: ({
      req,
      res
    }) => ({
      req,
      res
    }),
    // disable playground, add middleware for a custom playground
    playground: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(cors({
    origin: [
      // @ts-expect-error
      process.env.APP_URL,
      'https://studio.apollographql.com'
    ],
    credentials: true,
    methods: ['OPTIONS', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-overdoll-Security']
  }))

  app.use(matchQueryMiddleware)

  server.applyMiddleware({
    app,
    path: '/',
    cors: false
  })

  await new Promise<void>(resolve => httpServer.listen({
    port: 8000,
    hostname: '0.0.0.0'
  }, resolve))
  console.log(`🚀 Server ready at http://0.0.0.0:8000${server.graphqlPath}`)
})()
