import { usePaginationFragment } from 'react-relay'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { GridWrap } from '@//:modules/content/ContentSelection'
import type { UploadSearchTopicsSelectorQuery } from '@//:artifacts/UploadSearchTopicsSelectorQuery.graphql'
import type { UploadSearchTopicsSelectorFragment$data } from '@//:artifacts/UploadSearchTopicsSelectorFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import TopicTileOverlay from '@//:modules/content/ContentSelection/TileOverlay/TopicTileOverlay/TopicTileOverlay'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'
import UploadSearchTopicCategories from './UploadSearchTopicCategories/UploadSearchTopicCategories'
import LoadMoreShortGridTile
  from '@//:modules/content/ContentSelection/ShortGridTile/LoadMoreShortGridTile/LoadMoreShortGridTile'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUpdateEffect } from '@chakra-ui/react'

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
    first: {type: Int, defaultValue: 100}
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
    dispatch,
    state
  } = useSequenceContext()

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
    max: 1,
    onChange: (values) => {
      if (Object.keys(values).length > 0) {
        dispatch({
          type: 'deepValue',
          value: 'topic',
          transform: 'SET'
        })
      }
    }
  })

  useUpdateEffect(() => {
    if (state.deepValue == null) {
      clearTopics()
    }
  }, [state.deepValue])

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
