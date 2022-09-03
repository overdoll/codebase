import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import { CharacterTileOverlay, GridTile, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import type { StaffSeriesSearchCharactersFragment$key } from '@//:artifacts/StaffSeriesSearchCharactersFragment.graphql'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'
import { StaffViewSeriesQuery } from '@//:artifacts/StaffViewSeriesQuery.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: StaffSeriesSearchCharactersFragment$key
}

const Fragment = graphql`
  fragment StaffSeriesSearchCharactersFragment on Series
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String},
  )
  @refetchable(queryName: "StaffSeriesSearchCharactersPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
    ) @connection(key: "StaffSeriesSearchCharacters_characters")
    {
      edges {
        node {
          id
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

export default function StaffSeriesSearchCharacters ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffViewSeriesQuery, any>(
    Fragment,
    query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Series Characters
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <EmptyBoundary
        fallback={(
          <EmptyCharacters />)}
        condition={data.characters.edges.length < 1}
      >
        <ShortGridWrap>
          {data.characters.edges.map((item) => (
            <GridTile key={item.node.id}>
              <LinkTile href={{
                pathname: '/staff/entity/character/[seriesSlug]/[slug]',
                query: {
                  slug: item.node.slug,
                  seriesSlug: item.node.series.slug
                }
              }}
              >
                <CharacterTileOverlay query={item.node} />
              </LinkTile>
            </GridTile>
          )
          )}
          <LoadMoreGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(15)}
            isLoadingNext={isLoadingNext}
          />
        </ShortGridWrap>
      </EmptyBoundary>
    </>

  )
}
