import { graphql, useFragment, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  RefreshLobbyAuthenticationTokenJoinQuery,
  RefreshLobbyAuthenticationTokenJoinQuery$variables
} from '@//:artifacts/RefreshLobbyAuthenticationTokenJoinQuery.graphql'
import type {
  RefreshLobbyAuthenticationTokenJoinFragment$key
} from '@//:artifacts/RefreshLobbyAuthenticationTokenJoinFragment.graphql'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import { usePageVisibility } from '@//:modules/hooks/usePageVisibility'
import { useUpdateEffect } from 'usehooks-ts'

interface Props extends ComponentSearchArguments<RefreshLobbyAuthenticationTokenJoinQuery$variables> {
  query: RefreshLobbyAuthenticationTokenJoinFragment$key
}

const Fragment = graphql`
  fragment RefreshLobbyAuthenticationTokenJoinFragment on AuthenticationToken {
    __typename
  }
`

const Query = graphql`
  query RefreshLobbyAuthenticationTokenJoinQuery($token: String!) {
    viewAuthenticationToken (token: $token) {
      ...ViewAuthenticationTokenJoinFragment
    }
  }
`

export default function RefreshLobbyAuthenticationTokenJoin (props: Props): JSX.Element {
  const {
    searchArguments: {
      variables,
      options
    },
    query
  } = props

  const data = useFragment(Fragment, query)

  const queryData = useLazyLoadQuery<RefreshLobbyAuthenticationTokenJoinQuery>(
    Query,
    variables,
    options
  )

  const router = useRouter()

  const isVisible = usePageVisibility()

  useUpdateEffect(() => {
    if (queryData.viewAuthenticationToken == null && data != null && isVisible) {
      router.reload()
    }
  }, [queryData.viewAuthenticationToken, isVisible])

  return (
    <Flex align='center' justify='center'>
      <Stack w={60} align='center' justify='center' spacing={2}>
        <Box opacity={0.5}>
          <BeatLoader color='white' size={6} />
        </Box>
        {(queryData.viewAuthenticationToken == null && data != null)
          ? (
            <Text textAlign='center' color='whiteAlpha.300' fontSize='md'>
              <Trans>
                Redirecting...
              </Trans>
            </Text>)
          : (
            <Text textAlign='center' color='whiteAlpha.300' fontSize='md'>
              <Trans>
                Also check your spam and don't close this page
              </Trans>
            </Text>
            )}
      </Stack>
    </Flex>
  )
}
