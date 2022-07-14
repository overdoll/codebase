import { usePaginationFragment } from 'react-relay'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import type { UploadSearchTopicsSelectorQuery } from '@//:artifacts/UploadSearchTopicsSelectorQuery.graphql'
import type { UploadSearchTopicsSelectorFragment$data } from '@//:artifacts/UploadSearchTopicsSelectorFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import TopicTileOverlay from '@//:modules/content/ContentSelection/TileOverlay/TopicTileOverlay/TopicTileOverlay'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'
import UploadSearchTopicCategories from './UploadSearchTopicCategories/UploadSearchTopicCategories'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

interface ChoiceProps {
  node: UploadSearchTopicsSelectorFragment$data['topics']['edges'][0]['node']
}

const Query = graphql`
  query UploadSearchTopicsSelectorQuery {
    ...UploadSearchTopicsSelectorFragment
  }
`

const Fragment = graphql`
  fragment UploadSearchTopicsSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 13}
    after: {type: String},
  )
  @refetchable(queryName: "UploadSearchTopicsSelectorFragmentPaginationFragment" )
  {
    topics (
      first: $first,
      after: $after,
    ) @connection(key: "UploadSearchTopicsSelectorFragment_topics")
    {
      edges {
        node {
          id
          ...TopicTileOverlayFragment
          ...UploadSearchTopicCategoriesFragment
        }
      }
    }
  }
`

export default function UploadSearchTopicsSelector ({
  searchArguments,
  register: registerCategory
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadSearchTopicsSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchTopicsSelectorQuery, any>(
    Fragment,
    queryData
  )

  const {
    register: registerTopic,
    clearValues: clearTopics,
    values: topicValues
  } = useChoice<ChoiceProps>({
    max: 1
  })

  if (Object.values(topicValues).length > 0) {
    return (
      <UploadSearchTopicCategories
        query={Object.values(topicValues)[0].node}
        clearValues={clearTopics}
        register={registerCategory}
      />
    )
  }

  return (
    <EmptyBoundary
      fallback={<></>}
      condition={data.topics.edges.length < 1}
    >
      <GridWrap>
        {data.topics.edges.map((item, index) => (
          <ShortGridTile key={index}>
            <Choice
              {...registerTopic(item.node.id, {
                node: item.node
              })}
            >
              <TopicTileOverlay query={item.node} />
            </Choice>
          </ShortGridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(7)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
