/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton, MenuDivider,
  MenuItem,
  MenuList, Text, Tooltip, useToast
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Link from '@//:modules/routing/Link'
import LoginKey2
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-key-2.svg'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'
import InterfacePageControllerSettings
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/page-controller/interface-page-controller-settings.svg'
import InterfaceArrowsShrink3
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-3.svg'
import SafetyExitDoorLeft
  from '@streamlinehq/streamlinehq/img/streamline-bold/wayfinding/safety/safety-exit-door-left.svg'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'

import { useHistory } from '@//:modules/routing'
import { graphql, useMutation } from 'react-relay/hooks'

const logoutGQL = graphql`
  mutation NavMenuMutation {
    logout {
      validation {
        code
      }
      ok
    }
  }
`

type Props = {
  account: {
    username: string,
  }
}

export default function NavMenu ({ refresh, ability, account }: Props): Node {
  const [logout, isLoggingOut] = useMutation(logoutGQL)

  const [t] = useTranslation('nav')

  const history = useHistory()

  const onLogout = () => {
    logout({
      variables: {},
      onCompleted () {
        history.push('/')
        refresh()
        notify({
          status: 'success',
          title: t('logout.success'),
          isClosable: true
        })
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

  return (
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
            {ability.can('manage', 'account')
              ? (
                <>
                  <Link to='/profile'>
                    <MenuItem>
                      <Avatar src={account.avatar} pointerEvents='none' mr={4} borderRadius={10} w='60px' h='60px' />
                      <Flex pointerEvents='none' direction='column'>
                        <Heading color='gray.100' size='md'>{account.username}</Heading>
                        <Text color='gray.300' size='xs'>{t('menu.profile')}</Text>
                      </Flex>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link to='/s/profile'>
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
  )
}
