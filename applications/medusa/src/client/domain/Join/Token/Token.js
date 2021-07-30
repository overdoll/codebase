/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import UAParser from 'ua-parser-js'
import { Helmet } from 'react-helmet-async'
import { Alert, AlertDescription, AlertIcon, Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import type { TokenFragment$key } from '@//:artifacts/TokenFragment.graphql'
import { StringParam, useQueryParam } from 'use-query-params'
import { useEffect } from 'react'

type Props = {
  queryRef: TokenFragment$key
}

const TokenMutationGQL = graphql`
  mutation TokenMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      authenticationToken {
          verified
          accountStatus {
            registered
            multiFactor
          }
      }
    }
  }
`

const TokenFragment = graphql`
  fragment TokenFragment on AuthenticationToken {
    verified
    device
    location
    secure
  }
`

export default function Token ({ queryRef }: Props): Node {
  const [t] = useTranslation('auth')

  const [commit, isInFlight] = useMutation(
    TokenMutationGQL
  )

  const data = useFragment(TokenFragment, queryRef)

  const [queryToken] = useQueryParam('token', StringParam)

  const verify = () => {
    commit({
      variables: {
        input: {
          authenticationTokenId: queryToken
        }
      },
      updater: (store, payload) => {
        const viewRecord = store
          .getRoot()
          .getLinkedRecord('viewAuthenticationToken', { token: queryToken })

        // set value to verified
        viewRecord
          .setValue(payload.verifyAuthenticationToken.authenticationToken.verified, 'verified')

        // create a record for account status
        const node = store.create('client:root:authenticationTokenAccountStatus', 'AccountStatus')
        node.setValue(payload.verifyAuthenticationToken.authenticationToken.accountStatus.registered, 'registered')
        node.setValue(payload.verifyAuthenticationToken.authenticationToken.accountStatus.multiFactor, 'multiFactor')

        // update record
        viewRecord
          .setLinkedRecord(node, 'accountStatus')
      },
      onError (data) {
        console.log(data)
      }
    })
  }

  useEffect(() => {
    // secure and verified, auto-verify the token
    if (!data.verified && data.secure) {
      verify()
    }
  }, [data])

  // not verified yet
  if (!data.verified) {
    // if not secure, show the page to confirm or deny the token
    if (!data.secure) {
      return 'please confirm if you want to approve or deny token'
    }

    // otherwise we're in a "waiting" state - will auto-verify the token
    return <CenteredSpinner />
  }

  const cookieText = UAParser(
    data.device
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
            {t('token.header')}
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
            {t('token.close')}
            <AlertDescription />
          </Alert>
        </Flex>
      </Center>
    </>
  )
}
