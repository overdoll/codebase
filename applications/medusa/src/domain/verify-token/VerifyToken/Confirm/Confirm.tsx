import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import Button from '@//:modules/form/Button/Button'
import { ConfirmRevokeMutation } from '@//:artifacts/ConfirmRevokeMutation.graphql'
import { ConfirmFragment$key } from '@//:artifacts/ConfirmFragment.graphql'
import { Trans } from '@lingui/macro'
import UAParser from 'ua-parser-js'
import Head from 'next/head'
import PageWrapperDesktop from '../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import AdvertBoxWrapper from '../../../join/Join/components/PlatformBenefitsAdvert/AdvertBoxWrapper/AdvertBoxWrapper'
import { Icon } from '@//:modules/content/PageLayout'
import { WarningTriangle } from '@//:assets/icons'
import BackgroundPatternWrapper from '../../../join/Join/components/BackgroundPatternWrapper/BackgroundPatternWrapper'

interface Props {
  verify: () => void
  isVerifying: boolean
  query: ConfirmFragment$key
}

const Mutation = graphql`
  mutation ConfirmRevokeMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

const Fragment = graphql`
  fragment ConfirmFragment on AuthenticationToken {
    userAgent
    location {
      city
      subdivision
      country
    }
  }
`

export default function Confirm ({
  verify,
  isVerifying,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const [revokeToken, isRevokingToken] = useMutation<ConfirmRevokeMutation>(
    Mutation
  )

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

  const cookieText = UAParser(
    data.userAgent
  )

  const revoke = (): void => {
    revokeToken({
      variables: {
        input: {
          token: queryToken,
          secret: querySecret
        }
      }
    })
  }

  return (
    <>
      <Head>
        <title>Verify login - overdoll</title>
      </Head>
      <BackgroundPatternWrapper>
        <PageWrapperDesktop>
          <Center>
            <AdvertBoxWrapper>
              <Stack justify='center' h='100%' spacing={6}>
                <Icon
                  icon={WarningTriangle}
                  w={16}
                  h={16}
                  fill='orange.300'
                />
                <Box>
                  <Heading
                    textAlign='center'
                    fontSize='xl'
                    color='gray.00'
                  >
                    <Trans>
                      Please confirm that you are attempting to login from the following device and location
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
                    color='orange.300'
                  >
                    <>
                      {cookieText.browser.name} {cookieText.browser.major},{' '}
                      {cookieText.os.name} {cookieText.os.version}
                    </>
                  </Heading>
                  <Heading
                    textAlign='center'
                    fontSize='md'
                    color='orange.300'
                  >
                    <>
                      {data.location.city}, {data.location.subdivision} ({data.location.country})
                    </>
                  </Heading>
                </Flex>
                <Center>
                  <Stack spacing={4} direction='row' align='center'>
                    <Button
                      size='md'
                      colorScheme='green'
                      variant='solid'
                      isDisabled={isRevokingToken}
                      isLoading={isVerifying}
                      onClick={verify}
                    >
                      <Trans>
                        Yes, this is me
                      </Trans>
                    </Button>
                    <Button
                      size='sm'
                      variant='solid'
                      colorScheme='orange'
                      isDisabled={isVerifying}
                      isLoading={isRevokingToken}
                      onClick={revoke}
                    >
                      <Trans>
                        No, this is not me
                      </Trans>
                    </Button>
                  </Stack>
                </Center>
              </Stack>
            </AdvertBoxWrapper>
          </Center>
        </PageWrapperDesktop>
      </BackgroundPatternWrapper>
    </>
  )
}
