/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { StringParam, useQueryParam } from 'use-query-params'
import { Node } from 'react'
import Button from '@//:modules/form/button'

type Props = {
  verify: () => void,
  isVerifying: boolean,
  device: string,
  location: string,
};

const RevokeTokenMutationGQL = graphql`
  mutation ConfirmRevokeMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

export default function Confirm ({ verify, isVerifying, device, location }: Props): Node {
  const [revokeToken, isRevokingToken] = useMutation(
    RevokeTokenMutationGQL
  )

  const [t] = useTranslation('token')

  const [queryToken] = useQueryParam('id', StringParam)

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

  return (
    <>
      <Helmet title='verify' />
      <Center mt={8}>
        <Flex w={['fill', 'sm']} direction='column'>
          <Heading mb={8} align='center' size='md' color='gray.100'>
            {t('confirm.header')}
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
                disabled={isVerifying}
                loading={isRevokingToken}
                onClick={revoke}
                variant='ghost'
              >
                {t('confirm.revoke')}
              </Button>
              <Button
                size='md'
                colorScheme='pink'
                disabled={isRevokingToken}
                loading={isVerifying}
                onClick={verify}
              >
                {t('confirm.verify')}
              </Button>
            </Stack>
          </Center>
        </Flex>
      </Center>
    </>
  )
}
