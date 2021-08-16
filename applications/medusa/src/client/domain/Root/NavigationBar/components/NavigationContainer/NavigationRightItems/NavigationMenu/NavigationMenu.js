/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  Avatar, Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'
import LoginKey2
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-key-2.svg'
import InterfacePageControllerSettings
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-settings.svg'
import InterfaceArrowsShrink3
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-3.svg'

import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'

import NavLink from '@//:modules/routing/NavLink'
import { graphql, useFragment } from 'react-relay/hooks'
import { useContext } from 'react'
import { AbilityContext } from '../../../../../helpers/AbilityContext'
import type { TopRightMenuFragment$key } from '@//:artifacts/TopRightMenuFragment.graphql'
import LogoutButton from './LogoutButton/LogoutButton'
import ProfileButton from './ProfileButton/ProfileButton'

const AccountFragmentGQL = graphql`
  fragment TopRightMenuFragment on Account {
    ...ProfileButtonFragment
    avatar
  }
`

type Props = {
  viewer: TopRightMenuFragment$key,
  children: Node,
}

export default function NavigationMenu (props: Props): Node {
  const [t] = useTranslation('navigation')

  const viewer = useFragment(AccountFragmentGQL, props.viewer)

  const ability = useContext(AbilityContext)

  // Show a different menu on the top right if the user is not logged in
  if (ability.cannot('manage', 'account')) {
    return (
      <>
        <Link to='/join'>
          <IconButton
            bg='transparent'
            borderRadius={10}
            h='42px' w='42px' mr={1}
            display={['none', 'none', 'flex']}
            aria-label={t('nav.profile')}
            icon={<Icon icon={Login2} fill='gray.300' w='38px' m={1} h='38px' />}
          />
        </Link>
        <Menu autoSelect={false}>
          {({ isOpen }) => (
            <>
              <Tooltip hasArrow label={t('nav.menu')} placement='bottom'>
                <MenuButton
                  bg='transparent'
                  borderRadius={10}
                  h='42px' w='42px' pr={2} pl={2} as={IconButton}
                  aria-label={t('nav.menu')}
                  icon={
                    <Icon
                      icon={isOpen ? InterfaceArrowsShrink3 : InterfacePageControllerSettings} w='fill' h='fill'
                      fill={isOpen ? 'gray.100' : 'gray.300'}
                    />
                  }
                />
              </Tooltip>
              <MenuList minW='300px' boxShadow='xs'>
                <Link to='/join'>
                  <MenuItem align='center'>
                    <Icon icon={LoginKey2} color='green.500' w={8} h={8} mr={4} />
                    <Heading color='green.500' size='md'>{t('menu.join')}</Heading>
                  </MenuItem>
                </Link>
              </MenuList>
            </>
          )}
        </Menu>
      </>
    )
  }

  return (
    <>
      <NavLink to='/profile'>
        {(isActive) => (
          <Tooltip hasArrow label={t('nav.profile')} placement='bottom'>
            <Button
              bg='transparent'
              borderRadius={10}
              h='42px' w='42px' mr={1}
              display={{ base: 'none', md: 'flex' }}
              aria-label={t('nav.profile')}
            >
              <Avatar
                src={viewer.avatar} m={0} borderRadius='25%'
                w='38px' h='38px'
              />
            </Button>
          </Tooltip>
        )}
      </NavLink>
      <Menu autoSelect={false}>
        {({ isOpen }) => (
          <>
            <Tooltip hasArrow label={t('nav.menu')} placement='bottom'>
              <MenuButton
                bg='transparent'
                borderRadius={10}
                h='42px' w='42px' pr={2} pl={2} as={IconButton}
                aria-label={t('nav.menu')}
                icon={
                  <Icon
                    icon={isOpen ? InterfaceArrowsShrink3 : InterfacePageControllerSettings} w='fill' h='fill'
                    fill={isOpen ? 'gray.100' : 'gray.300'}
                  />
                }
              />
            </Tooltip>
            <MenuList minW='300px' boxShadow='xs'>
              <ProfileButton viewer={viewer} />
              <MenuDivider />
              {props.children}
              <LogoutButton />
            </MenuList>
          </>
        )}
      </Menu>
    </>
  )
}
