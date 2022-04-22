import { Suspense } from 'react'
import type {
  PostModerationQueueQuery as PostModerationQueueQueryType
} from '@//:artifacts/PostModerationQueueQuery.graphql'
import PostModerationQueueQuery from '@//:artifacts/PostModerationQueueQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import PostModerationQueue from './PostModerationQueue/PostModerationQueue'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    postModerationQueueQuery: PreloadedQuery<PostModerationQueueQueryType>
  }
}

const RootPostModerationQueue: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PostModerationQueueQuery,
    props.queryRefs.postModerationQueueQuery
  )

  return (
    <>
      <Head>
        <title>
          Post Moderation Queue - Moderation :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Post Moderation Queue
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Before posts are visible to the public, they must be reviewed to ensure that they comply with the
              community guidelines.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <GlobalVideoManagerProvider>
              <PostModerationQueue
                query={queryRef as PreloadedQuery<PostModerationQueueQueryType>}
              />
            </GlobalVideoManagerProvider>
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootPostModerationQueue
