import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import type { PostsQuery as PostsQueryType } from '@//:artifacts/PostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Posts from './Posts/Posts'
import CommunityGuidelines from '../../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'

interface Props {
  prepared: {
    postsQuery: PreloadedQuery<PostsQueryType>
  }
}

export default function Queue (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    PostsQuery,
    props.prepared.postsQuery
  )

  return (
    <>
      <Helmet title='queue' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Moderation Queue
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Before posts are visible to the public, they must be reviewed to ensure that they comply with the
              community guidelines.
            </Trans>
          </PageSectionDescription>
          <CommunityGuidelines />
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <GlobalVideoManagerProvider>
              <Posts
                query={queryRef as PreloadedQuery<PostsQueryType>}
              />
            </GlobalVideoManagerProvider>
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
