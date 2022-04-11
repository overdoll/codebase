import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Suspense, useCallback, useEffect, useState, useTransition } from 'react'
import Register from './pages/Register/Register'
import Lobby from './pages/Lobby/Lobby'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import JoinRootData from '@//:artifacts/JoinRootQuery.graphql'
import Join from './pages/Join/Join'
import Grant from './pages/Grant/Grant'
import MultiFactor from './pages/MultiFactor/MultiFactor'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'

interface Props {
  queryRefs: {
    joinQuery: PreloadedQuery<JoinRootQuery>
  }
}

const JoinTokenStatus = graphql`
  query JoinRootQuery($token: String!) @preloadable {
    viewAuthenticationToken(token: $token)  {
      id
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
          __typename
        }
      }
    }
  }
`

// import translation and load the resource

const JoinRoot = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader<JoinRootQuery>(
    JoinTokenStatus,
    props.queryRefs.joinQuery
  )

  const ref = usePreloadedQuery<JoinRootQuery>(JoinTokenStatus, queryRef as PreloadedQuery<JoinRootQuery>)

  const data = ref.viewAuthenticationToken

  const multiFactorEnabled = data?.accountStatus?.multiFactor !== null

  const authenticationInitiated = !(data == null)
  const authenticationTokenVerified = data?.verified === true

  // used to track whether there was previously a token grant, so that if
  // an invalid token was returned, we can show an "expired" token page
  const [hadGrant, setHadGrant] = useState<boolean>(false)

  // transition used to prevent flickering caused by refetch
  // @ts-expect-error
  const [, startTransition] = useTransition({
    timeoutMs: 7000
  })

  // a refresh query - used mainly for polling
  const refresh = useCallback(() => {
    if (data?.verified !== true) {
      startTransition(() => {
        loadQuery({ token: data?.token as string }, { fetchPolicy: 'network-only' })
      })
    }
  }, [data])

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
      <QueryErrorBoundary
        loadQuery={() => loadQuery({ token: data?.token }, { fetchPolicy: 'network-only' })}
      >
        <Suspense fallback={SkeletonStack}>
          <Lobby
            queryRef={data}
            refresh={refresh}
          />
        </Suspense>
      </QueryErrorBoundary>
    )
  }

  if (data?.accountStatus?.registered === false) {
    return <Register queryRef={data} />
  }

  // Check if the user has multi-factor enabled and show them the flow if they do
  if (multiFactorEnabled) {
    return <MultiFactor queryRef={data} />
  }

  // This one logs you in with the token - will error out if you try to log in if multiFactor isn't an empty array
  return (<Grant queryRef={data} />)
}

JoinRoot.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

JoinRoot.getRelayPreloadProps = (ctx) => {
  let tokenCookie = ctx.cookies.get('token')

  if (tokenCookie != null) {
    tokenCookie = tokenCookie.split(';')[0]
  }
  return {
    queries: {
      joinQuery: {
        params: JoinRootData.params,
        variables: {
          token: tokenCookie ?? ''
        }
      }
    }
  }
}

export default JoinRoot
