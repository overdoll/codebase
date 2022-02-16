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
import { QueryArguments } from '@//:types/hooks'
import { EmptyCharacters } from '@//:modules/content/Placeholder'

interface Props {
  queryArgs: QueryArguments
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
export default function AdminSearchCharacter ({ queryArgs }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchSeriesQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
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

  if (characters.length < 1) {
    return (
      <EmptyCharacters hint={queryArgs.variables.name} />
    )
  }

  return (
    <>
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
    </>
  )
}
