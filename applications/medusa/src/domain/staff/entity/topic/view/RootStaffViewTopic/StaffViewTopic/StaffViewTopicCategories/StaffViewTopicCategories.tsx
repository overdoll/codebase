import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import { CategoryTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'
import type { StaffViewTopicCategoriesFragment$key } from '@//:artifacts/StaffViewTopicCategoriesFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import LoadMoreShortGridTile
  from '@//:modules/content/ContentSelection/ShortGridTile/LoadMoreShortGridTile/LoadMoreShortGridTile'
import { StaffViewTopicQuery } from '@//:artifacts/StaffViewTopicQuery.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: StaffViewTopicCategoriesFragment$key
}

const Fragment = graphql`
  fragment StaffViewTopicCategoriesFragment on Topic
  @argumentDefinitions(
    first: {type: Int, defaultValue: 100}
    after: {type: String},
  )
  @refetchable(queryName: "StaffViewTopicCategoriesFragmentPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
    ) @connection(key: "StaffViewTopicCategoriesFragment_categories")
    {
      edges {
        node {
          id
          title
          slug
          ...CategoryTileOverlayFragment
        }
      }
    }
    title
    description
  }
`

export default function StaffViewTopicCategories ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffViewTopicQuery, any>(
    Fragment,
    query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Topic Categories
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <EmptyBoundary
        fallback={<></>}
        condition={data.categories.edges.length < 1}
      >
        <ShortGridWrap templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
          {data.categories.edges.map((item) => (
            <ShortGridTile key={item.node.id}>
              <LinkTile href={{
                pathname: '/staff/entity/category/[slug]',
                query: { slug: item.node.slug }
              }}
              >
                <CategoryTileOverlay query={item.node} />
              </LinkTile>
            </ShortGridTile>
          )
          )}
          <LoadMoreShortGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(15)}
            isLoadingNext={isLoadingNext}
          />
        </ShortGridWrap>
      </EmptyBoundary>
    </>
  )
}
