import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import type { PostsQuery as PostsQueryType } from '@//:artifacts/PostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Posts from './Posts/Posts'
import CommunityGuidelines from '../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

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
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <Posts
              query={queryRef as PreloadedQuery<PostsQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
