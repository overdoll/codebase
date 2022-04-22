import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { CompleteFragment$key } from '@//:artifacts/CompleteFragment.graphql'
import { Trans } from '@lingui/macro'
import { Icon, PageWrapper } from '@//:modules/content/PageLayout'
import { BadgeCircle } from '@//:assets/icons'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import UAParser from 'ua-parser-js'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  query: CompleteFragment$key
}

const Fragment = graphql`
  fragment CompleteFragment on AuthenticationToken {
    userAgent
    sameDevice
    accountStatus {
      registered
    }
  }
`

export default function Complete ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const cookieText = UAParser(
    data.userAgent
  )

  // when the token is verified, the user might close the original tab, either by accident or
  // unknowingly.
  // we do a full page refresh to /join, which will cover the following cases:
  // - the app used the token and got an authentication token back, so the state is not in sync
  // - the app did not use the token yet and requires user action

  // TODO do a proper refresh (recall ability?) as another refresh is needed to see the nav bar correctly
  // TODO invalidate viewer here and replace to home (copy function from join support)
  const refresh = (): void => {
    void router.push('/join')
  }

  return (
    <>
      <Head>
        <title>Verification Complete :: overdoll</title>
      </Head>
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
          textAlign='center'
          fontSize='xl'
          color='gray.00'
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
              <>
                {cookieText.browser.name} {cookieText.browser.major},{' '}
                {cookieText.os.name} {cookieText.os.version}
              </>
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
                  If you closed the original tab, just open it back up!
                </Trans>
              </Text>
            </Center>
            )}
      </PageWrapper>
    </>
  )
}
