/**
 * @flow
 */
import type { Node } from 'react'
import { useState, Fragment, useEffect } from 'react'
import {
  Tabs, Flex, TabList, Tab, Heading, Spacer, Avatar, Button, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton,
  Text,
  Center
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
import LayoutCornersDashboard1
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/dashboard/layout-corners-dashboard-1.svg'
import InterfaceLogout
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/login-logout/interface-logout.svg'
import InterfaceArrowsTurnBackward
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-turn-backward.svg'
import LoginKey2
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-key-2.svg'
import InterfaceLogin
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/login-logout/interface-login.svg'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'

type Props = {
  currentRoute: string,
  disabledRoutes: Array<String>,
  user: {
    username: string,
  }
}

export default function NavigationBar ({ currentRoute, disabledRoutes, user }: Props): Node {
  const [tabIndex, setTabIndex] = useState(-1)

  const [t] = useTranslation('nav')

  useEffect(() => {
    switch (currentRoute) {
      case '/upload':
        setTabIndex(1)
        break
      case '/mod':
        setTabIndex(0)
        break
      default:
        setTabIndex(-1)
        break
    }
  }, [currentRoute])

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
          <Flex display={['none', 'none', 'flex']} left={0} ml={2}>
            <Link to='/'>
              <Button textColor='red.500' variant='link' colorScheme='red'>{t('title')}</Button>
            </Link>
          </Flex>
          <Flex zIndex={-1} position='absolute' w='100%' justify='center' margin='auto'>
            <Tabs
              isManual w={[200, 400, 600]} align='center' colorScheme='gray'
              variant='solid-rounded' index={tabIndex} onChange={(index) => setTabIndex(index)}
            >
              <TabList>
                <Spacer display={['none', 'flex']} />
                {user
                  ? <>
                    <Link to='/mod'>
                      <Tab
                        borderRadius={10}
                        _selected={{ bg: 'gray.500' }}
                        mt={2} mb={2} w='58px' h='40px' pl={4} pr={4}
                        aria-label={t('nav.mod')}
                      >
                        <Icon
                          icon={tabIndex === 0 ? LoginKeysBold : LoginKeys} w='fill' h='fill'
                          color={tabIndex === 0 ? 'transparent' : 'gray.300'}
                          fill={tabIndex === 0 ? 'gray.100' : 'transparent'}
                        />
                      </Tab>
                    </Link>
                    <Spacer />
                  </>
                  : null}
                <Link to='/upload'>
                  <Tab
                    borderRadius={10}
                    _selected={{ bg: 'gray.500' }}
                    mt={2} mb={2} w='58px' h='40px' pl={4} pr={4}
                    aria-label={t('nav.upload')}
                  >
                    <Icon
                      icon={tabIndex === 1 ? ContentBrushPenBold : ContentBrushPen} w='fill' h='fill'
                      color={tabIndex === 1 ? 'transparent' : 'gray.300'}
                      fill={tabIndex === 1 ? 'gray.100' : 'transparent'}
                    />
                  </Tab>
                </Link>
                <Spacer />
              </TabList>
            </Tabs>
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
                      display={['none', 'none', 'flex']}
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
                <Menu autoSelect={false}>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        bg='transparent'
                        borderRadius={10}
                        h='42px' w='42px' pr={2} pl={2} as={IconButton}
                        aria-label={t('nav.menu')}
                        icon={
                          <Icon
                            icon={LayoutCornersDashboard1} w='fill' h='fill'
                            fill={isOpen ? 'gray.100' : 'gray.300'}
                          />
                        }
                      />
                      <MenuList minW='300px' boxShadow='xs'>
                        {user
                          ? (
                            <>
                              <Link to='/profile'>
                                <MenuItem>
                                  <Avatar pointerEvents='none' mr={4} borderRadius={10} w='60px' h='60px' />
                                  <Flex pointerEvents='none' direction='column'>
                                    <Heading color='gray.100' size='md'>{user.username}</Heading>
                                    <Text color='gray.300' size='xs'>{t('menu.profile')}</Text>
                                  </Flex>
                                </MenuItem>
                              </Link>
                              <MenuDivider />
                              <MenuItem>
                                <Icon
                                  pointerEvents='none'
                                  icon={Login2} w='38px' h='38px' p={2}
                                  fill='orange.300' mr={2}
                                />
                                <Text pointerEvents='none' color='orange.300' size='md'>{t('menu.logout')}</Text>
                              </MenuItem>
                            </>
                            )
                          : (
                            <Link to='/join'>
                              <MenuItem align='center'>
                                <Icon icon={LoginKey2} color='green.500' w={8} h={8} mr={4} />
                                <Heading color='green.500' size='md'>{t('menu.join')}</Heading>
                              </MenuItem>
                            </Link>
                            )}
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </Flex>}
    </>
  )
}
