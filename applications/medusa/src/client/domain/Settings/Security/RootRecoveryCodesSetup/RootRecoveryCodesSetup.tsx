import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { RecoveryCodesSetupQuery as RecoveryCodesSetupQueryType } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import Link from '@//:modules/routing/Link'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import RecoveryCodesSetup from './RecoveryCodesSetup/RecoveryCodesSetup'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

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

  return (
    <>
      <Helmet title='recovery setup' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>{t('recovery_codes.title')}</PageSectionTitle>
          <PageSectionDescription>{t('recovery_codes.description')}</PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <RecoveryCodesSetup query={queryRef as PreloadedQuery<RecoveryCodesSetupQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
        <Flex justify='center'>
          <Link to='/settings/security'>
            <Button w='100%' mt={8} size='sm' variant='link'>{t('recovery_codes.back')}</Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
