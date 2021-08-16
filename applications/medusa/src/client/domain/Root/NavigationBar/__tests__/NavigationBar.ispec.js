import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import withProviders from '@//:modules/testing/withProviders'
import { render, screen, waitFor, prettyDOM } from '@testing-library/react'
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
import { AbilityContext } from '../../helpers/AbilityContext'
import { usePreloadedQuery } from 'react-relay/hooks'

it('logged in navigation bar renders and links work', async () => {

  /*
  const navIcon = () => {
    return (<svg />)
  }

  const activeRoutes = [
    {
      component: JSResource(
        'Root',
        () =>
          new Promise(resolve =>
            resolve(props => <div>{props.children}</div>)
          )
      ),
      routes: [
        {
          path: '/allowed',
          component: JSResource(
            'UploadRoot',
            () => new Promise(resolve => resolve(() => <div>you are on the allowed page</div>))
          )
        },
        {
          path: '/',
          exact: true,
          component: JSResource(
            'HomeRoot',
            () => new Promise(resolve => resolve(() => <div>you are on the home page</div>))
          )
        },
        {
          path: '/sidebar',
          component: JSResource(
            'SettingsRoot',
            () => new Promise(resolve => resolve(() => <div>blank page</div>))
          ),
          routes: [
            {
              path: '/sidebar/first',
              component: JSResource(
                'SettingsRoot',
                () => new Promise(resolve => resolve(() => <div>first page</div>))
              )
            },
            {
              path: '/sidebar/second',
              component: JSResource(
                'SettingsRoot',
                () => new Promise(resolve => resolve(() => <div>second page</div>))
              )
            }
          ]
        }
      ]
    }
  ]

  const navbarRoutes = [
    {
      path: '/allowed',
      navigation: {
        top: {
          title: 'allowed',
          icon: navIcon
        }
      }
    },
    {
      path: '/notallowed',
      navigation: {
        top: {
          title: 'notallowed',
          icon: navIcon
        }
      },
      middleware: [
        ({ environment }) => {
          return false
        }
      ]
    },
    {
      path: '/',
      navigation: {
        top: {
          title: 'default',
          icon: navIcon
        }
      }
    },
    {
      path: '/sidebar',
      navigation: {
        side: {
          title: 'sidebar_title'
        }
      },
      routes: [
        {
          path: '/sidebar/first',
          navigation: {
            side: {
              title: 'sidebar_first_page'
            },
            menu: {
              title: 'menu_page',
              icon: navIcon
            }
          }
        },
        {
          path: '/sidebar/second',
          navigation: {
            side: {
              title: 'sidebar_second_page'
            }
          }
        }
      ]
    }
  ]

  const Environment = createMockEnvironment()

  const resolver = {
    Account: (context, generateId) => {
      return {
        id: `account-${generateId()}`,
        username: 'test',
        avatar: 'test-id',
        isModerator: false,
        isStaff: true
      }
    }
  }

  Environment.mock.queueOperationResolver(operation => {
    return MockPayloadGenerator.generate(operation, resolver)
  }
  )

  Environment.mock.queuePendingOperation(RootQuery)

  const user = getUserFromEnvironment(Environment)

  const ability = defineAbility(
    user
  )

  const NavigationBarComponent = () => {
    return (
      <NavigationBar routes={navbarRoutes} rootQuery={user?.viewer}>
        <RouterRenderer />
      </NavigationBar>
    )
  }

  const [Root] = withProviders({
    Component: NavigationBarComponent,
    environment: Environment,
    routes: activeRoutes
  })

  render(
    <AbilityContext.Provider value={ability}>
      <Root />
    </AbilityContext.Provider>
  )

  console.log(prettyDOM(document.body))

  // Find upload page button and expect it to render the contents when clicked
  const allowedButton = screen.getByLabelText('allowed')
  expect(allowedButton).toBeVisible()
  userEvent.click(allowedButton)
  expect(screen.getByText('you are on the allowed page')).toBeInTheDocument()

  // Expect restricted button not to be visible since user does not have permission to see it
  const restrictedButton = screen.queryByLabelText('upload')
  expect(restrictedButton).not.toBeInTheDocument()

   */
})
