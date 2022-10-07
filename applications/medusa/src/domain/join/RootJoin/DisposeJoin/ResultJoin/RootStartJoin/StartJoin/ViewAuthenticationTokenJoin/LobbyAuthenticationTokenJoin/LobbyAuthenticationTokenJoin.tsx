import { graphql, useFragment } from 'react-relay/hooks'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { Box, Center, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import type {
  LobbyAuthenticationTokenJoinFragment$key
} from '@//:artifacts/LobbyAuthenticationTokenJoinFragment.graphql'
import Head from 'next/head'
import { EmailSent } from '@//:assets/icons'
import { useCookies } from 'react-cookie'
import RevokeViewAuthenticationTokenButton
  from '../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import { Trans } from '@lingui/macro'
import { BeatLoader } from 'react-spinners'
import { useMemo } from 'react'

interface Props {
  query: LobbyAuthenticationTokenJoinFragment$key
}

const Fragment = graphql`
  fragment LobbyAuthenticationTokenJoinFragment on AuthenticationToken {
    token
    email
    ...RevokeViewAuthenticationTokenButtonFragment
    ...RefreshLobbyAuthenticationTokenJoinFragment
  }
`

export default function LobbyAuthenticationTokenJoin (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const [cookies] = useCookies<string>(['token'])

  const memo = useMemo(() => <RevokeViewAuthenticationTokenButton query={data} />, [data])

  return (
    <>
      <Head>
        <title>Waiting for authentication - overdoll</title>
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
              Check your email and click on the link.
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
            {data.email ?? (cookies.token != null ? cookies.token.split(';')[1] : undefined)}
          </Heading>
        </Flex>
        <Flex align='center' justify='center'>
          <Stack w={60} align='center' justify='center' spacing={2}>
            <Box opacity={0.5}>
              <BeatLoader color='white' size={6} />
            </Box>
            <Text textAlign='center' color='whiteAlpha.300' fontSize='md'>
              <Trans>
                Also check your spam and don't close this page
              </Trans>
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </>
  )
}
