/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, useFragment, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { Node } from 'react'
import { useCallback, useEffect, useState, Suspense } from 'react'
import Register from './Register/Register'
import Lobby from './Lobby/Lobby'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import Join from './Join/Join'
import Grant from './Grant/Grant'
import MultiFactor from './MultiFactor/MultiFactor'
import type { JoinRootFragment$key } from '@//:artifacts/JoinRootFragment.graphql'

type Props = {
  prepared: {
    joinQuery: PreloadedQueryInner<JoinRootQuery>,
  },
  children: Node,
};

const JoinTokenStatus = graphql`
  query JoinRootQuery {
    viewAuthenticationToken {
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
      multiFactor
      ...MultiFactorFragment
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

  const multiFactorEnabled = data?.accountStatus?.multiFactor?.length > 0

  const authenticationInitiated = !!tokenData
  const authenticationTokenVerified = data?.verified === true

  // used to track whether or not there was previously a token grant, so that if
  // an invalid token was returned, we can show an "expired" token page
  const [hadGrant, setHadGrant] = useState(false)

  // when a new join is started, we want to make sure that we save the fact that
  // there was one, so we can tell the user if the login code expired
  useEffect(() => {
    if (data) {
      setHadGrant(true)
    }
  }, [data])

  const clearGrant = () => {
    setHadGrant(false)
  }

  // a refresh query - used mainly for polling
  const refresh = useCallback(() => {
    loadQuery(props.prepared.joinQuery.variables, { fetchPolicy: 'network-only' })
  }, [])

  // when authentication not initiated
  if (!authenticationInitiated) {
    return <Join hadGrant={hadGrant} clearGrant={clearGrant} queryRef={tokenData} />
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

  // Check if the user has multi-factor enabled and show them the flow if they do
  if (multiFactorEnabled) {
    return <MultiFactor query={data.accountStatus} />
  }

  // This one logs you in with the token - will error out if you try to login if multiFactor isn't an empty array

  return (<Grant />)
}
