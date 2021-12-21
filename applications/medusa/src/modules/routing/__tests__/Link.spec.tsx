import Link from '../Link'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Resource } from '../../operations/JSResource'
import { createMockEnvironment } from 'relay-test-utils'
import { createClientRouter } from '../router'
import { createMemoryHistory } from 'history'
import RouterRenderer from '../RouteRenderer'
import RoutingProvider from '../RoutingProvider'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

// components to help with testing
const LinkComponent = (): JSX.Element => {
  return <Link to='/test'>test</Link>
}

const Component = (): string => {
  return 'rendering component'
}

const Empty = {
  path: '*',
  component: Resource(
    'LinkComponent',
    async () => await new Promise(resolve => resolve(LinkComponent))
  )
}

// tests link actions
it('clicking on the link directs to the route', async () => {
  const environment = createMockEnvironment()

  const routes = [
    {
      path: '/test',
      exact: true,
      component: Resource(
        'Component',
        async () => await new Promise(resolve => resolve(Component))
      )
    },
    Empty
  ]

  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    }),
    environment
  )

  render(
    <RelayEnvironmentProvider environment={environment}>
      <RoutingProvider router={router.context}>
        <RouterRenderer />
      </RoutingProvider>
    </RelayEnvironmentProvider>
  )

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument())

  const link = screen.getByRole('link')

  userEvent.click(link)

  await waitFor(() =>
    expect(screen.getByText('rendering component')).toBeInTheDocument()
  )
})

it('hovering over the link will preload the component', async () => {
  const func = jest.fn()
  const environment = createMockEnvironment()

  const routes = [
    {
      path: '/test',
      exact: true,
      component: Resource(
        'Component2',
        async () =>
          await new Promise(resolve => {
            func()
            resolve(Component)
          })
      )
    },
    Empty
  ]

  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    }),
    environment
  )

  render(
    <RelayEnvironmentProvider environment={environment}>
      <RoutingProvider router={router.context}>
        <RouterRenderer />
      </RoutingProvider>
    </RelayEnvironmentProvider>
  )

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument())

  const link = screen.getByRole('link')

  userEvent.hover(link)

  await waitFor(() => expect(func).toHaveBeenCalled())
})

it('mouse down on the link will load code and data', async () => {
  const func = jest.fn()

  const Environment = createMockEnvironment()

  const RootQuery = require('@//:artifacts/RootQuery.graphql')

  const routes = [
    {
      path: '/test',
      exact: true,
      component: Resource(
        'Component3',
        async () =>
          await new Promise(resolve => {
            func()
            resolve(Component)
          })
      ),
      prepare: () => {
        return {
          stateQuery: {
            query: RootQuery,
            variables: {},
            options: {
              fetchPolicy: 'store-or-network'
            }
          }
        }
      }
    },
    Empty
  ]

  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    }),
    Environment
  )

  render(
    <RelayEnvironmentProvider environment={Environment}>
      <RoutingProvider router={router.context}>
        <RouterRenderer />
      </RoutingProvider>
    </RelayEnvironmentProvider>
  )

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument())

  const link = screen.getByRole('link')

  userEvent.click(link)

  await waitFor(() => expect(func).toHaveBeenCalled())

  // expect that relay has the current query in the store (preload function worked correctly)
  Environment.mock.findOperation(
    // @ts-expect-error
    data => data.request.node.hash === `${RootQuery.default.hash as string}`
  )
})
