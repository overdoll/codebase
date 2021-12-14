import Link from '@//:modules/routing/Link'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JSResource from '@//:modules/operations/JSResource'
import { createMockEnvironment } from 'relay-test-utils'
import { createClientRouter } from '@//:modules/routing/router'
import { createMemoryHistory } from 'history'
import RoutingContext from '@//:modules/routing/RoutingContext'
import RouterRenderer from '../RouteRenderer'

// components to help with testing
const LinkComponent = (): JSX.Element => {
  return <Link to='/test'>test</Link>
}

const Component = (): string => {
  return 'rendering component'
}

const Empty = {
  path: '*',
  component: JSResource(
    'LinkComponent',
    async () => await new Promise(resolve => resolve(LinkComponent))
  )
}

// tests link actions
it('clicking on the link directs to the route', async () => {
  const routes = [
    {
      path: '/test',
      exact: true,
      component: JSResource(
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
    createMockEnvironment()
  )

  render(
    <RoutingContext.Provider value={router.context}>
      <RouterRenderer />
    </RoutingContext.Provider>
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

  const routes = [
    {
      path: '/test',
      exact: true,
      component: JSResource(
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
    createMockEnvironment()
  )

  render(
    <RoutingContext.Provider value={router.context}>
      <RouterRenderer />
    </RoutingContext.Provider>
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
      component: JSResource(
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
    <RoutingContext.Provider value={router.context}>
      <RouterRenderer />
    </RoutingContext.Provider>
  )

  await waitFor(() => expect(screen.getByRole('link')).toBeInTheDocument())

  const link = screen.getByRole('link')

  userEvent.click(link)

  await waitFor(() => expect(func).toHaveBeenCalled())

  // expect that relay has the current query in the store (preload function worked correctly)
  Environment.mock.findOperation(
    data => data.request.node.hash === RootQuery.hash
  )
})
