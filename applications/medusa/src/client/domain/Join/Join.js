/**
 * @flow
 */
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { Node } from 'react'
import { useContext, useState } from 'react'
import Register from '../../components/Register/Register'
import { useTranslation } from 'react-i18next'
import Lobby from './Lobby'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, CloseButton, Flex, useToast } from '@chakra-ui/react'
import { RootContext } from '../Root/Root'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg'
import type { JoinFragment$key } from '@//:artifacts/JoinFragment.graphql'
import { useFlash } from '@//:modules/flash'
import { Helmet } from 'react-helmet-async'
import JoinForm from './JoinForm'

const JoinAction = graphql`
  mutation JoinMutation($data: AuthenticationInput!) {
    authenticate(data: $data)
  }
`

const RootFragmentGQL = graphql`
  fragment JoinFragment on Authentication {
    cookie {
      redeemed
      registered
      email
    }
  }
`

export default function Join (): Node {
  const rootQuery = useContext(RootContext)

  const data = useFragment<?JoinFragment$key>(
    RootFragmentGQL,
    rootQuery?.authentication
  )

  const [t] = useTranslation('auth')

  const [commit, isInFlight] = useMutation(JoinAction)

  const notify = useToast()
  const { read, flush } = useFlash()

  // Receiving a subscription response
  const [authInfo, setAuthInfo] = useState({ authListener: null })

  // Waiting for a subscription
  const [waiting, setWaiting] = useState(false)

  const [email, setEmail] = useState(null)

  const changeAuth = data => {
    setAuthInfo(data)
    setWaiting(false)
  }

  const onSubmit = (val) => {
    setEmail(val.email)
    commit({
      variables: {
        data: {
          email: val.email
        }
      },
      onCompleted (data) {
        setWaiting(true)
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('authenticate.error.join'),
          isClosable: true
        })
      }
    })
  }

  // Checks for various types of states
  const emptySubscriptionResponse = authInfo.authListener === null
  const emptyAuthCookie = !!data?.cookie === false

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (
    waiting ||
    (emptySubscriptionResponse && !emptyAuthCookie && !data?.cookie?.redeemed)
  ) {
    return (
      <Lobby
        // Use auth cookie's email as backup, since it may not be here after a refresh
        email={!emptyAuthCookie ? data?.cookie?.email : email}
        onReceive={changeAuth}
      />
    )
  }

  // User not registered - when we either receive this response from a subscription, or a page refresh
  const subscriptionNotRegistered =
    !emptySubscriptionResponse &&
    authInfo.authListener?.cookie.registered === false

  // Cookie was redeemed, but the user is not registered
  const cookieRedeemedNotRegistered =
    !emptyAuthCookie && data?.cookie?.redeemed && !data.cookie?.registered

  // We already have auth cookie data, and it's been redeemed. We want the user to registers
  if (subscriptionNotRegistered || cookieRedeemedNotRegistered) {
    return <Register />
  }

  const error = read('login.notify')

  // Ask user to authenticate
  return (
    <>
      <Helmet title='join' />
      <Center mt={40}>
        <Flex w={['sm', 'md']} direction='column' align='center'>
          <Icon
            icon={SignBadgeCircle}
            w={100}
            h={100}
            color='red.500'
            ml='auto'
            mr='auto'
            mb={8}
          />
          {error &&
          (
            <Alert mb={2} status='error'>
              <AlertIcon />
              <AlertTitle mr={2}>{error}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <CloseButton
                position='absolute'
                right='8px'
                top='8px'
                onClick={() => flush('login.notify')}
              />
            </Alert>
          )}
          <JoinForm onSubmit={onSubmit} loading={isInFlight} />
        </Flex>
      </Center>
    </>
  )
}
