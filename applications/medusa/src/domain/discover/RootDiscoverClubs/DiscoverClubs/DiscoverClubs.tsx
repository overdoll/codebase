import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import { graphql } from 'react-relay'
import DiscoverClubsList
  from '@//:modules/content/HookedComponents/Filters/fragments/DiscoverClubsList/DiscoverClubsList'

interface Props {
  query: PreloadedQuery<DiscoverClubsQuery>
}

const Query = graphql`
  query DiscoverClubsQuery {
    ...DiscoverClubsListFragment
  }
`

export default function DiscoverClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<DiscoverClubsQuery>(
    Query,
    props.query
  )

  return (
    <DiscoverClubsList query={queryData} />
  )
}
