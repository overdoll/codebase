import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  RefreshLobbyAuthenticationTokenJoinQuery,
  RefreshLobbyAuthenticationTokenJoinQuery$variables
} from '@//:artifacts/RefreshLobbyAuthenticationTokenJoinQuery.graphql'
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<RefreshLobbyAuthenticationTokenJoinQuery$variables> {
}

const Query = graphql`
  query RefreshLobbyAuthenticationTokenJoinQuery($token: String!) {
    viewAuthenticationToken (token: $token) {
      verified
      ...ViewAuthenticationTokenJoinFragment
    }
  }
`

export default function RefreshLobbyAuthenticationTokenJoin (props: Props): JSX.Element {
  const {
    searchArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<RefreshLobbyAuthenticationTokenJoinQuery>(
    Query,
    variables,
    options
  )

  if (data?.viewAuthenticationToken?.verified === false) {
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
