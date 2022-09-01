import { Suspense } from 'react'
import { Icon, PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { HStack, Stack } from '@chakra-ui/react'
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
import { CharacterIdentifier } from '@//:assets/icons'

export interface UploadCharacterSearchProps {
  name: string | null
  clubCharacters?: boolean
}

interface ChoiceProps {
  name: string
}

export default function UploadCharacterStep (): JSX.Element {
  const { i18n } = useLingui()

  const {
    state,
    dispatch
  } = useSequenceContext()

  const {
    searchArguments,
    loadQuery,
    register: registerSearch
  } = useSearch<UploadCharacterSearchProps>({
    defaultValue: {
      clubCharacters: false,
      name: null
    }
  })

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
      <HStack spacing={2}>
        <SearchInput
          nullifyOnClear
          {...registerSearch('name', 'change')}
          placeholder={i18n._(t`Search for a character by name`)}
        />
        <SearchBooleanButton
          icon={<Icon
            icon={CharacterIdentifier}
            h={5}
            w={5}
            fill={searchArguments.variables.clubCharacters === true ? 'green.900' : 'gray.300'}
                />}
          aria-label={searchArguments.variables.clubCharacters === true ? i18n._(t`Show all characters`) : i18n._(t`Show only original characters`)}
          colorScheme={searchArguments.variables.clubCharacters === true ? 'green' : 'gray'}
          {...registerSearch('clubCharacters', 'change')}
        />
      </HStack>
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
