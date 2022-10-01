import { graphql, useFragment } from 'react-relay/hooks'
import { Suspense, useEffect, useRef } from 'react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { Center, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import type {
  LobbyAuthenticationTokenJoinFragment$key
} from '@//:artifacts/LobbyAuthenticationTokenJoinFragment.graphql'
import Head from 'next/head'
import { EmailSent } from '@//:assets/icons'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { useCookies } from 'react-cookie'
import RefreshLobbyAuthenticationTokenJoin
  from './RefreshLobbyAuthenticationTokenJoin/RefreshLobbyAuthenticationTokenJoin'
import RevokeViewAuthenticationTokenButton
  from '../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import { Trans } from '@lingui/macro'

interface Props {
  query: LobbyAuthenticationTokenJoinFragment$key
}

interface SearchProps {
  token: string
}

const Fragment = graphql`
  fragment LobbyAuthenticationTokenJoinFragment on AuthenticationToken {
    token
    email
    ...RevokeViewAuthenticationTokenButtonFragment
  }
`

export default function LobbyAuthenticationTokenJoin (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [cookies] = useCookies<string>(['token'])

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: data.token
    }
  })

  // refresh the token until we get the desired result
  useEffect(() => {
    const refreshLoop = (): void => {
      loadQuery()
      timeout.current = setTimeout(refreshLoop, 2000)
    }

    timeout.current = setTimeout(refreshLoop, 2000)

    return () => {
      if (timeout.current != null) {
        clearTimeout(timeout.current)
        timeout.current = null
      }
    }
  }, [])

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
                <RevokeViewAuthenticationTokenButton query={data} />
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
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<></>}>
            <RefreshLobbyAuthenticationTokenJoin searchArguments={searchArguments} />
          </Suspense>
        </QueryErrorBoundary>
      </Stack>
    </>
  )
}
