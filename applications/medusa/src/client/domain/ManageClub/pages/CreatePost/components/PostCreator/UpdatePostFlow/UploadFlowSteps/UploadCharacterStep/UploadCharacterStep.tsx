import { Suspense, useContext } from 'react'
import type { UploadCharacterStepFragment$key } from '@//:artifacts/UploadCharacterStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SearchInput
  from '../../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SkeletonRectangleGrid
  from '../../../../../../../../../../modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import SearchCharacters from './UploadSearchCharactersMultiSelector/UploadSearchCharactersMultiSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'

interface Props {
  query: UploadCharacterStepFragment$key
}

interface SearchProps {
  name: string
}

interface ChoiceProps {
  name: string
}

const Fragment = graphql`
  fragment UploadCharacterStepFragment on Post {
    characters {
      id
      name
      series {
        title
      }
      slug
      thumbnail {
        type
        urls {
          mimeType
          url
        }
      }
    }
  }
`

export default function UploadCharacterStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const dispatch = useContext(DispatchContext)

  const currentCharacters = data?.characters.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.name
    }
  }), {})

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
    defaultValue: currentCharacters ?? {},
    onChange: (props) => dispatch({
      type: 'characters',
      value: props
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
            Select the character(s) that are the primary focus in your content.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput
        {...registerSearch('name')}
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
        <Suspense fallback={<SkeletonRectangleGrid />}>
          <SearchCharacters
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
