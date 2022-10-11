import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultPublicPostQuery } from '@//:artifacts/ResultPublicPostQuery.graphql'
import { graphql } from 'react-relay'
import React from 'react'
import MetaSupportClub from './MetaSupportClub/MetaSupportClub'

interface Props {
  query: PreloadedQuery<ResultPublicPostQuery>
}

const Query = graphql`
  query ResultSupportClubQuery($slug: String!) {
    club(slug: $slug) {
      ...MetaSupportClubFragment
    }
    viewer {
      ...MetaSupportClubViewerFragment
    }
  }
`

// Handle the result of the query here and conditionally display data
export default function ResultSupportClub (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultPublicPostQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <></>
  }

  return (
    <MetaSupportClub clubQuery={queryData.club} viewerQuery={queryData.viewer} />
  )
}
