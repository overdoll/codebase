import { useFragment } from 'react-relay/hooks'
import { RootStartJoinFragment$key } from '@//:artifacts/RootStartJoinFragment.graphql'
import { graphql } from 'react-relay'
import { usePageVisibility } from '@//:modules/hooks/usePageVisibility'
import { Suspense, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useUpdateEffect } from 'usehooks-ts'
import StartJoin from './StartJoin/StartJoin'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import RefreshLobbyAuthenticationTokenJoin
  from './StartJoin/ViewAuthenticationTokenJoin/LobbyAuthenticationTokenJoin/RefreshLobbyAuthenticationTokenJoin/RefreshLobbyAuthenticationTokenJoin'

interface SearchProps {
  token: string
}

interface Props {
  query: RootStartJoinFragment$key | null
  loadQuery: () => void
}

const Fragment = graphql`
  fragment RootStartJoinFragment on AuthenticationToken {
    verified
    token
    ...StartJoinFragment
    ...RefreshLobbyAuthenticationTokenJoinFragment
  }
`

export default function RootStartJoin (props: Props): JSX.Element {
  const {
    query,
    loadQuery
  } = props

  const data = useFragment(
    Fragment,
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
    if (data == null || data?.verified) return
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
  }, [data, cookies.token])

  // if token cookie exists but data is null, we force a refetch
  useUpdateEffect(() => {
    if (cookies.token != null && cookies.token !== '' && data == null) {
      loadQuery()
    }
  }, [cookies.token, data])

  // refresh query when authentication token becomes null and/or user tabs back in
  useUpdateEffect(() => {
    if (data == null && isVisible) {
      loadSearchQuery()
    }
  }, [data, isVisible])

  return (
    <>
      <StartJoin query={data} loadQuery={loadQuery} />
      <QueryErrorBoundary loadQuery={loadSearchQuery}>
        <Suspense fallback={<></>}>
          <RefreshLobbyAuthenticationTokenJoin
            loadQuery={loadQuery}
            query={data}
            searchArguments={searchArguments}
          />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
