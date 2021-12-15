import { useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import { SafetyExitDoorLeft } from '@//:assets/icons/navigation'
import { useHistory } from '@//:modules/routing'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'

const LogoutButtonGQL = graphql`
  mutation DropdownMenuButtonLogoutMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

export default function DropdownMenuButtonLogout (): JSX.Element {
  const [logout, isLoggingOut] = useMutation(LogoutButtonGQL)

  const [t] = useTranslation('navigation')

  const history = useHistory()

  const onLogout = (): void => {
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

        if (viewer != null) {
          viewer.invalidateRecord()
        }
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
    <HorizontalNavigationDropdownMenu.Button
      onClick={() => onLogout()}
      isDisabled={isLoggingOut}
      color='orange.300'
      icon={SafetyExitDoorLeft}
      label={t('menu.logout')}
    />
  )
}
