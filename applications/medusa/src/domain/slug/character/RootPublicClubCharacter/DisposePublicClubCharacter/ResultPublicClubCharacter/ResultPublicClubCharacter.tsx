import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultPublicClubCharacterQuery } from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import { graphql } from 'react-relay'
import EmptyPublicClubCharacter from './EmptyPublicClubCharacter/EmptyPublicClubCharacter'
import MetaPublicClubCharacter from './MetaPublicClubCharacter/MetaPublicClubCharacter'

interface Props {
  query: PreloadedQuery<ResultPublicClubCharacterQuery>
}

const Query = graphql`
  query ResultPublicClubCharacterQuery(
    $sortBy: PostsSort!,
    $clubSlug: String,
    $characterSlug: String!,
    $seed: String
  ) @preloadable {
    character(clubSlug: $clubSlug, slug: $characterSlug) {
      ...MetaPublicClubCharacterFragment
    }
  }
`

export default function ResultPublicClubCharacter (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultPublicClubCharacterQuery>(
    Query,
    query
  )

  if (queryData?.character == null) {
    return <EmptyPublicClubCharacter />
  }

  return (
    <MetaPublicClubCharacter characterQuery={queryData.character} />
  )
}
