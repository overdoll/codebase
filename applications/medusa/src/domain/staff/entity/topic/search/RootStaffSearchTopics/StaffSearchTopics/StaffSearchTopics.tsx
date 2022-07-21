import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchTopicsQuery } from '@//:artifacts/StaffSearchTopicsQuery.graphql'
import { GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import TopicTileOverlay from '@//:modules/content/ContentSelection/TileOverlay/TopicTileOverlay/TopicTileOverlay'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchTopicsQuery {
    ...StaffSearchTopicsFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchTopicsFragment on Query
  @argumentDefinitions(
    first: {type: Int}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchTopicsPaginationFragment" )
  {
    topics (
      first: $first,
      after: $after,
    ) @connection(key: "StaffTopicsConnection_topics")
    {
      edges {
        node {
          slug
          ...TopicTileOverlayFragment
        }
      }
    }
  }
`

export default function StaffSearchTopics ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchTopicsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchTopicsQuery, any>(
    Fragment,
    queryData
  )

  return (
    <EmptyBoundary
      fallback={<></>}
      condition={data.topics.edges.length < 1}
    >
      <GridWrap>
        {data.topics.edges.map((item, index) => (
          <ShortGridTile key={index}>
            <LinkTile href={{
              pathname: '/staff/entity/topic/[slug]',
              query: { slug: item.node.slug }
            }}
            >
              <TopicTileOverlay query={item.node} />
            </LinkTile>
          </ShortGridTile>
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
