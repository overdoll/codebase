import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import PostReports from './PostReports/PostReports'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SearchDateRange, {
  getDateRangeDefault
} from '@//:modules/content/HookedComponents/Search/components/SearchDateRange/SearchDateRange'
import { Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface SearchProps {
  from: Date
  to: Date
}

const RootPostReports: PageProps<{}> = () => {
  const {
    searchArguments,
    register,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      ...getDateRangeDefault()
    }
  })

  return (
    <>
      <Head>
        <title>
          Post Reports - Moderation - overdoll
        </title>
      </Head>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Post Reports
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              View reported posts
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <Stack spacing={2}>
          <SearchDateRange {...register('dateRange', 'change')} />
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <PostReports searchArguments={searchArguments} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootPostReports
