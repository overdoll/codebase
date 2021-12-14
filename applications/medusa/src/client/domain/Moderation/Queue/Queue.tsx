import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import type { PostsQuery as PostsQueryType } from '@//:artifacts/PostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Posts from './Posts/Posts'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import CommunityGuidelines from '../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'

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

  const [t] = useTranslation('moderation')

  const refetch = (): void => {
    loadQuery({})
  }

  if (queryRef == null) return null

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
            fallback={({
              error,
              reset
            }) => (
              <ErrorFallback
                error={error}
                reset={reset}
                refetch={refetch}
              />
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
