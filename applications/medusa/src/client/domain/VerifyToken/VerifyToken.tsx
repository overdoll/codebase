import CenteredSpinner from '@//:modules/content/Placeholder/Loading/CenteredSpinner/CenteredSpinner'
import UAParser from 'ua-parser-js'
import { Helmet } from 'react-helmet-async'
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import { BadgeCircle } from '@//:assets/icons/navigation'
import { useQueryParam } from 'use-query-params'
import { useEffect } from 'react'
import type { VerifyTokenQuery } from '@//:artifacts/VerifyTokenQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import Confirm from './Confirm/Confirm'
import { Icon, PageWrapper } from '@//:modules/content/PageLayout'
import { VerifyTokenMutation } from '@//:artifacts/VerifyTokenMutation.graphql'
import { Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  prepared: {
    tokenQuery: PreloadedQuery<VerifyTokenQuery>
  }
}

const VerifyTokenMutationGQL = graphql`
  mutation VerifyTokenMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      validation
      authenticationToken {
        id
        verified
      }
    }
  }
`

const VerifyTokenQueryGQL = graphql`
  query VerifyTokenQuery($token: String!, $secret: String) {
    viewAuthenticationToken(token: $token, secret: $secret) {
      verified
      sameDevice
      location {
        city
        subdivision
        country
      }
      userAgent
      secure
    }
  }
`

export default function VerifyToken ({ prepared }: Props): JSX.Element {
  const query = usePreloadedQuery<VerifyTokenQuery>(VerifyTokenQueryGQL, prepared.tokenQuery)

  const [verifyToken, isVerifyingToken] = useMutation<VerifyTokenMutation>(
    VerifyTokenMutationGQL
  )

  const { i18n } = useLingui()

  const notify = useToast()

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

  const verify = (): void => {
    verifyToken({
      variables: {
        input: {
          token: queryToken,
          secret: querySecret
        }
      },
      onCompleted (payload) {
        if (payload.verifyAuthenticationToken?.validation != null) {
          notify({
            status: 'error',
            title: i18n._(translateValidation(payload.verifyAuthenticationToken.validation)),
            isClosable: true
          })
        }
      },
      onError () {
      }
    })
  }

  // when the token is verified, the user might close the original tab, either by accident or
  // unknowingly.
  // we do a full page refresh to /join, which will cover the following cases:
  // - the app used the token and got an authentication token back, so the state is not in sync
  // - the app did not use the token yet and requires user action

  // TODO do a proper refresh (recall ability?) as another refresh is needed to see the nav bar correctly
  const refresh = (): void => {
    window.location.pathname = '/join'
  }

  const data = query.viewAuthenticationToken

  useEffect(() => {
    // secure and verified, auto-verify the token
    if ((data != null) && !data.verified && data.secure) {
      verify()
    }
  }, [data])

  // If the token is invalid, show the user this feedback
  if (data == null) {
    return (
      <PageWrapper>
        <Alert
          mb={4}
          status='warning'
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              The login link you are using is either invalid or expired
            </Trans>
          </AlertDescription>
        </Alert>
        <Flex justify='center'>
          <LinkButton
            size='lg'
            colorScheme='gray'
            variant='solid'
            to='/join'
          >
            <Trans>
              Back to the Join page
            </Trans>
          </LinkButton>
        </Flex>
      </PageWrapper>
    )
  }

  const renderDevice = (): JSX.Element => {
    const cookieText = UAParser(
      data.userAgent
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
          location={`${data.location.city}, ${data.location.subdivision}, ${data.location.country}`}
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
          icon={BadgeCircle}
          w={100}
          h={100}
          fill='green.500'
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading
          mb={8}
          align='center'
          size='md'
          color='gray.100'
        >
          <Trans>
            You have been successfully logged in to the requested device
          </Trans>
        </Heading>
        <Box
          pt={3}
          pb={3}
          borderRadius={5}
          bg='gray.800'
        >
          <Center>
            <Text
              fontSize='lg'
              color='green.300'
            >
              {renderDevice()}
            </Text>
          </Center>
        </Box>
        <Alert
          mt={4}
          borderRadius={5}
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You may safely close this window
            </Trans>
          </AlertDescription>
        </Alert>
        {data.sameDevice
          ? (
            <Flex justify='center'>
              <Button
                mt={8}
                size='md'
                onClick={refresh}
                variant='link'
              >
                <Trans>
                  I closed the original tab
                </Trans>
              </Button>
            </Flex>)
          : (
            <Center mt={4}>
              <Text
                align='center'
                fontSize='md'
                color='pink.300'
              >
                <Trans>
                  If you closed the original tab, just open it back up in the same url!
                </Trans>
              </Text>
            </Center>
            )}
      </PageWrapper>
    </>
  )
}
