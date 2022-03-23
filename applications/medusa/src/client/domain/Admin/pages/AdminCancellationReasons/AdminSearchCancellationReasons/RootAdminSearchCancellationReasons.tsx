import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Trans } from '@lingui/macro'
import AdminSearchCancellationReasons from './AdminSearchCancellationReasons/AdminSearchCancellationReasons'
import { Stack } from '@chakra-ui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

export default function RootAdminSearchCancellationReasons (): JSX.Element {
  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  return (
    <>
      <Helmet title='search cancellation reasons' />
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Cancellation Reasons
            </Trans>
          </PageSectionTitle>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminSearchCancellationReasons
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
