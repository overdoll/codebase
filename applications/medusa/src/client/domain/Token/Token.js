/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, useState } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import Register from '../Register/Register'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'
import { Icon } from '@//:modules/content'
import UAParser from 'ua-parser-js'
import { Alert, AlertDescription, AlertIcon, Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useFlash } from '@//:modules/flash'
import { Helmet } from 'react-helmet-async'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useParams } from '@//:modules/routing/useParams'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

const TokenMutationGQL = graphql`
  mutation TokenMutation($input: VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput!) {
    verifyAuthenticationTokenAndAttemptAccountAccessGrant(input: $input) {
      authenticationToken {
        verified
        email
        session
        sameSession
        accountStatus {
          registered
          authenticated
          multiFactor
        }
      }
      account {
        id
      }
    }
  }
`

export default function Token (): Node {
  const [t] = useTranslation('token')
  const history = useHistory()
  const params = useParams()
  const { flash } = useFlash()

  const [data, setData] = useState(null)

  const [commit, isInFlight] = useMutation(
    TokenMutationGQL
  )

  useEffect(() => {
    commit({
      variables: {
        input: {
          authenticationTokenId: params.id
        }
      },
      updater: (store, payload) => {
        const data = payload.verifyAuthenticationTokenAndAttemptAccountAccessGrant

        if (!data.authenticationToken) {
          flash('login.notify', t('invalid_token'))
          history.push('/join')
          return
        }

        if (data.account) {
          // basically just invalidate the store so it can re-fetch
          store
            .getRoot()
            .setValue(undefined, 'viewer')

          history.push('/profile')
          return
        }

        setData(data.authenticationToken)
      },
      onError (data) {
        console.log(data)
      }
    })
  }, [])

  if (!data) {
    return <CenteredSpinner />
  }

  // Token was not redeemed in the same session, so we tell the user to check
  // the other session
  if (!data.sameSession) {
    const cookieText = UAParser(
      JSON.parse(data.session)['user-agent']
    )

    return (
      <>
        <Helmet title='complete' />
        <Center mt={8}>
          <Flex w={['fill', 'sm']} direction='column'>
            <Icon
              icon={SignBadgeCircle}
              w={100}
              h={100}
              color='green.500'
              ml='auto'
              mr='auto'
              mb={8}
            />
            <Heading mb={8} align='center' size='md' color='gray.100'>
              {t('header')}
            </Heading>
            <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
              <Center>
                <Text fontSize='lg' color='green.300'>
                  {cookieText.browser.name} {cookieText.browser.major},{' '}
                  {cookieText.os.name} {cookieText.os.version}
                </Text>
              </Center>
            </Box>
            <Alert mt={4} borderRadius={5}>
              <AlertIcon />
              {t('close')}
              <AlertDescription />
            </Alert>
          </Flex>
        </Center>
      </>
    )
  }

  if (data.accountStatus && !data.accountStatus.registered) {
    return <Register />
  }

  return null
}
