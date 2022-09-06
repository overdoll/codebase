import { usePaginationFragment } from 'react-relay'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { GridWrap } from '@//:modules/content/ContentSelection'
import type { CurationTopicsSelectorQuery } from '@//:artifacts/CurationTopicsSelectorQuery.graphql'
import type { CurationTopicsSelectorFragment$data } from '@//:artifacts/CurationTopicsSelectorFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import TopicTileOverlay from '@//:modules/content/ContentSelection/TileOverlay/TopicTileOverlay/TopicTileOverlay'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'
import CurationTopicCategories from './CurationTopicCategories/CurationTopicCategories'
import LoadMoreShortGridTile
  from '@//:modules/content/ContentSelection/ShortGridTile/LoadMoreShortGridTile/LoadMoreShortGridTile'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

interface ChoiceProps {
  node: CurationTopicsSelectorFragment$data['topics']['edges'][0]['node']
}

const Query = graphql`
  query CurationTopicsSelectorQuery {
    ...CurationTopicsSelectorFragment
  }
`

const Fragment = graphql`
  fragment CurationTopicsSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 100}
    after: {type: String},
  )
  @refetchable(queryName: "CurationTopicsSelectorFragmentPaginationFragment" )
  {
    topics (
      first: $first,
      after: $after,
    ) @connection(key: "CurationTopicsSelectorFragment_topics")
    {
      edges {
        node {
          id
          ...TopicTileOverlayFragment
          ...CurationTopicCategoriesFragment
        }
      }
    }
  }
`

export default function CurationTopicsSelector ({
  searchArguments,
  register: registerCategory
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<CurationTopicsSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<CurationTopicsSelectorQuery, any>(
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
      <CurationTopicCategories
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
        {data.topics.edges.map((item) => (
          <ShortGridTile key={item.node.id}>
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
        <LoadMoreShortGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(7)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
