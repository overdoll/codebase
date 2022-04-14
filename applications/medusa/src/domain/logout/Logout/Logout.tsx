import { graphql, useMutation } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import { useEffect } from 'react'
import CenteredSpinner from '@//:modules/content/Placeholder/Loading/CenteredSpinner/CenteredSpinner'
import { useToast } from '@//:modules/content/ThemeComponents'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'

const LogoutButtonGQL = graphql`
  mutation LogoutMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

const Logout: PageProps<{}> = () => {
  const [logout] = useMutation(LogoutButtonGQL)

  const router = useRouter()

  const notify = useToast()

  useEffect(() => {
    logout({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t`You have been logged out`
        })
      },
      updater: (store, payload) => {
        void router.replace('/')

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
          title: t`There was an error logging out`
        })
      }
    })
  }, [])

  return <CenteredSpinner />
}

export default Logout
