/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex, Spacer, Avatar, Button,
  IconButton,
  HStack, Box, useDisclosure, Stack, Heading, Tooltip
} from '@chakra-ui/react'
import { Fragment, useMemo, useContext, useState } from 'react'
import Icon from '@//:modules/content/icon/Icon'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import { Switch, Route, Router } from 'react-router'
import { useHistory, useLocation } from '@//:modules/routing'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { AbilityContext } from '../../domain/Root/helpers/AbilityContext'

import LoginKeys
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-keys.svg'
import LoginKeysBold
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-keys.svg'
import ContentBrushPen
  from '@streamlinehq/streamlinehq/img/streamline-regular/content/content-creation/content-brush-pen.svg'
import ContentBrushPenBold
  from '@streamlinehq/streamlinehq/img/streamline-bold/content/content-creation/content-brush-pen.svg'
import InterfaceArrowsTurnBackward
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-turn-backward.svg'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'
import BirdHouse from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/home/bird-house.svg'
import BirdHouseBold from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/home/bird-house.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'

import NavItem from './components/navitem/NavItem'
import NavMenu from './components/navmenu/NavMenu'
import Items from './components/sidebar/items/Items'
import { sidebar as modSidebar } from '../../domain/Mod/sidebar/items'

type Props = {
  user: {
    username: string,
  },
  children: Node
}

export default function NavigationBar ({ user, children }: Props): Node {
  const [t] = useTranslation('nav')

  const navigationSettings = useMemo(() => computeCurrentActiveRoutes())

  const ability = useContext(AbilityContext)

  // console.log(ability.can('read', 'Article'))

  // console.log(navigationSettings)

  const disabledRoutes = ['/join']

  const history = useHistory()

  const location = useLocation()

  const getIcon = (resource) => {
    const [icon, setIcon] = useState('')

    resource.load().then((result) => {
      setIcon(result.default)
    })

    return icon
  }

  const navLinks = [
    {
      iconActive: BirdHouseBold,
      iconInactive: BirdHouse,
      label: t('nav.home'),
      route: '/',
      loginRequired: false,
      locked: false,
      exact: true
    },
    {
      iconActive: LoginKeysBold,
      iconInactive: LoginKeys,
      label: t('nav.mod'),
      route: '/mod',
      loginRequired: true,
      locked: false,
      sidebar: modSidebar(),
      sidebarTitle: t('sidebar.mod.title')
    },
    {
      iconActive: ContentBrushPenBold,
      iconInactive: ContentBrushPen,
      label: t('nav.upload'),
      route: '/upload',
      loginRequired: false,
      locked: true
    }
  ]

  return (
    <Router history={history}>
      <Flex
        align='center' right={0} left={0} top={0} h='54px'
      />
      {disabledRoutes.includes(location.pathname)
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
                  console.log(item.icon)

                  return (
                    <Fragment key={index}>
                      <Route exact={item.exact} path={item.route}>
                        {({ match }) => (
                          <NavItem
                            key={item.route}
                            icon={item.icon}
                            user={!!user} route={item.route} label={label}
                            selected={!!match}
                          />
                        )}
                      </Route>
                    </Fragment>
                  )
                })}
              </HStack>
            </Flex>
            <RightMenu user={user} t={t} />
          </Flex>
        </>}
      <Flex direction='row'>
        <Switch>
          {navLinks.map((item, index) => {
            const { isOpen, onToggle } = useDisclosure()

            return (
              <Route exact={item.exact} key={index} path={item.route}>
                {({ match }) => (
                  <>
                    <Flex
                      display={{
                        base: !isOpen && item.sidebar ? 'block' : 'none',
                        md: isOpen && item.sidebar ? 'block' : 'none'
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
                      as='nav'
                      pos='sticky'
                      bg='gray.800'
                      w='260px'
                      h='calc(100vh - 54px)'
                      pr={4}
                      pb={6}
                      pl={2}
                      pt={4}
                      overflowY='auto'
                      flexShrink={0}
                      position={{ base: 'absolute', md: 'sticky' }}
                      zIndex='sidebar'
                      display={{
                        base: isOpen && item.sidebar ? 'block' : 'none',
                        md: !isOpen && item.sidebar ? 'block' : 'none'
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
                          <Heading ml={1} size='md'>{item.sidebarTitle}</Heading>
                          <Icon
                            mr={1}
                            icon={InterfaceArrowsButtonLeft} fill='gray.300'
                            h='18px' w='18px'
                          />
                        </Flex>
                      </Button>
                      <Stack spacing={2}>
                        {item.sidebar?.map((sidebarItem, sidebarIndex) =>
                          (
                            <Fragment key={sidebarIndex}>
                              <Items
                                title={sidebarItem.title} route={sidebarItem.route}
                                selected={match}
                              />
                            </Fragment>
                          ))}
                      </Stack>
                    </Box>
                  </>
                )}
              </Route>
            )
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

const RightMenu = ({ user, t }) => {
  return (
    <Flex m='auto' right={0} mr={1}>
      <Flex
        borderRadius={10} bg={{ base: 'transparent', md: 'gray.900' }}
        align='center'
      >
        <Flex m={1}>
          {user
            ? <Link to='/profile'>
              <Tooltip hasArrow label={t('nav.profile')} placement='bottom'>
                <Button
                  bg='transparent'
                  borderRadius={10}
                  h='42px' w='42px' mr={1}
                  display={{ base: 'none', md: 'flex' }}
                  aria-label={t('nav.profile')}
                >
                  <Avatar m={0} borderRadius={10} w='38px' h='38px' />
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
          <NavMenu user={user} />
        </Flex>
      </Flex>
    </Flex>
  )
}
