import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchSeriesQuery } from '@//:artifacts/AdminSearchSeriesQuery.graphql'
import { removeNode } from '@//:modules/support'
import {
  CharacterTileOverlay,
  GridTile,
  GridWrap,
  LinkTile,
  LoadMoreGridTile
} from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query AdminSearchCharacterQuery($name: String) {
    ...AdminSearchCharacterFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchCharacterFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchCharacterPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "AdminCharacterConnection_characters")
    {
      edges {
        node {
          slug
          series {
            slug
          }
          ...CharacterTileOverlayFragment
        }
      }
    }
  }
`
export default function AdminSearchCharacter ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchSeriesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<AdminSearchSeriesQuery, any>(
    Fragment,
    queryData
  )
  const characters = removeNode(data.characters.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyCharacters hint={searchArguments.variables.name} />}
      condition={characters.length < 1}
    >
      <GridWrap justify='center'>
        {characters.map((item, index) => (
          <GridTile key={index}>
            <LinkTile to={`/admin/character/search/${item.slug as string}/${item.series.slug as string}`}>
              <CharacterTileOverlay query={item} />
            </LinkTile>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
