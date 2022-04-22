import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import Button from '@//:modules/form/Button/Button'
import { ConfirmRevokeMutation } from '@//:artifacts/ConfirmRevokeMutation.graphql'
import { ConfirmFragment$key } from '@//:artifacts/ConfirmFragment.graphql'
import { Trans } from '@lingui/macro'
import UAParser from 'ua-parser-js'
import Head from 'next/head'

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
        <title>Verify Login :: overdoll</title>
      </Head>
      <Center mt={8}>
        <Flex w={['fill', 'sm']} direction='column'>
          <Heading mb={8} textAlign='center' fontSize='xl' color='gray.00'>
            <Trans>
              Please confirm that you are attempting to login from the following device & location
            </Trans>
          </Heading>
          <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
            <Center>
              <Text fontSize='lg' color='green.300'>
                <>
                  {cookieText.browser.name} {cookieText.browser.major},{' '}
                  {cookieText.os.name} {cookieText.os.version}
                </>
              </Text>
            </Center>
          </Box>
          <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
            <Center>
              <Text fontSize='lg' color='pink.300'>
                {data.location.city}, {data.location.subdivision} ({data.location.country})
              </Text>
            </Center>
          </Box>
          <Center>
            <Stack spacing={4} direction='row' align='center'>
              <Button
                size='md'
                variant='ghost'
                isDisabled={isVerifying}
                isLoading={isRevokingToken}
                onClick={revoke}
              >
                <Trans>
                  No, this is not me
                </Trans>
              </Button>
              <Button
                size='md'
                colorScheme='pink'
                isDisabled={isRevokingToken}
                isLoading={isVerifying}
                onClick={verify}
              >
                <Trans>
                  Yes, this is me
                </Trans>
              </Button>
            </Stack>
          </Center>
        </Flex>
      </Center>
    </>
  )
}
