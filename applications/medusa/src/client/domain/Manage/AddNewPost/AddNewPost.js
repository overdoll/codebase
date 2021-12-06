/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { useQueryLoader } from 'react-relay/hooks'
import type { DraftPostsQuery as DraftPostsQueryType } from '@//:artifacts/DraftPostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import FileUploader from './FileUploader/FileUploader'
import { useTranslation } from 'react-i18next'

type Props = {}

export default function AddNewPost (props: Props): Node {
  const [t] = useTranslation('manage')

  return (
    <>
      <Helmet title='posts' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>{t('posts.title')}</PageSectionTitle>
        </PageSectionWrap>
        <FileUploader />
      </PageWrapper>
    </>
  )
}
