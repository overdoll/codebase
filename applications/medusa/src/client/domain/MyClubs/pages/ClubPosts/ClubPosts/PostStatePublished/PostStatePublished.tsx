import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql'
import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStatePublishedFragment$key } from '@//:artifacts/PostStatePublishedFragment.graphql'
import {
  ClickableBox,
  ListSpacer,
  PageSectionDescription,
  PageSectionWrap,
  PostPlaceholder
} from '@//:modules/content/PageLayout'
import { Button, Heading } from '@chakra-ui/react'
import PostStatePublishedPreview from './PostStatePublishedPreview/PostStatePublishedPreview'
import { Link } from '@//:modules/routing'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostStatePublishedFragment$key
}

const Fragment = graphql`
  fragment PostStatePublishedFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "PublishedPostsPaginationQuery" ) {
    publishedPosts: posts (first: $first, after: $after, state: PUBLISHED)
    @connection(key: "PublishedPostsPaginationQuery_publishedPosts") {
      edges {
        node {
          ...PostStatePublishedPreviewFragment
        }
      }
    }
  }
`

export default function PostStateReview ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<MyPostsQuery,
  any>(
    Fragment,
    query
  )

  if (data.publishedPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Heading color='gray.00' fontSize='4xl'>
          <Trans>
            No Published Posts
          </Trans>
        </Heading>
        <Link to='/configure/create-post'>
          <Button
            colorScheme='green'
            variant='solid'
            size='lg'
          ><Trans>
            Create a post
          </Trans>
          </Button>
        </Link>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            Click on a published post to see it live.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <ListSpacer>
        {data.publishedPosts.edges.map((item, index) =>
          <PostStatePublishedPreview key={index} query={item.node} />
        )}
        {hasNext &&
          <ClickableBox
            isLoading={isLoadingNext}
            onClick={() => loadNext(3)}
            h={100}
          >
            <Heading fontSize='lg' textAlign='center' color='gray.00'>
              <Trans>
                Load More
              </Trans>
            </Heading>
          </ClickableBox>}
      </ListSpacer>
    </>
  )
}
