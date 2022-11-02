import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import SearchInput
  from '../../../../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import QueryErrorBoundary
  from '../../../../../../../../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonUploadCharacterGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadCharacterGrid/SkeletonUploadCharacterGrid'
import UploadSearchSeriesCharactersMultiSelector
  from './UploadSearchSeriesCharactersMultiSelector/UploadSearchSeriesCharactersMultiSelector'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'

export interface UploadCharacterSearchProps {
  name: string | null
}

interface Props extends ComponentChoiceArguments<any> {

}

export default function UploadSearchSeriesCharacters (props: Props): JSX.Element {
  const { register } = props

  const { i18n } = useLingui()

  const {
    searchArguments,
    loadQuery,
    register: registerSearch
  } = useSearch<UploadCharacterSearchProps>({
    defaultValue: {
      name: null
    }
  })

  return (
    <Stack spacing={2}>
      <SearchInput
        nullifyOnClear
        {...registerSearch('name', 'change')}
        placeholder={i18n._(t`Search for a series character by name`)}
      />
      <QueryErrorBoundary
        loadQuery={loadQuery}
      >
        <Suspense fallback={<SkeletonUploadCharacterGrid />}>
          <UploadSearchSeriesCharactersMultiSelector
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
