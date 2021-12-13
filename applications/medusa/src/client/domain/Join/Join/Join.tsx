import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertIcon, CloseButton, useToast } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import Icon from '@//:modules/content/Icon/Icon'
import JoinForm from './JoinForm/JoinForm'
import { BadgeCircle } from '@//:assets/icons/navigation'
import type { JoinFragment$key } from '@//:artifacts/JoinFragment.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { useCookies } from 'react-cookie'
import { JoinMutation } from '@//:artifacts/JoinMutation.graphql'

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

  const [t] = useTranslation('auth')

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
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('authenticate.error.join'),
          isClosable: true
        })
      }
    })
  }

  // Ask user to authenticate
  return (
    <>
      <Helmet title='join' />
      <PageWrapper>
        <Icon
          icon={BadgeCircle}
          w={100}
          h={100}
          fill='primary.500'
          ml='auto'
          mr='auto'
          mb={8}
        />
        {(data == null && hadGrant) && (
          <Alert
            mb={2}
            status='error'
          >
            <AlertIcon />
            <AlertDescription>{t('expired')}</AlertDescription>
            <CloseButton
              position='absolute'
              right={2}
              top={2}
              onClick={clearGrant}
            />
          </Alert>
        )}
        <JoinForm
          onSubmit={onSubmit}
          loading={isInFlight}
        />
      </PageWrapper>
    </>
  )
}
