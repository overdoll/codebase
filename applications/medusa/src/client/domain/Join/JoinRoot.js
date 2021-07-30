/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, useFragment, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { Node } from 'react'
import { useCallback } from 'react'
import Register from './Register/Register'
import Lobby from './Lobby/Lobby'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import Join from './Join/Join'
import Grant from './Grant/Grant'

type Props = {
  prepared: {
    joinQuery: PreloadedQueryInner<JoinRootQuery>,
  },
  children: Node,
};

const JoinTokenStatus = graphql`
  query JoinRootQuery {
    viewAuthenticationToken {
      id
      ...LobbyFragment
      ...JoinRootFragment
      ...JoinFragment
    }
  }
`

const JoinRootFragment = graphql`
  fragment JoinRootFragment on AuthenticationToken {
    verified
    sameSession
    accountStatus {
      registered
    }
  }
`

export default function JoinRoot (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader<JoinRootQuery>(
    JoinTokenStatus,
    props.prepared.joinQuery
  )

  const ref = usePreloadedQuery<JoinRootQuery>(JoinTokenStatus, queryRef)

  const tokenData = ref.viewAuthenticationToken

  const data = useFragment(JoinRootFragment, tokenData)

  const authenticationInitiated = !!tokenData
  const authenticationTokenVerified = data?.verified === true

  // a refresh query - used mainly for polling
  const refresh = useCallback(() => {
    loadQuery(props.prepared.joinQuery.variables, { fetchPolicy: 'network-only' })
  }, [])

  // when authentication not initiated
  if (!authenticationInitiated) {
    return <Join queryRef={tokenData} />
  }

  if (!authenticationTokenVerified) {
    return (
      <Lobby
        queryRef={tokenData}
        refresh={refresh}
      />
    )
  }

  if (!data.accountStatus?.registered) {
    return <Register />
  }

  return <Grant />
}
