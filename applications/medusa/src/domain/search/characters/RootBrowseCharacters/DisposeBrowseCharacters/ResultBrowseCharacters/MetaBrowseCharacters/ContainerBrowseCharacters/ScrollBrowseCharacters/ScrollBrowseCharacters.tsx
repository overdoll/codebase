import { ScrollBrowseCharactersFragment$key } from '@//:artifacts/ScrollBrowseCharactersFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ResultBrowseCategoriesQuery } from '@//:artifacts/ResultBrowseCategoriesQuery.graphql'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import SearchResultsCharacter
  from '@//:common/components/PageHeader/SearchButton/components/SearchBody/SearchResults/SearchResultsUnion/SearchResultsCharacter/SearchResultsCharacter'

interface Props {
  query: ScrollBrowseCharactersFragment$key
}

const Fragment = graphql`
  fragment ScrollBrowseCharactersFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 24}
    after: {type: String}
  )
  @refetchable(queryName: "ScrollBrowseCharactersPaginationQuery" ) {
    characters (first: $first, after: $after, excludeEmpty: true)
    @connection (key: "ScrollBrowseCharacters_characters") {
      edges {
        node {
          id
          ...SearchResultsCharacterFragment
        }
      }
    }
  }
`

export default function ScrollBrowseCharacters (props: Props): JSX.Element {
  const {
    query
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultBrowseCategoriesQuery, any>(
    Fragment,
    query
  )

  return (
    <>
      <EmptyBoundary
        fallback={
          <EmptyCharacters />
        }
        condition={data.characters.edges.length < 1}
      >
        <GridWrap templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
          {data.characters.edges.map((item) =>
            <GridTile key={item.node.id}>
              <SearchResultsCharacter query={item.node} />
            </GridTile>)}
          <LoadMoreGridTile
            text={<Trans>Load More Characters</Trans>}
            hasNext={hasNext}
            onLoadNext={() => loadNext(24)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
