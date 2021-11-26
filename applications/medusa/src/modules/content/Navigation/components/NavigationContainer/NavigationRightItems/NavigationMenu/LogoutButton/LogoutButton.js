/**
 * @flow
 */
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import { MenuItem, Text, useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import SafetyExitDoorLeft
  from '@streamlinehq/streamlinehq/img/streamline-bold/wayfinding/safety/safety-exit-door-left.svg'
import { useHistory } from '@//:modules/routing'

const LogoutButtonGQL = graphql`
  mutation LogoutButtonMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

export default function LogoutButton (): Node {
  const [logout, isLoggingOut] = useMutation(LogoutButtonGQL)

  const [t] = useTranslation('navigation')

  const history = useHistory()

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
        history.push('/')
        // listen to history until its at a certain path and then logout
        // to fix double refresh bug
        const viewer = store
          .getRoot()
          .getLinkedRecord('viewer')

        viewer.invalidateRecord()
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
    <MenuItem onClick={() => onLogout()} isDisabled={isLoggingOut}>
      <Icon
        pointerEvents='none'
        icon={SafetyExitDoorLeft} w='38px' h='38px' p={2}
        fill='orange.300' mr={2}
      />
      <Text pointerEvents='none' color='orange.300' size='md'>{t('menu.logout')}</Text>
    </MenuItem>
  )
}
