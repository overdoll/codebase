import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense, useEffect, useState } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { t, Trans } from '@lingui/macro'
import AdminSearchCharacter from './AdminSearchCharacter/AdminSearchCharacter'
import { useSearchQueryArguments } from '@//:modules/hooks'
import SearchInput from '../../../components/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'

export default function RootAdminSearchCharacter (): JSX.Element {
  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ name: null })

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  useEffect(() => {
    setQueryArgs({ name: search })
  }, [search])

  return (
    <>
      <Helmet title='search character' />
      <PageWrapper>
        <Stack spacing={2}>
          <PageSectionTitle>
            <Trans>
              Search Series
            </Trans>
          </PageSectionTitle>
          <SearchInput
            onChange={setSearch}
            placeholder={i18n._(t`Search for a character`)}
          />
          <QueryErrorBoundary loadQuery={() => setQueryArgs({ name: null })}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminSearchCharacter
                queryArgs={queryArgs}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
