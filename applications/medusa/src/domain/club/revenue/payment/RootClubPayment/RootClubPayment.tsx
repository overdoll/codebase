import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubPaymentQuery as ClubPaymentQueryType } from '@//:artifacts/ClubPaymentQuery.graphql'
import ClubPaymentQuery from '@//:artifacts/ClubPaymentQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ClubPayment from './ClubPayment/ClubPayment'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { SkeletonStack } from '@//:modules/content/Placeholder'

interface Props {
  queryRefs: {
    clubPaymentQuery: PreloadedQuery<ClubPaymentQueryType>
  }
}

const RootClubPayment: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPaymentQuery,
    props.queryRefs.clubPaymentQuery
  )

  const {
    query: {
      reference,
      slug
    }
  } = useRouter()

  return (
    <>
      <Head>
        <title>
          Payment Information :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href={{
          pathname: '/club/[slug]/revenue/payments',
          query: { slug: slug as string }
        }}
        >
          <Trans>
            Back to Payments
          </Trans>
        </BackButton>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubPayment query={queryRef as PreloadedQuery<ClubPaymentQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootClubPayment
