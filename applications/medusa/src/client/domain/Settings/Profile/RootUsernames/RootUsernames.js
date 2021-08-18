/**
 * @flow
 */
import { useQueryLoader } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { UsernamesQuery as UsernamesQueryType } from '@//:artifacts/UsernamesQuery.graphql'
import UsernamesQuery from '@//:artifacts/UsernamesQuery.graphql'
import Usernames from './Usernames/Usernames'
import { Divider, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'

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
      <Heading size='lg' color='gray.00'>{t('profile.username.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <Usernames query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
