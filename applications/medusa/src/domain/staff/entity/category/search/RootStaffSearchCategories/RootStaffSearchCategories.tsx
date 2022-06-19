import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { t, Trans } from '@lingui/macro'
import StaffSearchCategories from './StaffSearchCategories/StaffSearchCategories'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface SearchProps {
  title: string
}

const RootStaffSearchCategories: PageProps<{}> = () => {
  const {
    searchArguments,
    register,
    loadQuery
  } = useSearch<SearchProps>({})

  const { i18n } = useLingui()

  return (
    <>
      <Head>
        <title>
          Search Categories - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Categories
            </Trans>
          </PageSectionTitle>
          <SearchInput
            {...register('title', 'change')}
            placeholder={i18n._(t`Search for a category`)}
          />
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffSearchCategories
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffSearchCategories
