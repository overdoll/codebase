import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubPaymentsQuery as ClubPaymentsQueryType } from '@//:artifacts/ClubPaymentsQuery.graphql'
import ClubPaymentsQuery from '@//:artifacts/ClubPaymentsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ClubPayments from './ClubPayments/ClubPayments'
import { Trans } from '@lingui/macro'
import { Box } from '@chakra-ui/react'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  queryRefs: {
    clubPaymentsQuery: PreloadedQuery<ClubPaymentsQueryType>
  }
}

const RootClubPayments: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPaymentsQuery,
    props.queryRefs.clubPaymentsQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club Payments :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href={{
          pathname: '/club/[slug]/revenue',
          query: { slug: slug as string }
        }}
        >
          <Trans>
            Back to Revenue
          </Trans>
        </BackButton>
        <Box>
          <PageSectionWrap>
            <PageSectionTitle>
              <Trans>
                Payments
              </Trans>
            </PageSectionTitle>
            <PageSectionDescription>
              <Trans>
                Your club's Payments are the detailed breakdown of the revenue and any deductions you generate through
                subscriptions.
              </Trans>
            </PageSectionDescription>
          </PageSectionWrap>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
            <Suspense fallback={<SkeletonRectangleGrid />}>
              <ClubPayments query={queryRef as PreloadedQuery<ClubPaymentsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
      </PageWrapper>
    </>
  )
}

export default RootClubPayments
