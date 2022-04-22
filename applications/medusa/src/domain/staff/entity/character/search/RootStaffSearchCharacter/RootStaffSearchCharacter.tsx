import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { t, Trans } from '@lingui/macro'
import StaffSearchCharacter from './StaffSearchCharacter/StaffSearchCharacter'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface SearchProps {
  name: string
}

const RootStaffSearchCharacter: PageProps<{}> = () => {
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
          Search Characters - Staff :: overdoll.com
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
            {...register('name', 'change')}
            placeholder={i18n._(t`Search for a character`)}
          />
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffSearchCharacter
                searchArguments={searchArguments}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffSearchCharacter
