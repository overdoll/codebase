import { graphql, useMutation } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import { useEffect } from 'react'
import CenteredSpinner from '@//:modules/content/Placeholder/Loading/CenteredSpinner/CenteredSpinner'
import { useToast } from '@//:modules/content/ThemeComponents'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import type { LogoutMutation } from '@//:artifacts/LogoutMutation.graphql'
import { invalidateToken } from '../../join/Join/support/support'

const LogoutButtonGQL = graphql`
  mutation LogoutMutation {
    revokeAccountAccess {
      revokedAccountId
    }
  }
`

const Logout: PageProps<{}> = () => {
  const [logout] = useMutation<LogoutMutation>(LogoutButtonGQL)

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
        if (payload?.revokeAccountAccess?.revokedAccountId != null) {
          store.get(payload.revokeAccountAccess.revokedAccountId)?.invalidateRecord()
        }
        // TODO the mutation should also return the revokedAuthenticationToken so we can invalidate and clear it in the store
        invalidateToken(store)
        void router.push('/')
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
