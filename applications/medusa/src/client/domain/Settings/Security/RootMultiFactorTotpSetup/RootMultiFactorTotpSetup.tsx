import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import MultiFactorTotpSetup from './MultiFactorTotpHeader/MultiFactorTotpHeader'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type {
  MultiFactorTotpHeaderQuery as MultiFactorTotpHeaderQueryType
} from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Button from '@//:modules/form/Button/Button'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'

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

  return (
    <>
      <Helmet title='authenticator setup' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Set up two-factor authentication
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Improve the security of your account in three easy steps by enabling two-factor authentication.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <MultiFactorTotpSetup query={queryRef as PreloadedQuery<MultiFactorTotpHeaderQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
        <Flex justify='center'>
          <Link to='/settings/security'>
            <Button mt={8} size='sm' variant='link'>
              <Trans>
                Go back to settings
              </Trans>
            </Button>
          </Link>
        </Flex>
      </PageWrapper>
    </>
  )
}
