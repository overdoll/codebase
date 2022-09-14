import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultSearchCharacterQuery } from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import { graphql } from 'react-relay'
import EmptySearchCharacter from './EmptySearchCharacter/EmptySearchCharacter'
import MetaSearchCharacter from './MetaSearchCharacter/MetaSearchCharacter'

interface Props {
  query: PreloadedQuery<ResultSearchCharacterQuery>
}

const Query = graphql`
  query ResultSearchCharacterQuery(
    $sortBy: PostsSort!,
    $seriesSlug: String,
    $characterSlug: String!,
    $seed: String
  ) @preloadable {
    character(seriesSlug: $seriesSlug, slug: $characterSlug) {
      ...MetaSearchCharacterFragment
    }
    viewer {
      ...MetaSearchCharacterViewerFragment
    }
  }
`

export default function ResultSearchCharacter (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultSearchCharacterQuery>(
    Query,
    query
  )

  if (queryData?.character == null) {
    return <EmptySearchCharacter />
  }

  return (
    <MetaSearchCharacter characterQuery={queryData.character} viewerQuery={queryData.viewer} />
  )
}
