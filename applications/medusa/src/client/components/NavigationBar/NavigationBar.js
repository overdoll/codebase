/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex, Spacer, Avatar, Button,
  IconButton,
  HStack, Box, useDisclosure, Stack, Heading, Tooltip
} from '@chakra-ui/react'
import { Fragment, useMemo, useContext } from 'react'
import Icon from '@//:modules/content/icon/Icon'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import { Switch, Route, Router } from 'react-router'
import { useHistory, useLocation } from '@//:modules/routing'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { AbilityContext } from '../../domain/Root/helpers/AbilityContext'
import { useRelayEnvironment } from 'react-relay'

import InterfaceArrowsTurnBackward
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-turn-backward.svg'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'

import NavItem from './components/navitem/NavItem'
import NavMenu from './components/navmenu/NavMenu'
import Items from './components/sidebar/items/Items'

type Props = {
  account: {
    username: string,
    avatar: string,
  },
  children: Node
}

export default function NavigationBar ({ account, children, refreshUserQuery }: Props): Node {
  const [t] = useTranslation('nav')

  const history = useHistory()

  const location = useLocation()

  const environment = useRelayEnvironment()

  const ability = useContext(AbilityContext)

  const [navigationSettings, navigationFiltered] = useMemo(() => computeCurrentActiveRoutes({
    location,
    ability,
    environment
  }), [ability])

  return (
    <Router history={history}>
      <Flex
        align='center' right={0} left={0} top={0} h='54px'
      />
      {navigationFiltered.includes(location.pathname)
        ? <SimplifiedNav history={history} t={t} />
        : <>
          <Flex
            zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0}
            position='fixed' h='54px'
            bg='gray.800'
          >
            <LeftMenu t={t} />
            <Flex
              zIndex={-1} position='absolute' w='100%' justify='center'
              margin='auto'
            >
              <HStack spacing={{ base: 2, md: 12, lg: 28 }}>
                {navigationSettings.map((item, index) => {
                  const label = t(item.title)

                  const route = item.firstRoute ? item.sidebar.routes[0].route : item.route

                  return (
                    !item.hidden && <Fragment key={index}>
                      <Route exact={item.exact} path={item.route}>
                        {({ match }) => (
                          <NavItem
                            key={item.route}
                            icon={item.icon}
                            route={route} label={label}
                            selected={!!match}
                          />
                        )}
                      </Route>
                    </Fragment>
                  )
                })}
              </HStack>
            </Flex>
            <RightMenu account={account} t={t} refresh={refreshUserQuery} ability={ability} />
          </Flex>
        </>}
      <Flex direction='row'>
        <Switch>
          {navigationSettings.map((item, index) => {
            const { isOpen, onToggle } = useDisclosure()
            return item.sidebar &&
              (<Route exact={item.exact} key={index} path={item.route}>
                {({ match }) => (
                  <>
                    <Flex
                      display={{
                        base: !isOpen ? 'block' : 'none',
                        md: isOpen ? 'block' : 'none'
                      }} position='fixed'
                    >
                      <IconButton
                        mt={4}
                        ml={2}
                        bg='transparent'
                        onClick={onToggle}
                        h='42px' w='42px'
                        icon={
                          <Icon
                            icon={InterfaceArrowsButtonRight} fill='gray.300'
                            m={3}
                          />
                        }
                      />
                    </Flex>
                    <Box
                      bg='gray.800'
                      w='260px'
                      h='calc(100vh - 54px)'
                      pr={4}
                      pb={6}
                      pl={2}
                      pt={4}
                      boxShadow='md'
                      overflowY='auto'
                      flexShrink={0}
                      position='fixed'
                      zIndex='sidebar'
                      display={{
                        base: isOpen ? 'block' : 'none',
                        md: !isOpen ? 'block' : 'none'
                      }}
                    >
                      <Button
                        bg='transparent'
                        pl={1} w='100%'
                        mb={4}
                        pr={1}
                        onClick={onToggle}
                      >
                        <Flex
                          w='100%'
                          align='center' justify='space-between'
                        >
                          <Heading color='gray.00' ml={1} size='md'>{t(item.sidebar.title)}</Heading>
                          <Icon
                            mr={1}
                            icon={InterfaceArrowsButtonLeft} fill='gray.300'
                            h='18px' w='18px'
                          />
                        </Flex>
                      </Button>
                      {item.sidebar &&
                        <Stack spacing={2}>
                          <Items
                            location={location.pathname}
                            items={item.sidebar.routes}
                          />
                        </Stack>}
                    </Box>
                  </>
                )}
              </Route>)
          })}
        </Switch>
        <Flex w='100%' direction='column'>
          {children}
        </Flex>
      </Flex>
    </Router>
  )
}

const SimplifiedNav = ({ history, t }) => {
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

const LeftMenu = ({ t }) => {
  return (
    <>
      <Flex display={{ base: 'none', md: 'flex' }} left={0} ml={3}>
        <Link to='/'>
          <Button textColor='red.500' variant='link' colorScheme='red'>{t('title')}</Button>
        </Link>
      </Flex>

    </>
  )
}

const RightMenu = ({ account, t, refresh, ability }) => {
  return (
    <Flex m='auto' right={0} mr={1}>
      <Flex
        borderRadius={10} bg={{ base: 'transparent', md: 'gray.900' }}
        align='center'
      >
        <Flex m={1}>
          {ability.can('manage', 'account')
            ? <Link to='/profile'>
              <Tooltip hasArrow label={t('nav.profile')} placement='bottom'>
                <Button
                  bg='transparent'
                  borderRadius={10}
                  h='42px' w='42px' mr={1}
                  display={{ base: 'none', md: 'flex' }}
                  aria-label={t('nav.profile')}
                >
                  <Avatar src={account.avatar} m={0} borderRadius={10} w='38px' h='38px' />
                </Button>
              </Tooltip>
            </Link>
            : <Link to='/join'>
              <IconButton
                bg='transparent'
                borderRadius={10}
                h='42px' w='42px' mr={1}
                display={['none', 'none', 'flex']}
                aria-label={t('nav.profile')}
                icon={<Icon icon={Login2} fill='gray.300' w='38px' m={1} h='38px' />}
              />
            </Link>}
          <NavMenu ability={ability} refresh={refresh} account={account} />
        </Flex>
      </Flex>
    </Flex>
  )
}
