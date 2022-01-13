import { useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import { useHistory } from '@//:modules/routing'
import { useEffect } from 'react'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

const LogoutButtonGQL = graphql`
  mutation LogoutMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

export default function Logout (): JSX.Element {
  const [logout, isLoggingOut] = useMutation(LogoutButtonGQL)

  const history = useHistory()

  const notify = useToast()

  useEffect(() => {
    logout({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t`You have been logged out`,
          isClosable: true
        })
      },
      updater: (store, payload) => {
        history.replace('/')

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
          title: t`There was an error logging out`,
          isClosable: true
        })
      }
    })
  }, [])

  return <CenteredSpinner />
}
