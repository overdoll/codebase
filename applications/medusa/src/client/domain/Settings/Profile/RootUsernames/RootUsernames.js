/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { UsernamesQuery as UsernamesQueryType } from '@//:artifacts/UsernamesQuery.graphql'
import UsernamesQuery from '@//:artifacts/UsernamesQuery.graphql'
import Usernames from './Usernames/Usernames'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'

type Props = {
  query: PreloadedQueryInner<UsernamesQueryType>,
}

export default function RootUsernames (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    UsernamesQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('profile.username.title')}</PageSectionTitle>
      </PageSectionWrap>
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({
            error,
            reset
          }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <Usernames query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
