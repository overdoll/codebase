/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { useQueryLoader } from 'react-relay/hooks'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import type { RecoveryCodesSetupQuery as RecoveryCodesSetupQueryType } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import RecoveryCodesSetup from './RecoveryCodesSetup/RecoveryCodesSetup'
import Button from '@//:modules/form/Button'
import Link from '@//:modules/routing/Link'
import { PageSectionTitle, PageSectionDescription, PageSectionWrap, PageWrapper } from '../../../components/PageLayout'

type Props = {
  prepared: {
    recoveryCodesQuery: RecoveryCodesSetupQueryType
  }
}

export default function RootRecoveryCodesSetup (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    RecoveryCodesSetupQuery,
    props.prepared.recoveryCodesQuery
  )

  const [t] = useTranslation('configure')

  return (
    <>
      <Helmet title='recovery setup' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>{t('recovery_codes.title')}</PageSectionTitle>
          <PageSectionDescription>{t('recovery_codes.description')}</PageSectionDescription>
        </PageSectionWrap>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <RecoveryCodesSetup query={queryRef} />
          </ErrorBoundary>
        </Suspense>
        <Flex justify='center'>
          <Link to='/settings/security'>
            <Button w='100%' mt={8} size='sm' variant='link'>{t('recovery_codes.back')}</Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
