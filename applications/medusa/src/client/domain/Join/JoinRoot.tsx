import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { useCallback, useEffect, useState } from 'react'
import Register from './Register/Register'
import Lobby from './Lobby/Lobby'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import Join from './Join/Join'
import Grant from './Grant/Grant'
import MultiFactor from './MultiFactor/MultiFactor'
import { useCookies } from 'react-cookie'

interface Props {
  prepared: {
    joinQuery: PreloadedQuery<JoinRootQuery>
  }
}

const JoinTokenStatus = graphql`
  query JoinRootQuery($token: String!) {
    viewAuthenticationToken(token: $token) {
      ...LobbyFragment
      ...JoinFragment
      ...RegisterFragment
      ...MultiFactorFragment
      ...GrantFragment

      verified
      token
      sameDevice
      accountStatus {
        registered
        multiFactor {
          totp
        }
      }
    }
  }
`

// import translation and load the resource

export default function JoinRoot (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<JoinRootQuery>(
    JoinTokenStatus,
    props.prepared.joinQuery
  )

  const ref = usePreloadedQuery<JoinRootQuery>(JoinTokenStatus, queryRef as PreloadedQuery<JoinRootQuery>)

  const data = ref.viewAuthenticationToken

  const multiFactorEnabled = data?.accountStatus?.multiFactor !== null

  const authenticationInitiated = !(data == null)
  const authenticationTokenVerified = data?.verified === true

  // used to track whether or not there was previously a token grant, so that if
  // an invalid token was returned, we can show an "expired" token page
  const [hadGrant, setHadGrant] = useState<boolean>(false)

  // when a new join is started, we want to make sure that we save the fact that
  // there was one, so we can tell the user if the login code expired
  useEffect(() => {
    if (data != null) {
      setHadGrant(true)
    }
  }, [data])

  const clearGrant = (): void => {
    setHadGrant(false)
  }

  // a refresh query - used mainly for polling
  const refresh = useCallback(() => {
    if (data?.verified !== true) {
      loadQuery({ token: data?.token as string }, { fetchPolicy: 'network-only' })
    }
  }, [data])

  // when authentication not initiated
  if (!authenticationInitiated) {
    return (
      <Join
        hadGrant={hadGrant}
        clearGrant={clearGrant}
        queryRef={data}
      />
    )
  }

  if (!authenticationTokenVerified) {
    return (
      <Lobby
        queryRef={data}
        refresh={refresh}
      />
    )
  }

  if (data?.accountStatus?.registered === false) {
    return <Register queryRef={data} />
  }

  // Check if the user has multi-factor enabled and show them the flow if they do
  if (multiFactorEnabled) {
    return <MultiFactor queryRef={data} />
  }

  // This one logs you in with the token - will error out if you try to login if multiFactor isn't an empty array
  return (<Grant queryRef={data} />)
}
