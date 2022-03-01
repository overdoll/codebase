import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Trans } from '@lingui/macro'
import AdminSearchRules from './AdminSearchRules/AdminSearchRules'
import { Stack } from '@chakra-ui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

export default function RootAdminSearchRules (): JSX.Element {
  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  return (
    <>
      <Helmet title='search rules' />
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Rules
            </Trans>
          </PageSectionTitle>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminSearchRules
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
