import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { CompleteFragment$key } from '@//:artifacts/CompleteFragment.graphql'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRefresh, CheckCircle } from '@//:assets/icons'
import UAParser from 'ua-parser-js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BackgroundPatternWrapper from '../../../join/Join/components/BackgroundPatternWrapper/BackgroundPatternWrapper'
import PageWrapperDesktop from '../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import AdvertBoxWrapper from '../../../join/Join/components/PlatformBenefitsAdvert/AdvertBoxWrapper/AdvertBoxWrapper'

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

  const refresh = (): void => {
    void router.push('/join')
  }

  return (
    <>
      <Head>
        <title>Verification complete :: overdoll</title>
      </Head>
      <BackgroundPatternWrapper>
        <PageWrapperDesktop>
          <Center>
            <AdvertBoxWrapper>
              <Stack justify='center' h='100%' spacing={6}>
                <Icon
                  icon={CheckCircle}
                  w={16}
                  h={16}
                  fill='green.400'
                />
                <Box>
                  <Heading
                    textAlign='center'
                    fontSize='xl'
                    color='gray.00'
                    mb={1}
                  >
                    <Trans>
                      You have been successfully logged in to the requested device
                    </Trans>
                  </Heading>
                  <Heading textAlign='center' color='gray.300' fontSize='sm'>
                    <Trans>
                      You may safely close this window
                    </Trans>
                  </Heading>
                </Box>
                <Flex
                  justify='center'
                  align='center'
                  wordBreak='break-all'
                  p={3}
                  borderRadius='md'
                  bg='gray.900'
                  w='100%'
                >
                  <Heading
                    textAlign='center'
                    fontSize='md'
                    color='green.400'
                  >
                    <>
                      {cookieText.browser.name} {cookieText.browser.major},{' '}
                      {cookieText.os.name} {cookieText.os.version}
                    </>
                  </Heading>
                </Flex>
                {data.sameDevice
                  ? (
                    <Flex justify='center'>
                      <Button
                        size='md'
                        onClick={refresh}
                        variant='solid'
                        colorScheme='green'
                        rightIcon={<Icon icon={ArrowButtonRefresh} fill='green.900' w={4} h={4} />}
                      >
                        <Trans>
                          I closed the original tab
                        </Trans>
                      </Button>
                    </Flex>)
                  : (
                    <Heading textAlign='center' color='gray.100' fontSize='md'>
                      <Trans>
                        If you closed the original tab, just open it back up!
                      </Trans>
                    </Heading>
                    )}
              </Stack>
            </AdvertBoxWrapper>
          </Center>
        </PageWrapperDesktop>
      </BackgroundPatternWrapper>
    </>
  )
}
