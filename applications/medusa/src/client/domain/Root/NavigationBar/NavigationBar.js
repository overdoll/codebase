/**
 * @flow
 */
import type { Node } from 'react'
import { Fragment, useContext, useMemo } from 'react'
import {
  Box,
  Button,
  Flex,
  Text
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import { Route } from 'react-router'
import { useLocation } from '@//:modules/routing'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { AbilityContext } from '../helpers/AbilityContext'
import { useRelayEnvironment } from 'react-relay'
import type { TopRightMenuFragment$key } from '@//:artifacts/TopRightMenuFragment.graphql'

import NavigationButton
  from './components/NavigationContainer/NavigationCenterItems/NavigationButton/NavigationButton'
import SidebarButton from './components/NavigationContents/Sidebar/SidebarButton/SidebarButton'
import NavigationMenu from './components/NavigationContainer/NavigationRightItems/NavigationMenu/NavigationMenu'
import Sidebar from './components/NavigationContents/Sidebar/Sidebar'
import MenuButton
  from './components/NavigationContainer/NavigationRightItems/NavigationMenu/MenuButton/MenuButton'
import NavigationContainer from './components/NavigationContainer/NavigationContainer'
import NavigationLeftBrand from './components/NavigationContainer/NavigationLeftBrand/NavigationLeftBrand'
import NavigationCenterItems from './components/NavigationContainer/NavigationCenterItems/NavigationCenterItems'
import NavigationRightItems from './components/NavigationContainer/NavigationRightItems/NavigationRightItems'
import SimplifiedNavigation from './components/SimplifiedNavigation/SimplifiedNavigation'
import NavigationContents from './components/NavigationContents/NavigationContents'
import PageContents from './components/NavigationContents/PageContents/PageContents'
import SidebarGrouping from './components/NavigationContents/Sidebar/SidebarGrouping/SidebarGrouping'

type Props = {
  children: Node,
  rootQuery: TopRightMenuFragment$key
}

export default function NavigationBar (props: Props): Node {
  const [t] = useTranslation('navigation')

  const location = useLocation()

  const environment = useRelayEnvironment()

  const ability = useContext(AbilityContext)

  const getBasePath = (path) => {
    return '/' + path.split('/')[1]
  }

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
            const match = getBasePath(location.pathname) === getBasePath(item.path)
            return (
              <NavigationButton
                key={index}
                exact={item.exact}
                icon={item.navigation.icon}
                match={match}
                path={item.path} label={t(item.navigation.title)}
              />
            )
          })}
        </NavigationCenterItems>
        <NavigationRightItems>
          <NavigationMenu viewer={props.rootQuery}>
            {navigationMenu.map((item, index) => {
              const match = getBasePath(location.pathname) === getBasePath(item.path)
              return (
                <MenuButton
                  key={index}
                  match={match} path={item.path} label={item.navigation.title}
                  icon={item.navigation.icon}
                />
              )
            })}
          </NavigationMenu>
        </NavigationRightItems>
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
