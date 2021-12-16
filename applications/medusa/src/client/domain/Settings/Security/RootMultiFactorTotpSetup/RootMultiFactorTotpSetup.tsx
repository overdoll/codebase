import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import MultiFactorTotpSetup from './MultiFactorTotpHeader/MultiFactorTotpHeader'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery as MultiFactorTotpHeaderQueryType } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Button from '@//:modules/form/Button/Button'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

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

  return (
    <>
      <Helmet title='authenticator setup' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>{t('totp.title')}</PageSectionTitle>
          <PageSectionDescription>{t('totp.description')}</PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <MultiFactorTotpSetup query={queryRef as PreloadedQuery<MultiFactorTotpHeaderQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
        <Flex justify='center'>
          <Link to='/settings/security'>
            <Button mt={8} size='sm' variant='link'>{t('recovery_codes.back')}</Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
