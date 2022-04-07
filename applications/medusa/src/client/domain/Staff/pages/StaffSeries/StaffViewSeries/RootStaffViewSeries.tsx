import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewSeriesQuery as StaffViewSeriesQueryType } from '@//:artifacts/StaffViewSeriesQuery.graphql'
import StaffViewSeriesQuery from '@//:artifacts/StaffViewSeriesQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import StaffViewSeries from './StaffViewSeries/StaffViewSeries'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '../../../../../../modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

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

  const match = useParams()

  return (
    <>
      <Helmet>
        <title>
          View Series - Staff :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/staff/series/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewSeries query={queryRef as PreloadedQuery<StaffViewSeriesQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
