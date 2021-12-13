import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import MultiFactorTotpSetup from './MultiFactorTotpHeader/MultiFactorTotpHeader'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery as MultiFactorTotpHeaderQueryType } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Button from '@//:modules/form/Button/Button'

interface Props {
  prepared: {
    totpQuery: PreloadedQuery<MultiFactorTotpHeaderQueryType>
  }
}

export default function RootMultiFactorTotpSetup (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorTotpHeaderQuery,
    props.prepared.totpQuery
  )

  const [t] = useTranslation('configure')

  const refetch = (): void => {
    loadQuery({})
  }

  if (queryRef == null) return null

  return (
    <>
      <Helmet title='authenticator setup' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>{t('totp.title')}</PageSectionTitle>
          <PageSectionDescription>{t('totp.description')}</PageSectionDescription>
        </PageSectionWrap>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({
              error,
              reset
            }) => (
              <ErrorFallback error={error} reset={reset} refetch={refetch} />
            )}
          >
            <MultiFactorTotpSetup query={queryRef} />
          </ErrorBoundary>
        </Suspense>
        <Flex justify='center'>
          <Link to='/settings/security'>
            <Button mt={8} size='sm' variant='link'>{t('recovery_codes.back')}</Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
