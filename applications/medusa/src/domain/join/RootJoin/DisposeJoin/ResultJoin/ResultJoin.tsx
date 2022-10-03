import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultJoinQuery } from '@//:artifacts/ResultJoinQuery.graphql'
import { graphql } from 'react-relay'
import StartJoin from './StartJoin/StartJoin'
import { FixedContainer } from '@//:modules/content/PageLayout'
import { Suspense, useEffect, useRef } from 'react'
import RefreshLobbyAuthenticationTokenJoin
  from './StartJoin/ViewAuthenticationTokenJoin/LobbyAuthenticationTokenJoin/RefreshLobbyAuthenticationTokenJoin/RefreshLobbyAuthenticationTokenJoin'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useUpdateEffect } from 'usehooks-ts'
import { usePageVisibility } from '@//:modules/hooks/usePageVisibility'
import { useCookies } from 'react-cookie'

interface SearchProps {
  token: string
}

interface Props {
  query: PreloadedQuery<ResultJoinQuery>
  loadQuery: () => void
}

const Query = graphql`
  query ResultJoinQuery($token: String!) @preloadable {
    viewAuthenticationToken(token: $token)  {
      token
      verified
      ...StartJoinFragment
      ...RefreshLobbyAuthenticationTokenJoinFragment
    }
  }
`

export default function ResultJoin (props: Props): JSX.Element {
  const {
    query,
    loadQuery
  } = props

  const data = usePreloadedQuery<ResultJoinQuery>(
    Query,
    query
  )

  const isVisible = usePageVisibility()

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [cookies] = useCookies<string>(['token'])
  const cookieToken = cookies.token != null ? cookies.token.split(';')[0] : ''

  const {
    searchArguments,
    loadQuery: loadSearchQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: cookieToken
    }
  })

  // refresh the token when in lobby
  useEffect(() => {
    if (data.viewAuthenticationToken == null || data.viewAuthenticationToken?.verified) return
    const refreshLoop = (): void => {
      loadSearchQuery({ token: cookieToken })
      timeout.current = setTimeout(refreshLoop, 2000)
    }

    timeout.current = setTimeout(refreshLoop, 2000)

    return () => {
      if (timeout.current != null) {
        clearTimeout(timeout.current)
        timeout.current = null
      }
    }
  }, [data.viewAuthenticationToken, cookies.token])

  // refresh query when authentication token becomes null and/or user tabs back in
  useUpdateEffect(() => {
    if (data.viewAuthenticationToken == null && isVisible) {
      loadSearchQuery()
    }
  }, [data.viewAuthenticationToken, isVisible])

  return (
    <FixedContainer>
      <StartJoin query={data.viewAuthenticationToken} loadQuery={loadQuery} />
      <QueryErrorBoundary loadQuery={loadSearchQuery}>
        <Suspense fallback={<></>}>
          <RefreshLobbyAuthenticationTokenJoin
            loadQuery={loadQuery}
            query={data.viewAuthenticationToken}
            searchArguments={searchArguments}
          />
        </Suspense>
      </QueryErrorBoundary>
    </FixedContainer>
  )
}
