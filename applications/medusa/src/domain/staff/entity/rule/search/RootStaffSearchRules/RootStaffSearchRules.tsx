import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Trans } from '@lingui/macro'
import StaffSearchRules from './StaffSearchRules/StaffSearchRules'
import { Stack } from '@chakra-ui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

const RootStaffSearchRules: PageProps<{}> = () => {
  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  return (
    <>
      <Head>
        <title>
          Search Rules - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Rules
            </Trans>
          </PageSectionTitle>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffSearchRules
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffSearchRules
