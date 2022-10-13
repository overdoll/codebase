import { graphql } from 'react-relay'
import posthog from 'posthog-js'
import { t } from '@lingui/macro'
import { useMutation } from 'react-relay/hooks'
import { useEmptyJoinFormMutation } from '@//:artifacts/useEmptyJoinFormMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useCookies } from 'react-cookie'

interface Props {
  onSubmit?: () => void
}

interface UseEmptyJoinFormReturn {
  onSubmit: (email) => void
  isInFlight: boolean
}

const Mutation = graphql`
  mutation useEmptyJoinFormMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        id
        email
        token
        sameDevice
        method
        ...ViewAuthenticationTokenJoinFragment
      }
    }
  }
`

export default function useEmptyJoinForm (props: Props): UseEmptyJoinFormReturn {
  const { onSubmit: onSubmitCallback } = props

  const [commit, isInFlight] = useMutation<useEmptyJoinFormMutation>(Mutation)

  const notify = useToast()

  const [cookies, setCookie] = useCookies<string>(['token'])

  const onSubmit = (email): void => {
    commit({
      variables: {
        input: {
          email: email,
          method: 'CODE'
        }
      },
      updater: (store, payload) => {
        if (payload.grantAuthenticationToken?.authenticationToken == null) {
          return
        }

        const token = payload.grantAuthenticationToken.authenticationToken.token
        const id = payload.grantAuthenticationToken.authenticationToken.id

        // after the mutation, update the root 'viewAuthenticationToken' so that the query can start the lobby queries
        const node = store.get(id)

        if (node == null) {
          return
        }

        node.setValue(email, 'email')

        let tokenCookie = cookies.token

        if (tokenCookie != null) {
          tokenCookie = tokenCookie.split(';')[0]
        }

        store
          .getRoot()
          .setLinkedRecord(node, `viewAuthenticationToken(token:"${tokenCookie as string ?? ''}")`)

        // store cookie in token for later
        setCookie('token', `${token};${email as string}`, {
          path: '/',
          secure: true,
          sameSite: 'lax'
        })
        posthog?.capture('submit-email')
        onSubmitCallback?.()
      },
      onCompleted () {
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error with joining`
        })
      }
    })
  }

  return {
    onSubmit,
    isInFlight
  }
}
