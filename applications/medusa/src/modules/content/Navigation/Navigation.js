/**
 * @flow
 */
import type { Node } from 'react'
import { useMemo } from 'react'
import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from '@//:modules/routing'
import { graphql, useFragment } from 'react-relay/hooks'
import { useAbilityContext } from '@//:modules/utilities/hooks'
import Link from '@//:modules/routing/Link'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { useRelayEnvironment } from 'react-relay'
import type { NavigationFragment$key } from '@//:artifacts/NavigationFragment.graphql'
import getBasePath from './helpers/getBasePath'
import LockedAccountBanner from './components/NavigationContents/PageContents/LockedAccountBanner/LockedAccountBanner'

import {
  NavigationButton,
  NavigationCenterItems,
  NavigationContainer,
  NavigationContents,
  NavigationLeftBrand,
  NavigationRightItems,
  PageContents,
  SimplifiedNavigation
} from '@//:modules/content/Navigation/components'
import {
  Sidebar,
  SidebarButton,
  SidebarGrouping
} from '@//:modules/content/Navigation/components/NavigationContents/Sidebar'

import {
  AvatarMenu,
  LoggedOutPlaceholder,
  LoginMenu,
  LogoutButton,
  MenuItemButton,
  NavigationMenu,
  ProfileButton
} from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems'

type Props = {
  children: Node,
  rootQuery: NavigationFragment$key
}

const NavigationFragmentGQL = graphql`
    fragment NavigationFragment on Account {
        ...AvatarMenuFragment
        ...ProfileButtonFragment
    }
`

export default function Navigation (props: Props): Node {
  const [t] = useTranslation('navigation')

  const environment = useRelayEnvironment()

  const location = useLocation()

  const data = useFragment(NavigationFragmentGQL, props.rootQuery)

  const ability = useAbilityContext()

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
            <Button textColor='primary.500' variant='link' colorScheme='primary'>{t('title')}</Button>
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
                {!ability.can('read', 'locked') &&
                  <AvatarMenu viewer={data} />}
                <NavigationMenu>
                  {!ability.can('read', 'locked') &&
                    <ProfileButton viewer={data} />}
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
                <LoginMenu />
                <NavigationMenu>
                  <LoggedOutPlaceholder />
                </NavigationMenu>
              </NavigationRightItems>
              )
        }
      </NavigationContainer>
      {(ability.can('read', 'locked') && getBasePath(location.pathname) !== '/locked') && <LockedAccountBanner />}
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
