import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { RecoveryCodesSetupQuery as RecoveryCodesSetupQueryType } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import Link from '@//:modules/routing/Link'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import RecoveryCodesSetup from './RecoveryCodesSetup/RecoveryCodesSetup'

interface Props {
  prepared: {
    recoveryCodesQuery: PreloadedQuery<RecoveryCodesSetupQueryType>
  }
}

export default function RootRecoveryCodesSetup (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    RecoveryCodesSetupQuery,
    props.prepared.recoveryCodesQuery
  )

  const [t] = useTranslation('configure')

  const refetch = (): void => {
    loadQuery({})
  }

  if (queryRef == null) return null

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
