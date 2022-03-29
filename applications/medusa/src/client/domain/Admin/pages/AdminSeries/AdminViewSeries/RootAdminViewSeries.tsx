import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AdminViewSeriesQuery as AdminViewSeriesQueryType } from '@//:artifacts/AdminViewSeriesQuery.graphql'
import AdminViewSeriesQuery from '@//:artifacts/AdminViewSeriesQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import AdminViewSeries from './AdminViewSeries/AdminViewSeries'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminBackButton from '../../../components/AdminBackButton/AdminBackButton'
import { Trans } from '@lingui/macro'
import BackButton from '../../../../../../modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminViewSeriesQueryType>
  }
}

export default function RootAdminViewSeries (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminViewSeriesQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view series' />
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/admin/series/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminViewSeries query={queryRef as PreloadedQuery<AdminViewSeriesQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
