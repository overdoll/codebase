import { Suspense, useContext, useEffect, useState } from 'react'
import type { UploadCharacterStepFragment$key } from '@//:artifacts/UploadCharacterStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SearchInput from '../../../SearchInput/SearchInput'
import { Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'
import { useLingui } from '@lingui/react'
import SkeletonRectangleGrid
  from '../../../../../../../../../../modules/content/Placeholder/Skeleton/SkeletonRectangleGrid/SkeletonRectangleGrid'
import SearchCharacters from './UploadSearchCharactersMultiSelector/UploadSearchCharactersMultiSelector'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { useSearchQueryArguments } from '@//:modules/hooks'
import { useMultiSelector } from '@//:modules/content/ContentSelection'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'

interface Props {
  query: UploadCharacterStepFragment$key
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

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ name: null })

  const [search, setSearch] = useState<string>('')

  const currentCharacters = data?.characters.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.name
    }
  }), {})

  const [currentSelection, changeSelection, removeSelection] = useMultiSelector(
    {
      defaultValue: currentCharacters ?? {}
    }
  )

  useEffect(() => {
    dispatch({
      type: 'characters',
      value: currentSelection
    })
  }, [currentSelection])

  useEffect(() => {
    setQueryArgs({ name: search })
  }, [search])

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
        onChange={setSearch}
        placeholder={i18n._(t`Search for a character by name`)}
      />
      <Wrap>
        {Object.keys(currentSelection).map((item, index) =>
          <WrapItem key={index}>
            <RemovableTag
              onRemove={removeSelection}
              id={item}
              title={currentSelection[item].name}
            />
          </WrapItem>
        )}
      </Wrap>
      <QueryErrorBoundary
        loadQuery={() => setQueryArgs({ name: null })}
      >
        <Suspense fallback={<SkeletonRectangleGrid />}>
          <SearchCharacters
            selected={currentSelection}
            onSelect={changeSelection}
            queryArgs={queryArgs}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
