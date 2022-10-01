import { graphql, useFragment } from 'react-relay/hooks'
import { Suspense, useEffect, useRef } from 'react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import type {
  LobbyAuthenticationTokenJoinFragment$key
} from '@//:artifacts/LobbyAuthenticationTokenJoinFragment.graphql'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { MailEnvelope } from '@//:assets/icons'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { useCookies } from 'react-cookie'
import RefreshLobbyAuthenticationTokenJoin
  from './RefreshLobbyAuthenticationTokenJoin/RefreshLobbyAuthenticationTokenJoin'
import Lobby from '../../../../../../Join/pages/Lobby/Lobby'
import RevokeViewAuthenticationTokenButton
  from '../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'

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
      <Flex align='center' h='100%' position='relative'>
        <Flex top={0} position='absolute' w='100%' justify='flex-end'>
          <RevokeViewAuthenticationTokenButton query={data} />
        </Flex>
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
              <RefreshLobbyAuthenticationTokenJoin searchArguments={searchArguments} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </Flex>
    </>
  )
}
