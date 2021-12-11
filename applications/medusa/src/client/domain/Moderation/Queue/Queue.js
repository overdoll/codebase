/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import type { PostsQuery as PostsQueryType } from '@//:artifacts/PostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import Posts from './Posts/Posts'
import { useQueryLoader } from 'react-relay/hooks'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import CommunityGuidelines from '../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { PageWrapper, PageSectionWrap, PageSectionTitle, PageSectionDescription } from '@//:modules/content/PageLayout'

type Props = {
  prepared: {
    postsQuery: PreloadedQueryInner<PostsQueryType>,
  }
}

export default function Queue (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    PostsQuery,
    props.prepared.postsQuery
  )

  const [t] = useTranslation('moderation')

  return (
    <>
      <Helmet title='queue' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            {t('queue.title')}
          </PageSectionTitle>
          <PageSectionDescription>
            {t('queue.post.actions.notice.description')}
          </PageSectionDescription>
          <CommunityGuidelines />
        </PageSectionWrap>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <Posts
              query={queryRef}
            />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
