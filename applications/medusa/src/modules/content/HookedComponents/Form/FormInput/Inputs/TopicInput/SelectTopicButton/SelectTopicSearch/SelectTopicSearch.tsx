import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { SelectTopicSearchQuery, SelectTopicSearchQuery$variables } from '@//:artifacts/SelectTopicSearchQuery.graphql'
import { GridTile, GridWrap, LoadMoreGridTile } from '../../../../../../../ContentSelection'
import { EmptyBoundary } from '../../../../../../../Placeholder'
import { Choice } from '../../../../../../Choice'
import { ComponentSearchArguments } from '../../../../../../Search/types'
import { ComponentChoiceArguments } from '../../../../../../Choice/types'
import EmptyTopics from '../../../../../../../Placeholder/Empty/EmptyTopics/EmptyTopics'
import TopicTileOverlay from '../../../../../../../ContentSelection/TileOverlay/TopicTileOverlay/TopicTileOverlay'

type Props = ComponentSearchArguments<SelectTopicSearchQuery$variables> & ComponentChoiceArguments<any>

const Query = graphql`
  query SelectTopicSearchQuery {
    ...SelectTopicSearchFragment
  }
`

const Fragment = graphql`
  fragment SelectTopicSearchFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 12}
    after: {type: String}
  )
  @refetchable(queryName: "SelectSeriesPaginationFragment" )
  {
    topics (
      first: $first,
      after: $after,
    ) @connection(key: "StaffTopicsConnection_topics")
    {
      edges {
        node {
          id
          title
          ...TopicTileOverlayFragment
        }
      }
    }
  }
`
export default function SelectTopicSearch ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SelectTopicSearchQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SelectTopicSearchQuery, any>(
    Fragment,
    queryData
  )

  return (
    <EmptyBoundary
      fallback={<EmptyTopics />}
      condition={data.topics.edges.length < 1}
    >
      <GridWrap>
        {data.topics.edges.map((item) => (
          <GridTile key={item.node.id}>
            <Choice
              {...register(item.node.id, { title: item.node.title })}
            >
              <TopicTileOverlay query={item.node} />
            </Choice>
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
