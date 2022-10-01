import { Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { CompleteVerifyTokenFragment$key } from '@//:artifacts/CompleteVerifyTokenFragment.graphql'
import { Trans } from '@lingui/macro'
import UAParser from 'ua-parser-js'
import Head from 'next/head'
import { Icon } from '@//:modules/content/PageLayout'
import { SuccessBox } from '@//:assets/icons'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  query: CompleteVerifyTokenFragment$key
}

const Fragment = graphql`
  fragment CompleteVerifyTokenFragment on AuthenticationToken {
    userAgent
    sameDevice
    accountStatus {
      registered
    }
  }
`

export default function CompleteVerifyToken (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const cookieText = UAParser(
    data.userAgent
  )

  useEffect(() => {
    if (data.sameDevice) {
      // push to join so we get the grant and state updates correctly
      void router.push('/join')
    }
  }, [])

  if (data.sameDevice) {
    return (
      <>
        <Head>
          <title>Verification complete - overdoll</title>
        </Head>
        <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
          <Stack spacing={4}>
            <Spinner thickness='12px' color='gray.00' w={16} h={16} />
            <Heading fontSize='4xl' color='gray.00'>
              <Trans>
                Just a few more seconds to log you in.
              </Trans>
            </Heading>
          </Stack>
        </Stack>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Verification complete - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Stack spacing={4}>
          <Icon
            icon={SuccessBox}
            w={16}
            h={16}
            fill='gray.00'
          />
          <Heading fontSize='4xl' color='gray.00'>
            <Trans>
              We have logged you into the requested device.
            </Trans>
          </Heading>
        </Stack>
        <Flex
          justify='center'
          align='center'
          wordBreak='break-all'
          p={3}
          borderRadius='lg'
          bg='gray.800'
          w='100%'
        >
          <Heading
            noOfLines={2}
            textAlign='center'
            fontSize='xl'
            color='primary.400'
          >
            {cookieText.browser.name} on {cookieText.os.name}
          </Heading>
        </Flex>
        <Text textAlign='center' color='whiteAlpha.300' fontSize='md'>
          <Trans>
            If you closed the original page, just open it back up.
          </Trans>
        </Text>
      </Stack>
    </>
  )
}
