import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ResultBrowseCharactersQuery } from '@//:artifacts/ResultBrowseCharactersQuery.graphql'
import { graphql } from 'react-relay'
import MetaBrowseCharacters from './MetaBrowseCharacters/MetaBrowseCharacters'

interface Props {
  query: PreloadedQuery<ResultBrowseCharactersQuery>
}

const Query = graphql`
  query ResultBrowseCharactersQuery {
    ...MetaBrowseCharactersFragment
  }
`

export default function ResultBrowseCharacters (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultBrowseCharactersQuery>(
    Query,
    query
  )

  return (
    <MetaBrowseCharacters rootQuery={queryData} />
  )
}
