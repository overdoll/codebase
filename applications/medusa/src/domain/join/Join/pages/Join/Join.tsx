import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Stack } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import JoinForm from './JoinForm/JoinForm'
import { OverdollLogo } from '@//:assets/logos'
import type { JoinFragment$key } from '@//:artifacts/JoinFragment.graphql'
import { useCookies } from 'react-cookie'
import { JoinMutation } from '@//:artifacts/JoinMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { Alert, AlertCloseButton, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { useToast } from '@//:modules/content/ThemeComponents'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

interface Props {
  queryRef: JoinFragment$key | null
  hadGrant: boolean
  clearGrant: () => void
}

const JoinAction = graphql`
  mutation JoinMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        id
        email
        token
        sameDevice
      }
    }
  }
`

const JoinFragment = graphql`
  fragment JoinFragment on AuthenticationToken {
    email
  }
`

export default function Join ({
  queryRef,
  hadGrant,
  clearGrant
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<JoinMutation>(JoinAction)

  const data = useFragment(JoinFragment, queryRef)

  const notify = useToast()

  const [cookies, setCookie] = useCookies<string>(['token'])

  const onSubmit = ({ email }): void => {
    commit({
      variables: {
        input: {
          email: email
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
      },
      onCompleted () {
        trackFathomEvent('OP1VETUI', 1)
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error with joining`
        })
      }
    })
  }

  // Ask user to authenticate
  return (
    <>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        {(data == null && hadGrant) && (
          <Alert
            mb={2}
            status='warning'
          >
            <AlertIcon />
            <AlertDescription>
              <Trans>
                The login link has previously expired or is no longer valid. Please try logging in again.
              </Trans>
            </AlertDescription>
            <AlertCloseButton
              position='absolute'
              size='sm'
              right={2}
              top={2}
              onClick={clearGrant}
            />
          </Alert>
        )}
        <Icon
          icon={OverdollLogo}
          w={32}
          h={32}
          fill='primary.400'
        />
        <JoinForm
          onSubmit={onSubmit}
          loading={isInFlight}
        />
      </Stack>
    </>
  )
}
