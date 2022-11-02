import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import SearchInput
  from '../../../../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import QueryErrorBoundary
  from '../../../../../../../../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense, useContext, useEffect } from 'react'
import SkeletonUploadCharacterGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadCharacterGrid/SkeletonUploadCharacterGrid'
import UploadSearchOtherCharactersMultiSelector
  from './UploadSearchOtherCharactersMultiSelector/UploadSearchOtherCharactersMultiSelector'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { useUpdateEffect } from 'usehooks-ts'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'

export interface UploadCharacterSearchProps {
  name: string | null
}

interface Props extends ComponentChoiceArguments<any> {

}

export default function UploadSearchOtherCharacters (props: Props): JSX.Element {
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
        placeholder={i18n._(t`Search for any character by name`)}
      />
      <QueryErrorBoundary
        loadQuery={loadQuery}
      >
        <Suspense fallback={<SkeletonUploadCharacterGrid />}>
          <UploadSearchOtherCharactersMultiSelector
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
