/**
 * @flow
 */
import type { Node } from 'react'
import { Fragment, useContext, useMemo } from 'react'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import { Route } from 'react-router'
import { useHistory, useLocation } from '@//:modules/routing'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { AbilityContext } from '../helpers/AbilityContext'
import { useRelayEnvironment } from 'react-relay'

import InterfaceArrowsTurnBackward
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-turn-backward.svg'

import TopNavigationButton from './components/TopNavigationButton/TopNavigationButton'
import LeftSidebarButton from './components/LeftSidebar/LeftSidebarButton/LeftSidebarButton'
import TopRightMenu from './components/TopRightMenu/TopRightMenu'
import LeftSidebar from './components/LeftSidebar/LeftSidebar'
import type { TopRightMenuFragment$key } from '@//:artifacts/TopRightMenuFragment.graphql'
import TopRightMenuButton from './components/TopRightMenu/TopRightMenuButton/TopRightMenuButton'

type Props = {
  children: Node,
  rootQuery: TopRightMenuFragment$key
}

export default function NavigationBar (props: Props): Node {
  const [t] = useTranslation('navigation')

  const history = useHistory()

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
  if (navigationFiltered.includes(location.pathname)) {
    return (
      <Flex
        zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0} position='fixed' h='54px'
        bg='transparent'
      >
        <Link to='/'>
          <Button ml={2}>{t('title')}</Button>
        </Link>
        <Spacer />
        <IconButton
          onClick={() => history.goBack()}
          variant='solid'
          colorScheme='red'
          size='md'
          mr={2}
          icon={
            <Icon
              icon={InterfaceArrowsTurnBackward} m={2} w='fill' h='fill' p={1}
              fill='gray.100'
            />
          }
        />
      </Flex>
    )
  }

  // Otherwise, show the regular navigation bar
  return (
    <>
      <Flex
        align='center' right={0} left={0} top={0} h='54px'
      />
      <>
        <Flex
          zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0}
          position='fixed' h='54px'
          bg='gray.800'
        >
          <Flex display={{ base: 'none', md: 'flex' }} left={0} ml={3}>
            <Link to='/'>
              <Button textColor='red.500' variant='link' colorScheme='red'>{t('title')}</Button>
            </Link>
          </Flex>
          <Flex
            zIndex={-1} position='absolute' w='100%' justify='center'
            margin='auto'
          >
            <HStack spacing={{ base: 2, md: 12, lg: 28 }}>
              {navigationTop.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Route exact={item.exact} path={getBasePath(item.path)}>
                      {({ match }) => (
                        <TopNavigationButton
                          exact={item.exact}
                          icon={item.navigation.icon}
                          match={!!match}
                          path={item.path} label={t(item.navigation.title)}
                        />
                      )}
                    </Route>
                  </Fragment>
                )
              })}
            </HStack>
          </Flex>
          <Flex m='auto' right={0} mr={1}>
            <Flex
              borderRadius={10} bg={{ base: 'transparent', md: 'gray.900' }}
              align='center'
            >
              <Flex m={1}>
                <TopRightMenu viewer={props.rootQuery}>
                  {navigationMenu.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Route path={getBasePath(item.path)}>
                          {({ match }) => (
                            <TopRightMenuButton
                              match={!!match} path={item.path} label={item.navigation.title}
                              icon={item.navigation.icon}
                            />
                          )}
                        </Route>
                      </Fragment>
                    )
                  })}
                </TopRightMenu>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </>
      <Flex direction={{ base: 'column', md: 'row' }}>
        {navigationSidebar.map((sidebarGroup, index) => {
          return (
            <Fragment key={index}>
              <Route exact={sidebarGroup.exact} path={sidebarGroup.path}>
                <LeftSidebar title={t(sidebarGroup.navigation.title)}>
                  {Object.keys(sidebarGroup.routes).map((grouping, groupingIndex) => {
                    return (
                      <Fragment key={groupingIndex}>
                        {grouping !== 'undefined' && <Text mb={1}>{grouping}</Text>}
                        {(sidebarGroup.routes[grouping]).map((sidebarItem, sidebarItemIndex) => (
                          <LeftSidebarButton
                            key={sidebarItemIndex}
                            title={t(sidebarItem.navigation.title)}
                            path={sidebarItem.path}
                          />
                        )
                        )}
                      </Fragment>
                    )
                  })}
                </LeftSidebar>
              </Route>
            </Fragment>
          )
        })}
        <Box w='100%'>
          {props.children}
        </Box>
      </Flex>
    </>
  )
}
