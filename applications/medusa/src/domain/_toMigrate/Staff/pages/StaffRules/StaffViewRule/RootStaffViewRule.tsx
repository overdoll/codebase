import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewRuleQuery as StaffViewRuleQueryType } from '@//:artifacts/StaffViewRuleQuery.graphql'
import StaffViewRuleQuery from '@//:artifacts/StaffViewRuleQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import StaffViewRule from './StaffViewRule/StaffViewRule'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffViewRuleQueryType>
  }
}

export default function RootStaffViewRule (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewRuleQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Head>
        <title>
          View Rule - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/rule/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            reference: match.reference as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewRule query={queryRef as PreloadedQuery<StaffViewRuleQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
