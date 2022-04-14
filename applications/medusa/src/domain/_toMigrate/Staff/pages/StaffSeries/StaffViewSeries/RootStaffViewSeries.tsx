import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewSeriesQuery as StaffViewSeriesQueryType } from '@//:artifacts/StaffViewSeriesQuery.graphql'
import StaffViewSeriesQuery from '@//:artifacts/StaffViewSeriesQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewSeries from './StaffViewSeries/StaffViewSeries'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffViewSeriesQueryType>
  }
}

export default function RootStaffViewSeries (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewSeriesQuery,
    props.prepared.query
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Series - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/series/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewSeries query={queryRef as PreloadedQuery<StaffViewSeriesQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
