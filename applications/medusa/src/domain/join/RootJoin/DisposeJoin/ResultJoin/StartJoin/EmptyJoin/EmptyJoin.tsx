import { graphql, useMutation } from 'react-relay/hooks'
import { Heading, Stack } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { OverdollLogoOutline } from '@//:assets/logos'
import { useCookies } from 'react-cookie'
import { EmptyJoinMutation } from '@//:artifacts/EmptyJoinMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import EmptyJoinForm from './EmptyJoinForm/EmptyJoinForm'

const Mutation = graphql`
  mutation EmptyJoinMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        id
        email
        token
        sameDevice
        ...ViewAuthenticationTokenJoinFragment
      }
    }
  }
`

export default function EmptyJoin (): JSX.Element {
  const [commit, isInFlight] = useMutation<EmptyJoinMutation>(Mutation)

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
    <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
      <Stack spacing={4}>
        <Icon
          icon={OverdollLogoOutline}
          w={16}
          h={16}
          fill='gray.00'
        />
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            Join the next digital adult content platform.
          </Trans>
        </Heading>
      </Stack>
      <EmptyJoinForm
        onSubmit={onSubmit}
        isLoading={isInFlight}
      />
    </Stack>
  )
}
