import { graphql, useFragment } from 'react-relay/hooks'
import { Suspense, useEffect, useRef } from 'react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import type { LobbyFragment$key } from '@//:artifacts/LobbyFragment.graphql'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { MailEnvelope } from '@//:assets/icons'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import RefreshLobby from './RefreshLobby/RefreshLobby'
import { useCookies } from 'react-cookie'

interface Props {
  queryRef: LobbyFragment$key
}

interface SearchProps {
  token: string
}

const LobbyFragment = graphql`
  fragment LobbyFragment on AuthenticationToken {
    token
    email
    ...RevokeTokenButtonFragment
  }
`

export default function Lobby ({
  queryRef
}: Props): JSX.Element {
  const data = useFragment(LobbyFragment, queryRef)

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

  // poll for result
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
      <Stack spacing={6}>
        <Icon
          icon={MailEnvelope}
          w={16}
          h={16}
          fill='purple.300'
        />
        <Box>
          <Heading
            textAlign='center'
            fontSize='xl'
            color='gray.00'
            mb={1}
          >
            <Trans>
              Tap on the link you received in your email inbox to continue
            </Trans>
          </Heading>
          <Heading textAlign='center' color='gray.300' fontSize='sm'>
            <Trans>
              Make sure to check your spam!
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
            color='purple.300'
          >
            {data.email ?? (cookies.token != null ? cookies.token.split(';')[1] : undefined)}
          </Heading>
        </Flex>
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<></>}>
            <RefreshLobby searchArguments={searchArguments} />
          </Suspense>
        </QueryErrorBoundary>
      </Stack>
    </>
  )
}
