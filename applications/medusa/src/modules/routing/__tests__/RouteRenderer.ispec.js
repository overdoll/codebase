import { render, screen, waitFor } from '@testing-library/react'
import JSResource from '@//:modules/utilities/JSResource'
import { createClientRouter } from '@//:modules/routing/router'
import { createMemoryHistory } from 'history'
import { createMockEnvironment } from 'relay-test-utils'
import RouterRenderer from '../RouteRenderer'
import RoutingContext from '@//:modules/routing/RoutingContext'

it('renders a root component with children', async () => {
  const routes = [
    {
      component: JSResource(
        'Root',
        () =>
          new Promise(resolve =>
            resolve(props => <div>test1{props.children}</div>)
          )
      ),
      routes: [
        {
          path: '/test',
          exact: true,
          component: JSResource(
            'JoinRoot',
            () => new Promise(resolve => resolve(() => <div>test2</div>))
          )
        }
      ]
    }
  ]

  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries: ['/test'],
      initialIndex: 0
    }),
    createMockEnvironment()
  )

  render(
    <RoutingContext.Provider value={router.context}>
      <RouterRenderer />
    </RoutingContext.Provider>
  )

  await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument())
  await waitFor(() => expect(screen.getByText('test2')).toBeInTheDocument())
})
