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
import { ClickableBox } from '@//:modules/content/PageLayout'
import MenuButton from '@//:modules/content/Navigation/components/MenuButton/MenuButton'

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
    <MenuButton
      onClick={() => onLogout()}
      isDisabled={isLoggingOut}
      color='orange.300'
      icon={SafetyExitDoorLeft}
      label={t('menu.logout')}
    />
  )
}
