import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicPostQuery } from '@//:artifacts/PublicPostQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import FullDetailedPost from './FullDetailedPost/FullDetailedPost'
import { GlobalVideoManagerProvider, PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/helpers/ObserverManager/ObserverManager'
import PostsInfiniteScroll from '../../../components/PostsInfiniteScroll/PostsInfiniteScroll'
import PageSectionScroller from '../../../components/PageSectionScroller/PageSectionScroller'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<PublicPostQuery>
}

const Query = graphql`
  query PublicPostQuery($reference: String!) {
    post(reference: $reference) {
      reference
      ...FullDetailedPostFragment
      ...PublicPostFragment
    }
    viewer {
      ...FullDetailedPostViewerFragment
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment PublicPostFragment on Post
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

export default function PublicPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicPostQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PublicPostQuery, any>(
    Fragment,
    queryData.post
  )

  const history = useHistory()

  if (queryData?.post == null) {
    history.push('/')
  }

  return (
    <GlobalVideoManagerProvider>
      <PageSectionScroller
        watchChange={queryData?.post?.reference}
        childrenTitle={<Trans>View Post</Trans>}
        infiniteScrollTitle={<Trans>Suggested Posts</Trans>}
        pageInfiniteScroll={(
          <PostsInfiniteScroll
            query={data.suggestedPosts}
            viewerQuery={queryData.viewer}
            hasNext={hasNext}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
          />
        )}
      >
        <ObserverManagerProvider>
          <PostVideoManagerProvider>
            <FullDetailedPost query={queryData?.post} viewerQuery={queryData?.viewer} />
          </PostVideoManagerProvider>
        </ObserverManagerProvider>
      </PageSectionScroller>
    </GlobalVideoManagerProvider>
  )
}
