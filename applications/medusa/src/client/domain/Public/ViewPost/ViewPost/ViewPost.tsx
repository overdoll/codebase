import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewPostQuery } from '@//:artifacts/ViewPostQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import FullDetailedPost from './FullDetailedPost/FullDetailedPost'
import { GlobalVideoManagerProvider, PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/helpers/ObserverManager/ObserverManager'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import PostsInfiniteScroll from '../../../../components/PostsInfiniteScroll/PostsInfiniteScroll'

interface Props {
  query: PreloadedQuery<ViewPostQuery>
}

const Query = graphql`
  query ViewPostQuery($reference: String!) {
    post(reference: $reference) {
      ...FullDetailedPostFragment
      ...ViewPostFragment
    }
    viewer {
      ...FullDetailedPostViewerFragment
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment ViewPostFragment on Post
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ViewPostPaginationQuery" ) {
    suggestedPosts (first: $first, after: $after)
    @connection (key: "ViewPost_suggestedPosts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function ViewPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewPostQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ViewPostQuery, any>(
    Fragment,
    queryData.post
  )

  const history = useHistory()

  if (queryData?.post == null) {
    history.push('/')
  }

  return (
    <GlobalVideoManagerProvider>
      <Stack spacing={16}>
        <ObserverManagerProvider>
          <PostVideoManagerProvider>
            <FullDetailedPost query={queryData?.post} viewerQuery={queryData?.viewer} />
          </PostVideoManagerProvider>
        </ObserverManagerProvider>
        <Box>
          <PageSectionWrap>
            <PageSectionTitle colorScheme='primary'>
              <Trans>
                Suggested Posts
              </Trans>
            </PageSectionTitle>
          </PageSectionWrap>
          <PostsInfiniteScroll
            query={data.suggestedPosts}
            viewerQuery={queryData.viewer}
            hasNext={hasNext}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
          />
        </Box>
      </Stack>
    </GlobalVideoManagerProvider>
  )
}
