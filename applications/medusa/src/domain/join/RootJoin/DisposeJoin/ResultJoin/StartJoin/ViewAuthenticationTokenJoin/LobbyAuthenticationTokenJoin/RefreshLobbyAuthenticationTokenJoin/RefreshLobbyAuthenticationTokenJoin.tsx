import { graphql, useFragment, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  RefreshLobbyAuthenticationTokenJoinQuery,
  RefreshLobbyAuthenticationTokenJoinQuery$variables
} from '@//:artifacts/RefreshLobbyAuthenticationTokenJoinQuery.graphql'
import type {
  RefreshLobbyAuthenticationTokenJoinFragment$key
} from '@//:artifacts/RefreshLobbyAuthenticationTokenJoinFragment.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { useUpdateEffect } from 'usehooks-ts'
import { useRouter } from 'next/router'
import usePreventWindowUnload from '@//:modules/hooks/usePreventWindowUnload'

interface Props extends ComponentSearchArguments<RefreshLobbyAuthenticationTokenJoinQuery$variables> {
  query: RefreshLobbyAuthenticationTokenJoinFragment$key | null
  loadQuery: () => void
}

const Fragment = graphql`
  fragment RefreshLobbyAuthenticationTokenJoinFragment on AuthenticationToken {
    __typename
  }
`

const Query = graphql`
  query RefreshLobbyAuthenticationTokenJoinQuery($token: String!) {
    viewAuthenticationToken (token: $token) {
      verified
      ...ViewAuthenticationTokenJoinFragment
    }
    viewer {
      id
      username
      isModerator
      isStaff
      reference
      isWorker
      isArtist
      deleting {
        __typename
      }
      lock {
        __typename
      }
      ...AccountIconFragment
    }
  }
`

export default function RefreshLobbyAuthenticationTokenJoin (props: Props): JSX.Element {
  const {
    searchArguments: {
      variables,
      options
    },
    query,
    loadQuery
  } = props

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const queryData = useLazyLoadQuery<RefreshLobbyAuthenticationTokenJoinQuery>(
    Query,
    variables,
    options
  )

  useUpdateEffect(() => {
    if (queryData.viewer != null && queryData.viewAuthenticationToken == null) {
      router.reload()
    }
  }, [queryData.viewer, queryData.viewAuthenticationToken])

  useUpdateEffect(() => {
    if (queryData.viewer == null && queryData.viewAuthenticationToken == null && data != null) {
      loadQuery()
    }
  }, [queryData.viewer, queryData.viewAuthenticationToken, data])

  usePreventWindowUnload(queryData.viewAuthenticationToken != null && !queryData.viewAuthenticationToken?.verified)

  return <></>
}
