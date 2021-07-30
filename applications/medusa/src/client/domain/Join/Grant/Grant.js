/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import { useEffect } from 'react'
import { useHistory } from '@//:modules/routing'

const GrantAction = graphql`
  mutation GrantMutation {
    grantAccountAccessWithAuthenticationToken {
      validation
      account {
        id
      }
    }
  }
`

export default function Grant (): Node {
  const [commit] = useMutation(GrantAction)

  const notify = useToast()

  const [t] = useTranslation('auth')

  const history = useHistory()

  // grant account access
  useEffect(() => {
    commit({
      variables: {},
      updater: (store, payload) => {
        // basically just invalidate the viewer so it can be re-fetched
        const viewer = store
          .getRoot()
          .getLinkedRecord('viewer')

        if (viewer != null) {
          viewer.invalidateRecord()
        }

        history.push('/profile')
      },
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('register.error'),
          isClosable: true
        })
      }
    })
  }, [])

  // Ask user to authenticate
  return <CenteredSpinner />
}
