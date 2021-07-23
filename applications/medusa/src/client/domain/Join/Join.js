/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, useMutation, usePreloadedQuery, useQueryLoader, useRelayEnvironment } from 'react-relay/hooks'
import { commitLocalUpdate } from 'react-relay'
import type { Node } from 'react'
import { useCallback, useEffect, useState } from 'react'
import Register from '../Register/Register'
import { useTranslation } from 'react-i18next'
import Lobby from './Lobby/Lobby'
import { Alert, AlertDescription, AlertIcon, Center, CloseButton, Flex, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useFlash } from '@//:modules/flash'
import { Helmet } from 'react-helmet-async'
import JoinForm from './JoinForm/JoinForm'
import type { JoinQuery } from '@//:artifacts/JoinQuery.graphql'
import { useHistory } from '@//:modules/routing'

type Props = {
  prepared: {
    joinQuery: PreloadedQueryInner<JoinQuery>,
  },
  children: Node,
};

const JoinAction = graphql`
  mutation JoinMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        email
      }
    }
  }
`

const JoinTokenStatus = graphql`
  query JoinQuery {
    viewAuthenticationToken {
      verified
      email
      accountStatus {
        registered
        multiFactor
      }
    }
  }
`

export default function Join (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader<JoinQuery>(
    JoinTokenStatus,
    props.prepared.joinQuery
  )

  const environment = useRelayEnvironment()

  const data = usePreloadedQuery<JoinQuery>(JoinTokenStatus, queryRef)

  const history = useHistory()

  const [t] = useTranslation('auth')

  const [commit, isInFlight] = useMutation(JoinAction)

  const notify = useToast()
  const { read, flush } = useFlash()

  const [waiting, setWaiting] = useState(false)

  const [email, setEmail] = useState(null)

  const authenticationInitiated = !!data.viewAuthenticationToken
  const authenticationTokenRedeemed = !!data?.viewAuthenticationToken?.verified
  const authenticationTokenAccountRegistered = !!data?.viewAuthenticationToken?.accountStatus?.registered

  // a refresh query - used mainly for polling
  const refresh = useCallback(() => {
    loadQuery(props.prepared.joinQuery.variables, { fetchPolicy: 'network-only' })
  }, [])

  const onSubmit = (val) => {
    setEmail(val.email)
    commit({
      variables: {
        input: {
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

  // when we receive the results from the token redemption, we will re-fetch the account and change URLs
  useEffect(() => {
    if (authenticationInitiated && authenticationTokenRedeemed && authenticationTokenAccountRegistered) {
      // invalidate viewer so it will be re-fetched
      commitLocalUpdate(environment, store => {
        store
          .getRoot()
          .setValue(undefined, 'viewer')
      })

      history.push('/profile')
    }
  }, [data])

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (
    (waiting && !authenticationTokenRedeemed) || (authenticationInitiated && !authenticationTokenRedeemed)
  ) {
    return (
      <Lobby
        // Use auth cookie's email as backup, since it may not be here after a refresh
        email={waiting ? email : data?.viewAuthenticationToken?.email}
        refresh={refresh}
      />
    )
  }

  // We already have auth cookie data, and it's been redeemed. We want the user to registers
  if (authenticationInitiated && authenticationTokenRedeemed) {
    if (!authenticationTokenAccountRegistered) {
      return <Register />
    }

    return null
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
          {error && (
            <Alert mb={2} status='error'>
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
              <CloseButton
                position='absolute'
                right={2}
                top={2}
                onClick={() => flush('login.notify')}
              />
            </Alert>
          )}
          <JoinForm
            onSubmit={onSubmit}
            loading={isInFlight}
          />
        </Flex>
      </Center>
    </>
  )
}
