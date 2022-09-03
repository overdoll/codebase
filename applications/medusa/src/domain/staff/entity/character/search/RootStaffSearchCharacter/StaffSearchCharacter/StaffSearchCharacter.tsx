import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchSeriesQuery } from '@//:artifacts/StaffSearchSeriesQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { CharacterTileOverlay, GridTile, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchCharacterQuery($name: String) {
    ...StaffSearchCharacterFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchCharacterFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchCharacterPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "StaffCharacterConnection_characters")
    {
      edges {
        node {
          id
          slug
          series {
            slug
          }
          club {
            slug
          }
          ...CharacterTileOverlayFragment
        }
      }
    }
  }
`
export default function StaffSearchCharacter ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchSeriesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchSeriesQuery, any>(
    Fragment,
    queryData
  )
  const characters = removeNode(data.characters.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyCharacters hint={searchArguments.variables.name} />}
      condition={characters.length < 1}
    >
      <ShortGridWrap>
        {characters.map((item) => {
          const decideHref = item?.series == null
            ? {
                pathname: '/staff/entity/character/club/[clubSlug]/[slug]',
                query: {
                  slug: item.slug,
                  clubSlug: item.club.slug
                }
              }
            : {
                pathname: '/staff/entity/character/[seriesSlug]/[slug]',
                query: {
                  slug: item.slug,
                  seriesSlug: item.series.slug
                }
              }

          return (
            <GridTile key={item.node.id}>
              <LinkTile href={decideHref}>
                <CharacterTileOverlay query={item} />
              </LinkTile>
            </GridTile>
          )
        }
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </ShortGridWrap>
    </EmptyBoundary>
  )
}
