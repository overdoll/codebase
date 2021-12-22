import { render, screen, waitFor } from '@testing-library/react'
import { Resource } from '../../operations/JSResource'
import { createClientRouter } from '../router'
import { createMemoryHistory } from 'history'
import { createMockEnvironment } from 'relay-test-utils'
import RouterRenderer from '../RouteRenderer'
import RoutingProvider from '../RoutingProvider'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

it('renders a root component with children', async () => {
  const routes = [
    {
      component: Resource(
        'Root',
        async () =>
          await new Promise(resolve =>
            resolve(props => <div>test1{props.children}</div>)
          )
      ),
      routes: [
        {
          path: '/test',
          exact: true,
          component: Resource(
            'JoinRoot',
            async () => await new Promise(resolve => resolve(() => <div>test2</div>))
          )
        }
      ]
    }
  ]

  const environment = createMockEnvironment()

  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries: ['/test'],
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

  await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument())
  await waitFor(() => expect(screen.getByText('test2')).toBeInTheDocument())
})
