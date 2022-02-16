import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense, useEffect, useState } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { t, Trans } from '@lingui/macro'
import AdminSearchSeries from './AdminSearchSeries/AdminSearchSeries'
import { useSearchQueryArguments } from '@//:modules/hooks'
import SearchInput from '../../../../../components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'

export default function RootAdminSearchSeries (): JSX.Element {
  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ title: null })

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  useEffect(() => {
    setQueryArgs({ title: search })
  }, [search])

  return (
    <>
      <Helmet title='search series' />
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Series
            </Trans>
          </PageSectionTitle>
          <SearchInput
            onChange={setSearch}
            placeholder={i18n._(t`Search for a series`)}
          />
          <QueryErrorBoundary loadQuery={() => setQueryArgs({ title: null })}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminSearchSeries
                queryArgs={queryArgs}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
