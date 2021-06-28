/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex, Spacer, Avatar, Button,
  IconButton,
  HStack
} from '@chakra-ui/react'
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

import MainNav from './components/mainnav/MainNav'
import NavMenu from './components/navmenu/NavMenu'

type Props = {
  currentRoute: string,
  disabledRoutes: Array<String>,
  user: {
    username: string,
  }
}

export default function NavigationBar ({ currentRoute, disabledRoutes, user }: Props): Node {
  const [t] = useTranslation('nav')

  const navLinks = [
    {
      iconActive: BirdHouseBold,
      iconInactive: BirdHouse,
      label: t('nav.home'),
      route: '/home',
      loginRequired: false,
      locked: false
    },
    {
      iconActive: LoginKeysBold,
      iconInactive: LoginKeys,
      label: t('nav.mod'),
      route: '/mod',
      loginRequired: true,
      locked: false
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
        : <Flex
            zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0} position='fixed' h='54px'
            bg='gray.800'
          >
          <Flex display={{ base: 'none', md: 'flex' }} left={0} ml={2}>
            <Link to='/'>
              <Button textColor='red.500' variant='link' colorScheme='red'>{t('title')}</Button>
            </Link>
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
                />
              ))}
            </HStack>
          </Flex>
          <Flex m='auto' right={0} mr={1}>
            <Flex
              borderRadius={10} bg='gray.900'
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
        </Flex>}
    </>
  )
}
