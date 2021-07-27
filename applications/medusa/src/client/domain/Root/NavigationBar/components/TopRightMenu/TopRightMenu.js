/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  Avatar, Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'
import LoginKey2
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-key-2.svg'
import InterfacePageControllerSettings
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-settings.svg'
import InterfaceArrowsShrink3
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-3.svg'
import SafetyExitDoorLeft
  from '@streamlinehq/streamlinehq/img/streamline-bold/wayfinding/safety/safety-exit-door-left.svg'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'

import { useHistory } from '@//:modules/routing'
import { graphql, useMutation, useFragment } from 'react-relay/hooks'
import { useContext } from 'react'
import { AbilityContext } from '../../../helpers/AbilityContext'
import type { TopRightMenuFragment$key } from '@//:artifacts/TopRightMenuFragment.graphql'

const logoutGQL = graphql`
  mutation TopRightMenuMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

const accountGQL = graphql`
  fragment TopRightMenuFragment on Account {
    username
    avatar
  }
`

type Props = {
  viewer: TopRightMenuFragment$key
}

export default function TopRightMenu (props: Props): Node {
  const [logout, isLoggingOut] = useMutation(logoutGQL)

  const viewer = useFragment(accountGQL, props.viewer)

  const [t] = useTranslation('nav')

  const history = useHistory()

  const ability = useContext(AbilityContext)

  const onLogout = () => {
    logout({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t('logout.success'),
          isClosable: true
        })
      },
      updater: (store, payload) => {
        store
          .getRoot()
          .setValue(null, 'viewer')
        history.push('/')
      },
      onError () {
        notify({
          status: 'error',
          title: t('logout.error'),
          isClosable: true
        })
      }
    })
  }

  const notify = useToast()

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
      <Link to='/profile'>
        <Tooltip hasArrow label={t('nav.profile')} placement='bottom'>
          <Button
            bg='transparent'
            borderRadius={10}
            h='42px' w='42px' mr={1}
            display={{ base: 'none', md: 'flex' }}
            aria-label={t('nav.profile')}
          >
            <Avatar src={viewer.avatar} m={0} borderRadius='25%' w='38px' h='38px' />
          </Button>
        </Tooltip>
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
              <>
                <Link to='/profile'>
                  <MenuItem>
                    <Avatar
                      src={viewer.avatar} pointerEvents='none' mr={4} borderRadius='25%' w='60px'
                      h='60px'
                    />
                    <Flex pointerEvents='none' direction='column'>
                      <Heading color='gray.100' size='md'>{viewer.username}</Heading>
                      <Text color='gray.300' size='xs'>{t('menu.profile')}</Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <Link to='/settings/profile'>
                  <MenuItem>
                    <Icon
                      pointerEvents='none'
                      icon={InterfaceSettingCog} w='38px' h='38px' p={2}
                      fill='gray.100' mr={2}
                    />
                    <Text pointerEvents='none' color='gray.100' size='md'>{t('menu.settings')}</Text>
                  </MenuItem>
                </Link>
                <MenuItem onClick={() => onLogout()} isDisabled={isLoggingOut}>
                  <Icon
                    pointerEvents='none'
                    icon={SafetyExitDoorLeft} w='38px' h='38px' p={2}
                    fill='orange.300' mr={2}
                  />
                  <Text pointerEvents='none' color='orange.300' size='md'>{t('menu.logout')}</Text>
                </MenuItem>
              </>
            </MenuList>
          </>
        )}
      </Menu>
    </>
  )
}
