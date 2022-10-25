import { RefetchFnDynamic } from 'react-relay/relay-hooks/useRefetchableFragmentNode'
import { FilterPublicClubPostsFragment$key } from '@//:artifacts/FilterPublicClubPostsFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'

interface Props {
  loadQuery: RefetchFnDynamic<any, any>
  query: FilterPublicClubPostsFragment$key | null
}

const Fragment = graphql`
  fragment FilterPublicClubPostsFragment on Club {
    id
  }
`

export default function FilterPublicClubPosts (props: Props): JSX.Element {
  const {
    loadQuery,
    query
  } = props

  const data = useFragment(Fragment, query)

  return (
    <>

    </>
  )
}
