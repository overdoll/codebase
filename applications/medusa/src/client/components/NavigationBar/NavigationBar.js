/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex, Spacer, Avatar, Button,
  IconButton,
  HStack, Box, useDisclosure, List, ListItem, Stack, Heading
} from '@chakra-ui/react'
import { useState } from 'react'
import Icon from '@//:modules/content/icon/Icon'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'

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
import InterfaceSettingMenu1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-menu-1.svg'
import Close from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/form-validation/close.svg'

import MainNav from './components/mainnav/MainNav'
import NavMenu from './components/navmenu/NavMenu'
import { useHistory } from '@//:modules/routing'

type Props = {
  currentRoute: string,
  disabledRoutes: Array<String>,
  user: {
    username: string,
  },
  children: Node
}

export default function NavigationBar ({ currentRoute, disabledRoutes, user, children }: Props): Node {
  const [t] = useTranslation('nav')

  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()

  const [currentSidebar, setCurrentSidebar] = useState(null)

  const history = useHistory()

  const modSidebar = [
    {
      title: 'Queue',
      route: '/mod/queue'
    },
    {
      title: 'History',
      route: '/mod/history'
    }
  ]

  const navLinks = [
    {
      iconActive: BirdHouseBold,
      iconInactive: BirdHouse,
      label: t('nav.home'),
      route: '/home',
      loginRequired: false,
      locked: false,
      sidebar: null
    },
    {
      iconActive: LoginKeysBold,
      iconInactive: LoginKeys,
      label: t('nav.mod'),
      route: '/mod',
      loginRequired: true,
      locked: false,
      sidebar: modSidebar
    },
    {
      iconActive: ContentBrushPenBold,
      iconInactive: ContentBrushPen,
      label: t('nav.upload'),
      route: '/upload',
      loginRequired: false,
      locked: true,
      sidebar: null
    }
  ]

  const onChangeSidebar = (sidebar) => {
    if (isOpen) {
      onClose()
    }
    setCurrentSidebar(sidebar)
    if (sidebar) {
      history.replace(sidebar[0].route)
    }
  }

  return (
    <>
      <Flex
        align='center' right={0} left={0} top={0} h='54px'
      />
      {disabledRoutes.includes(currentRoute)
        ? <Flex
            zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0} position='fixed' h='54px'
            bg='transparent'
          >
          <Link to='/'>
            <Button ml={2}>{t('title')}</Button>
          </Link>
          <Spacer />
          <IconButton
            onClick={() => history.back()}
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
        : <>
          <Flex
            zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0} position='fixed' h='54px'
            bg='gray.800'
          >
            <Flex display={{ base: 'none', md: 'flex' }} left={0} ml={2}>
              <Link to='/'>
                <Button textColor='red.500' variant='link' colorScheme='red'>{t('title')}</Button>
              </Link>
            </Flex>
            <Flex display={{ base: currentSidebar ? 'flex' : 'none', md: 'none' }} left={0} ml={2}>
              <IconButton
                bg='transparent'
                borderRadius={10}
                onClick={onToggle}
                h='42px' w='42px'
                display={{ base: 'flex', md: 'none' }}
                aria-label={t('nav.profile')}
                icon={<Icon
                  icon={isOpen ? Close : InterfaceSettingMenu1} fill={isOpen ? 'gray.100' : 'gray.300'}
                  m={3}
                      />}
              />
            </Flex>
            <Flex zIndex={-1} position='absolute' w='100%' justify='center' margin='auto'>
              <HStack spacing={{ base: 2, md: 12, lg: 28 }}>
                {navLinks.map((item) => (
                  <MainNav
                    key={item.route}
                    currentRoute={currentRoute} user={!!user} navRoute={item.route} iconActive={item.iconActive}
                    iconInactive={item.iconInactive} label={item.label}
                    locked={item.locked}
                    loginRequired={item.loginRequired}
                    onInteract={() => (onChangeSidebar(item.sidebar))}
                  />
                ))}
              </HStack>
            </Flex>
            <Flex m='auto' right={0} mr={1}>
              <Flex
                borderRadius={10} bg={{ base: 'transparent', md: 'gray.900' }}
                align='center'
              >
                <Flex m={1}>
                  {user
                    ? <Link to='/profile'>
                      <Button
                        bg='transparent'
                        borderRadius={10}
                        h='42px' w='42px' mr={1}
                        display={{ base: 'none', md: 'flex' }}
                        aria-label={t('nav.profile')}
                      >
                        <Avatar m={0} borderRadius={10} w='38px' h='38px' />
                      </Button>
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

          </Flex>
          <Flex direction='row'>
            {currentSidebar
              ? <Box
                  as='nav'
                  aria-label='Main Navigation'
                  pos='sticky'
                  bg='gray.800'
                  sx={{
                    overscrollBehavior: 'contain'
                  }}
                  w='260px'
                  h='calc(100vh - 54px)'
                  pr='4'
                  pb='6'
                  pl='2'
                  pt='4'
                  overflowY='auto'
                  flexShrink={0}
                  position={{ base: 'absolute', md: 'sticky' }}
                  zIndex='sidebar'
                  display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
                >
                <Stack spacing={2}>
                  {currentSidebar.map((item) => (
                    <Link key={item.title} to={item.route}>
                      <Button
                        borderRadius={5} pt={3} pb={3}
                        textAlign='left' w='100%'
                        variant={currentRoute === item.route ? 'solid' : 'ghost'}
                      >
                        <Heading
                          color={currentRoute === item.route ? 'gray.100' : 'gray.300'} size='sm' w='100%'
                          textAlign='left'
                        >
                          {item.title}
                        </Heading>
                      </Button>
                    </Link>
                  ))}
                </Stack>
              </Box>
              : null}
            <Flex w='100%' direction='column'>
              {children}
            </Flex>
            <Flex
              display={{ base: isOpen ? 'flex' : 'none', md: 'none' }} bg='dimmers.500' w='100%' h='calc(100vh - 54px)'
              position='absolute' overflow='hidden'
              onClick={onClose}
            />
          </Flex>
        </>}
    </>
  )
}
