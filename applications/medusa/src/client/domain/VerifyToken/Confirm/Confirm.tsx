import { Helmet } from 'react-helmet-async'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import Button from '@//:modules/form/Button/Button'
import { ConfirmRevokeMutation } from '@//:artifacts/ConfirmRevokeMutation.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  verify: () => void
  isVerifying: boolean
  device: JSX.Element
  location: string
}

const RevokeTokenMutationGQL = graphql`
  mutation ConfirmRevokeMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

export default function Confirm ({
  verify,
  isVerifying,
  device,
  location
}: Props): JSX.Element {
  const [revokeToken, isRevokingToken] = useMutation<ConfirmRevokeMutation>(
    RevokeTokenMutationGQL
  )

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

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
      <Helmet title='verify' />
      <Center mt={8}>
        <Flex w={['fill', 'sm']} direction='column'>
          <Heading mb={8} align='center' size='md' color='gray.100'>
            <Trans>
              Please confirm that you are attempting to login from the following device & location
            </Trans>
          </Heading>
          <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
            <Center>
              <Text fontSize='lg' color='green.300'>
                {device}
              </Text>
            </Center>
          </Box>
          <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
            <Center>
              <Text fontSize='lg' color='pink.300'>
                {location}
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
