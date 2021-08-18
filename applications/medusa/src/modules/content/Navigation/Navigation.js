/**
 * @flow
 */
import type { Node } from 'react'
import { useContext, useMemo, Fragment } from 'react'
import {
  Button
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { AbilityContext } from '../../../client/domain/Root/helpers/AbilityContext'
import { useRelayEnvironment } from 'react-relay'
import type { NavigationFragment$key } from '@//:artifacts/NavigationFragment.graphql'
import getBasePath from './helpers/getBasePath'

import NavigationButton
  from './components/NavigationContainer/NavigationCenterItems/NavigationButton/NavigationButton'
import SidebarButton from './components/NavigationContents/Sidebar/SidebarButton/SidebarButton'
import Sidebar from './components/NavigationContents/Sidebar/Sidebar'
import MenuItemButton
  from './components/NavigationContainer/NavigationRightItems/NavigationMenu/MenuItemButton/MenuItemButton'
import NavigationContainer from './components/NavigationContainer/NavigationContainer'
import NavigationLeftBrand from './components/NavigationContainer/NavigationLeftBrand/NavigationLeftBrand'
import NavigationCenterItems from './components/NavigationContainer/NavigationCenterItems/NavigationCenterItems'
import NavigationRightItems from './components/NavigationContainer/NavigationRightItems/NavigationRightItems'
import SimplifiedNavigation from './components/SimplifiedNavigation/SimplifiedNavigation'
import NavigationContents from './components/NavigationContents/NavigationContents'
import PageContents from './components/NavigationContents/PageContents/PageContents'
import SidebarGrouping from './components/NavigationContents/Sidebar/SidebarGrouping/SidebarGrouping'
import NavigationMenu
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationMenu/NavigationMenu'
import { useLocation } from '@//:modules/routing'
import ProfileButton
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationMenu/ProfileButton/ProfileButton'
import LogoutButton
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationMenu/LogoutButton/LogoutButton'
import LoginButton
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/LoginButton/LoginButton'
import AvatarButton
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/AvatarButton/AvatarButton'
import LoggedOutPlaceholder
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationMenu/LoggedOutPlaceholder/LoggedOutPlaceholder'
import { graphql, useFragment } from 'react-relay/hooks'

type Props = {
  children: Node,
  rootQuery: NavigationFragment$key
}

const NavigationFragmentGQL = graphql`
  fragment NavigationFragment on Account {
    ...AvatarButtonFragment
    ...ProfileButtonFragment
  }
`

export default function Navigation (props: Props): Node {
  const [t] = useTranslation('navigation')

  const environment = useRelayEnvironment()

  const location = useLocation()

  const ability = useContext(AbilityContext)

  const data = useFragment(NavigationFragmentGQL, props.rootQuery)

  const [navigationTop, navigationMenu, navigationSidebar, navigationFiltered] = useMemo(() => computeCurrentActiveRoutes({
    environment
  }), [ability])

  // Show a simplified navigation bar if on a filtered route
  if (navigationFiltered.includes(getBasePath(location.pathname))) {
    return (
      <SimplifiedNavigation>
        <PageContents>
          {props.children}
        </PageContents>
      </SimplifiedNavigation>
    )
  }

  // Otherwise, show the regular navigation bar
  return (
    <>
      <NavigationContainer>
        <NavigationLeftBrand>
          <Link to='/'>
            <Button textColor='red.500' variant='link' colorScheme='red'>{t('title')}</Button>
          </Link>
        </NavigationLeftBrand>
        <NavigationCenterItems>
          {navigationTop.map((item, index) => {
            return (
              <NavigationButton
                key={index}
                exact={item.exact}
                icon={item.navigation.icon}
                path={item.path} label={t(item.navigation.title)}
              />
            )
          })}
        </NavigationCenterItems>
        {
          ability.can('manage', 'account')
            ? (
              <NavigationRightItems>
                <AvatarButton viewer={data} />
                <NavigationMenu>
                  <ProfileButton viewer={data} />
                  {navigationMenu.map((item, index) => {
                    return (
                      <MenuItemButton
                        key={index}
                        path={item.path} label={item.navigation.title}
                        icon={item.navigation.icon}
                      />
                    )
                  })}
                  <LogoutButton />
                </NavigationMenu>
              </NavigationRightItems>
              )
            : (
              <NavigationRightItems>
                <LoginButton />
                <NavigationMenu>
                  <LoggedOutPlaceholder />
                </NavigationMenu>
              </NavigationRightItems>
              )
        }
      </NavigationContainer>
      <NavigationContents>
        {navigationSidebar.map((sidebarGroup, index) => {
          if (getBasePath(location.pathname) !== sidebarGroup.path) {
            return null
          }
          return (
            <Sidebar key={index} title={t(sidebarGroup.navigation.title)}>
              {Object.keys(sidebarGroup.routes).map((grouping, groupingIndex) => {
                return (
                  <SidebarGrouping key={groupingIndex} label={grouping}>
                    {(sidebarGroup.routes[grouping]).map((sidebarItem, sidebarItemIndex) => (
                      <SidebarButton
                        key={sidebarItemIndex}
                        title={t(sidebarItem.navigation.title)}
                        path={sidebarItem.path}
                      />
                    )
                    )}
                  </SidebarGrouping>
                )
              })}
            </Sidebar>
          )
        })}
        <PageContents>
          {props.children}
        </PageContents>
      </NavigationContents>
    </>
  )
}
