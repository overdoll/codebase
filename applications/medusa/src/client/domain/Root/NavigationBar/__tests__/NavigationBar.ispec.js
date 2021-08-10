import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import withProviders from '@//:modules/testing/withProviders'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import routes from '../routing/navigation'
import NavigationBar from '../NavigationBar'
import { createClientRouter } from '@//:modules/routing/router'
import { createMemoryHistory } from 'history'
import RoutingContext from '@//:modules/routing/RoutingContext'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import RootQuery from '@//:artifacts/RootQuery.graphql'
import JSResource from '@//:modules/utilities/JSResource'
import getUserFromEnvironment from '@//:modules/routing/getUserFromEnvironment'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'

it('logged in navigation bar renders and links work', async () => {
  const activeRoutes = [
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
          path: '/',
          exact: true,
          component: JSResource(
            'JoinRoot',
            () => new Promise(resolve => resolve(() => <div>you are on the home page</div>))
          )
        }
      ]
    }
  ]

  const router = createClientRouter(
    activeRoutes,
    createMemoryHistory({
      initialEntries: ['/someotherroute'],
      initialIndex: 0
    }),
    createMockEnvironment()
  )

  const Environment = createMockEnvironment()

  Environment.mock.queuePendingOperation(RootQuery)

  console.log(Environment)

  const resolver = {
    viewer: (context, generateId) => {
      return ({
        viewer: {
          id: `artist-${generateId()}`,
          username: 'test',
          avatar: 'test-id',
          isModerator: false,
          isStaff: true
        }
      })
    }
  }

  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver)
  )

  const [Root] = withProviders({
    Component: NavigationBar,
    environment: Environment
  })

  console.log(getUserFromEnvironment(Environment))

  render(
    <RoutingContext.Provider value={router.context}>
      <RouterRenderer>
        <Root />
      </RouterRenderer>
    </RoutingContext.Provider>
  )

  // Find Home page button
  const homeButton = screen.getByLabelText('Home')

  // Expect it to exist
  expect(homeButton).toBeVisible()

  // Click on it
  userEvent.click(homeButton)

  // Make sure we see the home page text and we are at the correct route
  await waitFor(() => expect(screen.getByText('you are on the home page')).toBeInTheDocument())
})
