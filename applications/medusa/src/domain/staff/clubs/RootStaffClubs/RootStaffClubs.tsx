import { PageProps } from '@//:types/app'
import { ContentContainer, PageContainer } from '@//:modules/content/PageLayout'
import { t } from '@lingui/macro'
import SearchInput from '../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useLingui } from '@lingui/react'
import DisposeStaffClubs from './DisposeStaffClubs/DisposeStaffClubs'

interface SearchProps {
  name: string
}

const RootStaffClubs: PageProps<{}> = (): JSX.Element => {
  const {
    searchArguments,
    register,
    loadQuery
  } = useSearch<SearchProps>({})

  const { i18n } = useLingui()

  return (
    <PageContainer>
      <ContentContainer pt={2}>
        <SearchInput
          nullifyOnClear
          {...register('name', 'change')}
          placeholder={i18n._(t`Search for a club`)}
        />
      </ContentContainer>
      <DisposeStaffClubs loadQuery={loadQuery} searchArguments={searchArguments} />
    </PageContainer>
  )
}

export default RootStaffClubs
