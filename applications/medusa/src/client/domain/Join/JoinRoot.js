/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { Node } from 'react'
import { useCallback, useState } from 'react'
import Register from './Register/Register'
import Lobby from './Lobby/Lobby'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import { StringParam, useQueryParam } from 'use-query-params'
import Join from './Join/Join'

type Props = {
  prepared: {
    joinQuery: PreloadedQueryInner<JoinRootQuery>,
  },
  children: Node,
};

const JoinTokenStatus = graphql`
  query JoinRootQuery($token: String) {
    viewAuthenticationToken(token: $token) {
      ...JoinFragment
      verified
      email
      accountStatus {
        registered
        multiFactor
      }
    }
  }
`

export default function JoinRoot (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader<JoinRootQuery>(
    JoinTokenStatus,
    props.prepared.joinQuery
  )

  const data = usePreloadedQuery<JoinRootQuery>(JoinTokenStatus, queryRef)

  const authenticationInitiated = !!data.viewAuthenticationToken
  const authenticationTokenRedeemed = !!data?.viewAuthenticationToken?.verified
  const authenticationTokenAccountRegistered = !!data?.viewAuthenticationToken?.accountStatus?.registered

  const [queryToken, setQueryToken] = useQueryParam('token', StringParam)

  const usingQueryToken = queryToken !== undefined
  const invalidTokenFromQuery = !data.viewAuthenticationToken && queryToken !== undefined

  const [waiting, setWaiting] = useState(false)

  const [email, setEmail] = useState(null)

  // a refresh query - used mainly for polling
  const refresh = useCallback(() => {
    loadQuery(props.prepared.joinQuery.variables, { fetchPolicy: 'network-only' })
  }, [])

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (
    !usingQueryToken && ((waiting && !authenticationTokenRedeemed) || (authenticationInitiated && !authenticationTokenRedeemed))
  ) {
    return (
      <Lobby
        // Use auth cookie's email as backup, since it may not be here after a refresh
        email={waiting ? email : data?.viewAuthenticationToken?.email}
        refresh={refresh}
      />
    )
  }

  // We already have auth cookie data, and it's been redeemed. We want the user to registers
  if (!usingQueryToken && (authenticationInitiated && authenticationTokenRedeemed)) {
    if (!authenticationTokenAccountRegistered) {
      return <Register />
    }

    return null
  }

  // Ask user to authenticate
  return <Join queryRef={queryRef} />
}
