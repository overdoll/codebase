/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import UAParser from 'ua-parser-js'
import { Helmet } from 'react-helmet-async'
import { Alert, AlertDescription, AlertIcon, Box, Center, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { Icon } from '@//:modules/content'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, useMutation, usePreloadedQuery, useRelayEnvironment } from 'react-relay/hooks'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { StringParam, useQueryParam } from 'use-query-params'
import { Node, useEffect } from 'react'
import type { TokenQuery } from '@//:artifacts/TokenQuery.graphql'
import Button from '@//:modules/form/Button'
import { useHistory } from '@//:modules/routing'
import Confirm from './Confirm/Confirm'
import Link from '@//:modules/routing/Link'
import { PageWrapper } from '../../components/PageLayout'

type Props = {
  prepared: {
    tokenQuery: PreloadedQueryInner<TokenQuery>,
  },
};

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
            location
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

  const history = useHistory()

  const notify = useToast()

  const [t] = useTranslation('token')

  const [queryToken] = useQueryParam('id', StringParam)

  const verify = () => {
    verifyToken({
      variables: {
        input: {
          authenticationTokenId: queryToken
        }
      },
      onCompleted (payload) {
        if (payload.verifyAuthenticationToken.validation) {
          notify({
            status: 'error',
            title: payload.verifyAuthenticationToken.validation,
            isClosable: true
          })
        }
      },
      onError (data) {
        console.log(data)
      }
    })
  }

  // when the token is verified, the user might close the original tab, either by accident or
  // unknowingly.
  // we do a full page refresh to /join, which will cover the following cases:
  // - the app used the token and got an authentication token back, so the state is not in sync
  // - the app did not use the token yet and requires user action

  // TODO do a proper refresh (recall ability?) as another refresh is needed to see the nav bar correctly
  const refresh = () => {
    history.push('/join')
    history.go(0)
    location.reload()
  }

  const data = query.viewAuthenticationToken

  useEffect(() => {
    // secure and verified, auto-verify the token
    if (data && !data.verified && data.secure) {
      verify()
    }
  }, [data])

  // If the token is invalid, show the user this feedback
  if (!data) {
    return (
      <PageWrapper>
        <Alert mb={4} status='warning'>
          <AlertIcon />
          <AlertDescription>{t('expired')}</AlertDescription>
        </Alert>
        <Flex justify='center'>
          <Link to='/join'>
            <Button
              size='lg'
              colorScheme='gray'
              variant='solid'
            >
              {t('back')}
            </Button>
          </Link>
        </Flex>
      </PageWrapper>
    )
  }

  const renderDevice = () => {
    const cookieText = UAParser(
      data.device
    )

    return (
      <>
        {cookieText.browser.name} {cookieText.browser.major},{' '}
        {cookieText.os.name} {cookieText.os.version}
      </>
    )
  }

  // not verified yet
  if (!data.verified) {
    // if not secure, show the page to confirm or deny the token
    if (!data.secure) {
      return (
        <Confirm
          verify={verify}
          isVerifying={isVerifyingToken}
          device={renderDevice()}
          location={data.location}
        />
      )
    }

    // otherwise we're in a "waiting" state - will auto-verify the token without requiring user action
    return <CenteredSpinner />
  }

  return (
    <>
      <Helmet title='complete' />
      <PageWrapper>
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
        <Box pt={3} pb={3} borderRadius={5} bg='gray.800'>
          <Center>
            <Text fontSize='lg' color='green.300'>
              {renderDevice()}
            </Text>
          </Center>
        </Box>
        <Alert mt={4} borderRadius={5}>
          <AlertIcon />
          <AlertDescription>
            {t('close')}
          </AlertDescription>
        </Alert>
        {data.sameSession
          ? (
            <Flex justify='center'>
              <Button
                mt={8}
                size='md'
                onClick={refresh}
                variant='link'
              >
                {t('closed_original_device')}
              </Button>
            </Flex>)
          : (
            <Center mt={4}>
              <Text align='center' fontSize='md' color='pink.300'>
                {t('closed_original_device_hint')}
              </Text>
            </Center>
            )}
      </PageWrapper>
    </>
  )
}
