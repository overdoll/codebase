import { Suspense, useContext, useEffect, useState } from 'react'
import {
  FlowBuilderScrollableContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { useFragment } from 'react-relay'
import type { UploadCategoryStepFragment$key } from '@//:artifacts/UploadCategoryStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { Stack, Wrap, WrapItem } from '@chakra-ui/react'
import SearchInput from '../../../../../../../../../components/SearchInput/SearchInput'
import { t, Trans } from '@lingui/macro'
import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'
import { useLingui } from '@lingui/react'
import { useSearchQueryArguments } from '@//:modules/hooks'
import SkeletonRectangleGrid
  from '../../../../../../../../../../modules/content/Placeholder/Skeleton/SkeletonRectangleGrid/SkeletonRectangleGrid'
import UploadSearchCategoriesMultiSelector
  from './UploadSearchCategoriesMultiSelector/UploadSearchCategoriesMultiSelector'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { useMultiSelector } from '@//:modules/content/ContentSelection'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'

interface Props {
  query: UploadCategoryStepFragment$key
}

const CategoryFragmentGQL = graphql`
  fragment UploadCategoryStepFragment on Post {
    categories {
      id
      title
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

export default function UploadCategoryStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(CategoryFragmentGQL, query)

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ title: null })

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  const dispatch = useContext(DispatchContext)

  const currentCategories = data?.categories.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
    }
  }), {})

  const [currentSelection, changeSelection, removeSelection] = useMultiSelector(
    {
      defaultValue: currentCategories ?? {}
    }
  )

  useEffect(() => {
    dispatch({
      type: 'categories',
      value: currentSelection
    })
  }, [currentSelection])

  useEffect(() => {
    setQueryArgs({ title: search })
  }, [search])

  return (
    <Stack spacing={2}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Add some categories
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Select the categories that would be most applicable to the content you have uploaded.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput
        onChange={setSearch}
        placeholder={i18n._(t`Search for a category`)}
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
      <FlowBuilderScrollableContainer>
        <QueryErrorBoundary loadQuery={() => setQueryArgs({ title: null })}>
          <Suspense fallback={<SkeletonRectangleGrid />}>
            <UploadSearchCategoriesMultiSelector
              selected={currentSelection}
              onSelect={changeSelection}
              queryArgs={queryArgs}
            />
          </Suspense>
        </QueryErrorBoundary>
      </FlowBuilderScrollableContainer>
    </Stack>
  )
}
