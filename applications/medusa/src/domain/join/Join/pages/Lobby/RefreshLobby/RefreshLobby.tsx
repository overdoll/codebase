import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { RefreshLobbyQuery, RefreshLobbyQuery$variables } from '@//:artifacts/RefreshLobbyQuery.graphql'
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<RefreshLobbyQuery$variables> {
}

const Query = graphql`
  query RefreshLobbyQuery($token: String!) {
    viewAuthenticationToken (token: $token) {
      id
      verified
      token
      sameDevice
      accountStatus {
        registered
        multiFactor {
          __typename
        }
      }
    }
  }
`

export default function RefreshLobby ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<RefreshLobbyQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  if (queryData?.viewAuthenticationToken?.verified === false) {
    return (
      <Flex align='center' justify='center'>
        <Stack w={60} align='center' justify='center' spacing={2}>
          <Spinner color='purple.50' w={6} h={6} />
          <Text textAlign='center' color='purple.50' fontSize='md'>
            <Trans>
              Waiting for you to click on the email link
            </Trans>
          </Text>
        </Stack>
      </Flex>

    )
  }

  return <></>
}
