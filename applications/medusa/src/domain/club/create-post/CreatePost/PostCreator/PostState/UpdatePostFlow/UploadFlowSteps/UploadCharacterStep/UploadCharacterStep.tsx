import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SearchCharacters from './UploadSearchCharactersMultiSelector/UploadSearchCharactersMultiSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import SkeletonUploadCharacterGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadCharacterGrid/SkeletonUploadCharacterGrid'
import SearchBooleanButton
  from '@//:modules/content/HookedComponents/Search/components/SearchBooleanButton/SearchBooleanButton'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadCharacterStepFragment$key } from '@//:artifacts/UploadCharacterStepFragment.graphql'

interface Props {
  query: UploadCharacterStepFragment$key
}

interface SearchProps {
  name: string
  clubCharacters?: boolean
}

interface ChoiceProps {
  name: string
}

const Fragment = graphql`
  fragment UploadCharacterStepFragment on Post {
    club {
      charactersCount
    }
  }
`

export default function UploadCharacterStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const {
    state,
    dispatch
  } = useSequenceContext()

  const {
    searchArguments,
    loadQuery,
    register: registerSearch
  } = useSearch<SearchProps>({})

  const {
    values,
    register,
    removeValue
  } = useChoice<ChoiceProps>({
    defaultValue: state.characters,
    onChange: (props) => dispatch({
      type: 'characters',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <Stack spacing={2}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Who is in your post?
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Select one or more characters that appear in all of the content
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      {data.club.charactersCount > 0 && (
        <SearchBooleanButton nullifyOnClear {...registerSearch('clubCharacters', 'change')}>
          <Trans>
            Show Your Club Characters
          </Trans>
        </SearchBooleanButton>
      )}
      <SearchInput
        nullifyOnClear
        {...registerSearch('name', 'change')}
        placeholder={i18n._(t`Search for a character by name`)}
      />
      <ChoiceRemovableTags
        values={values}
        removeValue={removeValue}
        titleKey='name'
      />
      <QueryErrorBoundary
        loadQuery={loadQuery}
      >
        <Suspense fallback={<SkeletonUploadCharacterGrid />}>
          <SearchCharacters
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
