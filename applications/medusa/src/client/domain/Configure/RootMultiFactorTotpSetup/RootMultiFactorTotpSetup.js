/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import MultiFactorTotpSetup from './MultiFactorTotpHeader/MultiFactorTotpHeader'
import { useQueryLoader } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery as MultiFactorTotpHeaderQueryType } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import { PageWrapper, PageSectionWrap, PageSectionTitle, PageSectionDescription } from '../../../components/PageLayout'
import Button from '@//:modules/form/Button'

type Props = {
  prepared: {
    totpQuery: MultiFactorTotpHeaderQueryType
  }
}

export default function RootMultiFactorTotpSetup (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorTotpHeaderQuery,
    props.prepared.totpQuery
  )

  const [t] = useTranslation('configure')

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
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
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
