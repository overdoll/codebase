import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { ClickableBox, PageSectionDescription, PageSectionWrap, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Button, Heading } from '@chakra-ui/react'
import { GridWrap, LargeGridItem } from '../../../../../../components/ContentSelection'
import PostStateDraftPreview from './PostStateDraftPreview/PostStateDraftPreview'
import { Link } from '@//:modules/routing'
import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql'
import type { PostStateDraftFragment$key } from '@//:artifacts/PostStateDraftFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostStateDraftFragment$key
}

const Fragment = graphql`
  fragment PostStateDraftFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "DraftPostsPaginationQuery" ) {
    draftPosts: posts (first: $first, after: $after, state: DRAFT)
    @connection(key: "DraftPostsPaginationQuery_draftPosts") {
      edges {
        node {
          ...PostStateDraftPreviewFragment
        }
      }
    }
  }
`

export default function PostStateDraft ({ query }: Props): JSX.Element {
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

  if (data.draftPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Heading color='gray.00' fontSize='4xl'>
          <Trans>
            No Draft Posts
          </Trans>
        </Heading>
        <Link to='/configure/create-post'>
          <Button
            colorScheme='teal'
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
            Click on a draft post to continue editing it
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <GridWrap spacing={0}>
        {data.draftPosts.edges.map((item, index) =>
          <LargeGridItem key={index} h={230}>
            <PostStateDraftPreview query={item.node} />
          </LargeGridItem>
        )}
        {hasNext &&
          <LargeGridItem>
            <ClickableBox
              isLoading={isLoadingNext}
              onClick={() => loadNext(4)}
              h={230}
            >
              <Heading fontSize='lg' textAlign='center' color='gray.00'>
                <Trans>
                  Load More
                </Trans>
              </Heading>
            </ClickableBox>
          </LargeGridItem>}
      </GridWrap>
    </>
  )
}
