import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { t, Trans } from '@lingui/macro'
import StaffSearchSeries from './StaffSearchSeries/StaffSearchSeries'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import Head from 'next/head'

interface SearchProps {
  title: string
}

export default function RootStaffSearchSeries (): JSX.Element {
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
          Search Series - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Series
            </Trans>
          </PageSectionTitle>
          <SearchInput
            {...register('title', 'change')}
            placeholder={i18n._(t`Search for a series`)}
          />
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffSearchSeries
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
