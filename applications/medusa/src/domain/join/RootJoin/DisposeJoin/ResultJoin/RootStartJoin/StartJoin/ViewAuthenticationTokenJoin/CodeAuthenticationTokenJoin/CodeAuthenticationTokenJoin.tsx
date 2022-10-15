import { CodeAuthenticationTokenJoinFragment$key } from '@//:artifacts/CodeAuthenticationTokenJoinFragment.graphql'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useCookies } from 'react-cookie'
import { useEffect, useMemo, useState } from 'react'
import RevokeViewAuthenticationTokenButton
  from '../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import Head from 'next/head'
import { Center, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import Icon from '../../../../../../../../../modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { EmailSent } from '@//:assets/icons'
import { t, Trans } from '@lingui/macro'
import CodeAuthenticationTokenJoinForm from './CodeAuthenticationTokenJoinForm/CodeAuthenticationTokenJoinForm'
import { CodeAuthenticationTokenJoinMutation } from '@//:artifacts/CodeAuthenticationTokenJoinMutation.graphql'
import posthog from 'posthog-js'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: CodeAuthenticationTokenJoinFragment$key
}

const Fragment = graphql`
  fragment CodeAuthenticationTokenJoinFragment on AuthenticationToken {
    token
    email
    ...RevokeViewAuthenticationTokenButtonFragment
  }
`

const Mutation = graphql`
  mutation CodeAuthenticationTokenJoinMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      validation
      authenticationToken {
        id
        verified
        email
        accountStatus {
          registered
          multiFactor {
            totp
          }
        }
        ...ViewAuthenticationTokenJoinFragment
      }
    }
  }
`

export default function CodeAuthenticationTokenJoin (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const [cookies] = useCookies<string>(['token'])

  const [verifyToken, isVerifyingToken] = useMutation<CodeAuthenticationTokenJoinMutation>(
    Mutation
  )

  const [email, setEmail] = useState(data.email)

  const notify = useToast()

  const onSubmit = (formValues): void => {
    verifyToken({
      variables: {
        input: {
          token: data.token,
          secret: (formValues.secret).toLowerCase()
        }
      },
      onCompleted (payload) {
        if (payload.verifyAuthenticationToken?.validation != null) {
          notify({
            status: 'error',
            title: t`The code is either invalid or has expired`
          })
          return
        }
        posthog?.capture('6-digit-code-submitted')
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error submitting the code`
        })
      }
    })
  }

  const memo = useMemo(() => <RevokeViewAuthenticationTokenButton query={data} />, [data])

  useEffect(() => {
    setEmail(data.email ?? cookies.token.split(';')[1])
  }, [cookies.token])

  return (
    <>
      <Head>
        <title>Check your email - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Stack spacing={4}>
          <Grid w='100%' templateColumns='1fr 1fr 1fr'>
            <GridItem>
              <Flex h='100%' align='center'>
                {memo}
              </Flex>
            </GridItem>
            <GridItem>
              <Center>
                <Icon
                  icon={EmailSent}
                  w={16}
                  h={16}
                  fill='gray.00'
                />
              </Center>
            </GridItem>
            <GridItem />
          </Grid>
          <Heading fontSize='4xl' color='gray.00'>
            <Trans>
              Check your email for a 6-digit code
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
            {email}
          </Heading>
        </Flex>
        <Stack w='100%' spacing={2} align='center' justify='center'>
          <CodeAuthenticationTokenJoinForm
            onSubmit={onSubmit}
            isLoading={isVerifyingToken}
          />
          <Flex w={60} align='center' justify='center'>
            <Text textAlign='center' color='whiteAlpha.300' fontSize='md'>
              <Trans>
                Make sure to check your spam and don't close this page
              </Trans>
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </>
  )
}
