import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import withProviders from '@//:modules/testing/withProviders'
import Token from '../Token'
import { render, screen } from '@testing-library/react'
import { loadQuery } from 'react-relay/hooks'

const queueOperation = resolver => {
  const Environment = createMockEnvironment()

  const TokenQuery = require('@//:artifacts/TokenQuery.graphql')

  const cookie = 'fake-token-123'

  Environment.mock.queuePendingOperation(TokenQuery, {
    cookie: cookie
  })

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver)
  )

  const preparedQuery = loadQuery(
    Environment,
    TokenQuery,
    {
      cookie: cookie
    },
    {
      fetchPolicy: 'store-or-network'
    }
  )

  // Pass preload query data to token, since it originally resolves this from the router
  const TokenComponent = () => {
    return <Token prepared={{ tokenQuery: preparedQuery }} />
  }

  return withProviders({
    Component: TokenComponent,
    environment: Environment
  })
}

it('should ask to register if not registered', async () => {
  const resolver = {
    Cookie: () => ({
      sameSession: true,
      registered: false,
      invalid: false,
      session: ''
    })
  }

  const [Root] = queueOperation(resolver)

  render(<Root />)

  // If there is a button, we are at a registration screen
  expect(screen.getByRole('textbox')).toBeVisible()
  expect(screen.getByRole('button')).toBeVisible()
})

//   // TODO: fix this test
// it('should redirect if cookie is not valid', async () => {
//   const resolver = {
//     Cookie: () => ({
//       invalid: true,
//     }),
//   };
//
//   const [Root, router] = queueOperation(resolver);
//   render(<Root />);
//
//   // user was redirected to join page with a message
//   expect(router.context.history.location.pathname).toEqual('/join');
// });

it('should show session data if token was redeemed in another session', async () => {
  const resolver = {
    Cookie: () => ({
      sameSession: false,
      registered: false,
      invalid: false,
      session: '{ "user-agent": "agent-session" }'
    })
  }

  const [Root] = queueOperation(resolver)

  render(<Root />)

  // Expect session data to be visible
  expect(screen.getByText('agent-session')).toBeVisible()
})

it('should redirect if user is already registered', async () => {
  const resolver = {
    Cookie: () => ({
      sameSession: true,
      registered: true,
      invalid: false,
      session: '{ "user-agent": "agent-session" }'
    })
  }

  const [Root, router] = queueOperation(resolver)

  render(<Root />)

  // user was redirected to '/profile'
  expect(router.context.history.location.pathname).toEqual('/profile')
})
