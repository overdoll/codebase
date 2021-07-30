/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import UAParser from 'ua-parser-js'
import { Helmet } from 'react-helmet-async'
import { Alert, AlertDescription, AlertIcon, Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { StringParam, useQueryParam } from 'use-query-params'
import { Node, useEffect } from 'react'
import type { TokenQuery } from '@//:artifacts/TokenQuery.graphql'

type Props = {
  prepared: {
    tokenQuery: PreloadedQueryInner<TokenQuery>,
  },
};

const RevokeTokenMutationGQL = graphql`
  mutation TokenRevokeMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

const VerifyTokenMutationGQL = graphql`
  mutation TokenVerifyMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      validation
      authenticationToken {
        id
        verified
      }
    }
  }
`

const TokenStatus = graphql`
  query TokenQuery($token: String) {
    viewAuthenticationToken(token: $token) {
      id
      verified
      sameSession
      device
      secure
    }
  }
`

export default function Token ({ prepared }: Props): Node {
  const query = usePreloadedQuery<TokenQuery>(TokenStatus, prepared.tokenQuery)

  const [verifyToken, isVerifyingToken] = useMutation(
    VerifyTokenMutationGQL
  )

  const [revokeToken, isRevokingToken] = useMutation(
    RevokeTokenMutationGQL
  )

  const [t] = useTranslation('token')

  const [queryToken] = useQueryParam('id', StringParam)

  const verify = () => {
    verifyToken({
      variables: {
        input: {
          authenticationTokenId: queryToken
        }
      },
      onError (data) {
        console.log(data)
      }
    })
  }

  const revoke = () => {
    revokeToken({
      variables: {
        input: {
          authenticationTokenId: queryToken
        }
      },
      onError (data) {
        console.log(data)
      }
    })
  }

  const data = query.viewAuthenticationToken

  useEffect(() => {
    // secure and verified, auto-verify the token
    if (data && !data.verified && data.secure) {
      verify()
    }
  }, [data])

  if (!data) {
    return 'invalid or expired token'
  }

  // not verified yet
  if (!data.verified) {
    // if not secure, show the page to confirm or deny the token
    if (!data.secure) {
      return (
        <>
          <button disabled={isVerifyingToken || isRevokingToken} onClick={revoke}>revoke</button>
          <button disabled={isVerifyingToken || isRevokingToken} onClick={verify}>accept</button>
        </>
      )
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
