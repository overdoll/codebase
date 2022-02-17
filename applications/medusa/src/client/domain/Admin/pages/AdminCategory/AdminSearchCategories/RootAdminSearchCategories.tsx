import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense, useEffect, useState } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { t, Trans } from '@lingui/macro'
import AdminSearchCategories from './AdminSearchCategories/AdminSearchCategories'
import { useSearchQueryArguments } from '@//:modules/hooks'
import SearchInput from '../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'

export default function RootAdminSearchCategories (): JSX.Element {
  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ title: null })

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  useEffect(() => {
    setQueryArgs({ title: search })
  }, [search])

  return (
    <>
      <Helmet title='search categories' />
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Categories
            </Trans>
          </PageSectionTitle>
          <SearchInput
            onChange={setSearch}
            placeholder={i18n._(t`Search for a category`)}
          />
          <QueryErrorBoundary loadQuery={() => setQueryArgs({ title: null })}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminSearchCategories
                queryArgs={queryArgs}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
