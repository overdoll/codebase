/**
 * @flow
 */
import type { Node } from 'react'
import { Fragment, useContext, useMemo } from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import { Route, Switch } from 'react-router'
import { useHistory, useLocation } from '@//:modules/routing'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { AbilityContext } from '../helpers/AbilityContext'
import { useRelayEnvironment } from 'react-relay'

import InterfaceArrowsTurnBackward
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-turn-backward.svg'

import TopNavigationItem from './components/TopNavigationItem/TopNavigationItem'
import SidebarItem from './components/Sidebar/SidebarItem/SidebarItem'
import TopRightMenu from './components/TopRightMenu/TopRightMenu'
import Sidebar from './components/Sidebar/Sidebar'
import type { TopRightMenuFragment$key } from '@//:artifacts/TopRightMenuFragment.graphql'

type Props = {
  children: Node,
  rootQuery: TopRightMenuFragment$key
}

export default function NavigationBar (props: Props): Node {
  const [t] = useTranslation('nav')

  const history = useHistory()

  const location = useLocation()

  const environment = useRelayEnvironment()

  const ability = useContext(AbilityContext)

  const [navigationSettings, navigationFiltered] = useMemo(() => computeCurrentActiveRoutes({
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
              {navigationSettings.map((item, index) => {
                const route = item.firstRoute ? item.sidebar.routes[0].route : item.route
                if (item.hidden) {
                  return null
                }
                return (
                  <Fragment key={index}>
                    <Route exact={item.exact} path={item.route}>
                      {({ match }) => (
                        <TopNavigationItem
                          key={item.route}
                          icon={item.icon}
                          route={route} label={t(item.title)}
                          selected={!!match}
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
                <TopRightMenu viewer={props.rootQuery} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </>
      <Flex direction='row'>
        {navigationSettings.map((item, index) => {
          if (item.sidebar) {
            return (
              <Fragment key={index}>
                <Route exact={item.exact} path={item.route}>
                  <Sidebar title={t(item.sidebar.title)}>
                    {item.sidebar.routes?.map((item, index) => (
                      <SidebarItem
                        key={index}
                        title={t(item?.title)}
                        match={location.pathname === item.route}
                        route={item.route}
                      />
                    ))}
                  </Sidebar>
                </Route>
              </Fragment>
            )
          }
          return null
        })}
        <Box w='100%'>
          {props.children}
        </Box>
      </Flex>
    </>
  )
}
