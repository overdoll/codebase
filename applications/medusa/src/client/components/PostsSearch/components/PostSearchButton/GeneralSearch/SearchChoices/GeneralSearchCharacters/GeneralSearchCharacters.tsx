import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import removeNode from '@//:modules/support/removeNode'
import type { GeneralSearchCharactersFragment$key } from '@//:artifacts/GeneralSearchCharactersFragment.graphql'
import { Trans } from '@lingui/macro'
import { Choice, useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { CharacterTileOverlay, GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import type { SearchChoicesQuery } from '@//:artifacts/SearchChoicesQuery.graphql'

interface Props {
  query: GeneralSearchCharactersFragment$key
}

const Fragment = graphql`
  fragment GeneralSearchCharactersFragment on Query
  @argumentDefinitions(
    after: {type: String}
    first: {type: Int, defaultValue: 5}
  )
  @refetchable(queryName: "GeneralSearchCharactersFragmentPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $search,
      slugs: $charactersSlugs
      seriesSlug: $charactersSeriesSlug
    ) @connection(key: "SearchCharactersGeneral_characters")
    {

      edges {
        node {
          id
          slug
          name
          series {
            slug
          }
          ...CharacterTileOverlayFragment
        }
      }
    }
  }
`

export default function GeneralSearchCharacters ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SearchChoicesQuery, any>(
    Fragment,
    query
  )
  const characters = removeNode(data.characters.edges)

  const { register } = useChoiceContext()

  return (
    <EmptyBoundary
      fallback={<></>}
      condition={characters.length < 1}
    >
      <GridWrap justify='center'>
        {characters.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.id, {
              name: item.name,
              slug: item.slug,
              series: {
                slug: item.series.slug
              },
              tagTitle: item.name,
              type: 'character'
            })}
            >
              <CharacterTileOverlay query={item} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          text={<Trans>Load More Characters</Trans>}
          hasNext={hasNext && characters.length > 0}
          onLoadNext={() => loadNext(6)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
