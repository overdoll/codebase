import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultPublicPostQuery } from '@//:artifacts/ResultPublicPostQuery.graphql'
import { graphql } from 'react-relay'
import React from 'react'
import EmptyPublicPost from './EmptyPublicPost/EmptyPublicPost'
import MetaPublicPost from './MetaPublicPost/MetaPublicPost'

interface Props {
  query: PreloadedQuery<ResultPublicPostQuery>
}

const Query = graphql`
  query ResultPublicPostQuery($reference: String!) {
    post(reference: $reference) {
      ...MetaPublicPostFragment
    }
    viewer {
      ...MetaPublicPostViewerFragment
    }
  }
`

// Handle the result of the query here and conditionally display data
export default function ResultPublicPost (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultPublicPostQuery>(
    Query,
    query
  )

  if (queryData?.post == null) {
    return (
      <EmptyPublicPost />
    )
  }

  return (
    <MetaPublicPost postQuery={queryData.post} viewerQuery={queryData.viewer} />
  )
}
