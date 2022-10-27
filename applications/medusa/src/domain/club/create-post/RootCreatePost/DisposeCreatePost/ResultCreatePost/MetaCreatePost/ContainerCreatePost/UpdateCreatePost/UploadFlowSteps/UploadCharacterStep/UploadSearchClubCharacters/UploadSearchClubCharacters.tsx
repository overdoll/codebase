import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { Stack } from '@chakra-ui/react'
import SearchInput
  from '../../../../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { t } from '@lingui/macro'
import QueryErrorBoundary
  from '../../../../../../../../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonUploadCharacterGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadCharacterGrid/SkeletonUploadCharacterGrid'
import { graphql, useFragment } from 'react-relay/hooks'
import { UploadSearchClubCharactersFragment$key } from '@//:artifacts/UploadSearchClubCharactersFragment.graphql'
import UploadSearchOriginalCharactersMultiSelector
  from './UploadSearchOriginalCharactersMultiSelector/UploadSearchOriginalCharactersMultiSelector'

export interface UploadCharacterSearchProps {
  name: string | null
  slug: string
}

const Fragment = graphql`
  fragment UploadSearchClubCharactersFragment on Post {
    club {
      slug
    }
  }
`

interface Props extends ComponentChoiceArguments<any> {
  query: UploadSearchClubCharactersFragment$key
}

export default function UploadSearchClubCharacters (props: Props): JSX.Element {
  const {
    register,
    query
  } = props

  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const {
    searchArguments,
    loadQuery,
    register: registerSearch
  } = useSearch<UploadCharacterSearchProps>({
    defaultValue: {
      slug: data.club.slug,
      name: null
    }
  })

  return (
    <Stack spacing={2}>
      <SearchInput
        nullifyOnClear
        {...registerSearch('name', 'change')}
        placeholder={i18n._(t`Search for an original character by name`)}
      />
      <QueryErrorBoundary
        loadQuery={loadQuery}
      >
        <Suspense fallback={<SkeletonUploadCharacterGrid />}>
          <UploadSearchOriginalCharactersMultiSelector
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
