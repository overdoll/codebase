import { useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { SafetyExitDoorLeft } from '@//:assets/icons/navigation'
import { useHistory } from '@//:modules/routing'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { Trans } from '@lingui/macro'

const LogoutButtonGQL = graphql`
  mutation DropdownMenuButtonLogoutMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

export default function DropdownMenuButtonLogout (): JSX.Element {
  const [logout, isLoggingOut] = useMutation(LogoutButtonGQL)

  const history = useHistory()

  const onLogout = (): void => {
    logout({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: <Trans>You have been logged out</Trans>,
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
          title: <Trans>There was an error logging out</Trans>,
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
      label={
        <Trans>
          Log Out
        </Trans>
      }
    />
  )
}
