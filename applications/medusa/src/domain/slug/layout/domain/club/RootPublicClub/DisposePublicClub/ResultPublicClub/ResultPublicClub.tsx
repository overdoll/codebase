import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultPublicClubQuery } from '@//:artifacts/ResultPublicClubQuery.graphql'
import { graphql } from 'react-relay'

import EmptyPublicClub from './EmptyPublicClub/EmptyPublicClub'
import MetaPublicClub from './MetaPublicClub/MetaPublicClub'

interface Props {
  query: PreloadedQuery<ResultPublicClubQuery>
}

const Query = graphql`
  query ResultPublicClubQuery($slug: String!) {
    club(slug: $slug) {
      ...MetaPublicClubFragment
    }
  }
`

export default function ResultPublicClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ResultPublicClubQuery>(
    Query,
    props.query
  )

  if (queryData?.club == null) {
    return <EmptyPublicClub />
  }

  return (
    <MetaPublicClub clubQuery={queryData.club} />
  )
}
