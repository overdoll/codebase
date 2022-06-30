import { graphql, useFragment, useLazyLoadQuery } from 'react-relay/hooks'
import type { UploadRewindSingleSelectorQuery } from '@//:artifacts/UploadRewindSingleSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyPosts } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import PostPreviewContent
  from '../../../../../../../../../../../../modules/content/Posts/components/PostData/PostPreviewContent/PostPreviewContent'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import type {
  UploadRewindSingleSelectorPostFragment$key
} from '@//:artifacts/UploadRewindSingleSelectorPostFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
  query: UploadRewindSingleSelectorPostFragment$key
}

const Query = graphql`
  query UploadRewindSingleSelectorQuery($slug: String!, $state: PostState) {
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
      sortBy: NEW,
      state: $state
    ) @connection(key: "ClubPosts_posts")
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

const PostFragment = graphql`
  fragment UploadRewindSingleSelectorPostFragment on Post {
    id
  }
`

export default function UploadRewindSingleSelector ({
  searchArguments,
  register,
  query
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

  const postData = useFragment(PostFragment, query)

  return (
    <Stack spacing={2}>
      <Heading fontSize='md' color='gray.200'>
        <Trans>
          Select a post to see the available categories
        </Trans>
      </Heading>
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
                isDisabled={postData.id === item.node.id}
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
    </Stack>
  )
}
