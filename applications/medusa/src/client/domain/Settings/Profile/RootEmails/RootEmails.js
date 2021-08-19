/**
 * @flow
 */
import { useQueryLoader } from 'react-relay/hooks'
import Emails from './Emails/Emails'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { Divider, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import EmailsQuery from '@//:artifacts/EmailsQuery.graphql'
import type { EmailsQuery as EmailsQueryType } from '@//:artifacts/EmailsQuery.graphql'

type Props = {
  query: PreloadedQueryInner<EmailsQueryType>,
}

export default function RootEmails (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    EmailsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('profile.email.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <Emails query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
