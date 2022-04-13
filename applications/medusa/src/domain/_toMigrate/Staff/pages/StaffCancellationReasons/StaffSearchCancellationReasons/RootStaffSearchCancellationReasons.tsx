import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Trans } from '@lingui/macro'
import StaffSearchCancellationReasons from './StaffSearchCancellationReasons/StaffSearchCancellationReasons'
import { Stack } from '@chakra-ui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import Head from 'next/head'

export default function RootStaffSearchCancellationReasons (): JSX.Element {
  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  return (
    <>
      <Head>
        <title>
          Search Cancellation Reasons - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Cancellation Reasons
            </Trans>
          </PageSectionTitle>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffSearchCancellationReasons
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
