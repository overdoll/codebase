import { graphql, useFragment } from 'react-relay/hooks'
import type { StartJoinFragment$key } from '@//:artifacts/StartJoinFragment.graphql'
import ViewAuthenticationTokenJoin from './ViewAuthenticationTokenJoin/ViewAuthenticationTokenJoin'
import EmptyJoin from './EmptyJoin/EmptyJoin'
import { useCookies } from 'react-cookie'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  query: StartJoinFragment$key | null
  loadQuery: () => void
}

const Fragment = graphql`
  fragment StartJoinFragment on AuthenticationToken {
    ...ViewAuthenticationTokenJoinFragment
  }
`

export default function StartJoin (props: Props): JSX.Element {
  const {
    query,
    loadQuery
  } = props

  const data = useFragment(Fragment, query)

  const [cookies] = useCookies<string>(['token'])

  // if token cookie exists but data is null, we force a refetch
  useUpdateEffect(() => {
    if (cookies.token != null && cookies.token !== '' && data == null) {
      loadQuery()
    }
  }, [cookies.token, data])

  if (data == null) {
    return <EmptyJoin />
  }

  return (
    <ViewAuthenticationTokenJoin query={data} loadQuery={loadQuery} />
  )
}
