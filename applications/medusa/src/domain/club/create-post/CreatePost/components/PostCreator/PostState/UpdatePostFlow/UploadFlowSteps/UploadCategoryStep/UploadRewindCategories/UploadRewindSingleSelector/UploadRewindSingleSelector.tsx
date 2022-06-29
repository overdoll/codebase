import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { UploadRewindSingleSelectorQuery } from '@//:artifacts/UploadRewindSingleSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyPosts } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import PostPreviewContent
  from '../../../../../../../../../../../../modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

const Query = graphql`
  query UploadRewindSingleSelectorQuery($slug: String!) {
    club(slug: $slug) @required(action: THROW) {
      ...UploadRewindSingleSelectorFragment
    }
  }
`

const Fragment = graphql`
  fragment UploadRewindSingleSelectorFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 7}
    after: {type: String}
  )
  @refetchable(queryName: "UploadRewindSingleSelectorPaginationFragment" )
  {
    posts (
      first: $first,
      after: $after,
      sortBy: NEW
    ) @connection(key: "UploadRewindSingleSelector_posts")
    {
      edges {
        node {
          id
          categories {
            id
            title
          }
          ...PostPreviewContentFragment
        }
      }
    }
  }
`

export default function UploadRewindSingleSelector ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadRewindSingleSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadRewindSingleSelectorQuery, any>(
    Fragment,
    queryData.club
  )

  return (
    <>
      <EmptyBoundary
        fallback={(
          <EmptyPosts />
        )}
        condition={data.posts.edges.length < 1}
      >
        <GridWrap>
          {data.posts.edges.map((item, index) => (
            <GridTile key={index}>
              <Choice
                {...register(item.node.id, {
                  categories: item.node.categories
                })}
              >
                <PostPreviewContent key={index} query={item.node} />
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
    </>
  )
}
