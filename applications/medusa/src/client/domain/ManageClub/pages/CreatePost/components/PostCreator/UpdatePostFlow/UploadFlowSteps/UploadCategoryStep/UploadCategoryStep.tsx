import { Suspense, useContext } from 'react'
import {
  FlowBuilderScrollableContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { useFragment } from 'react-relay'
import type { UploadCategoryStepFragment$key } from '@//:artifacts/UploadCategoryStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { Stack } from '@chakra-ui/react'
import SearchInput
  from '../../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SkeletonRectangleGrid
  from '../../../../../../../../../../modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import UploadSearchCategoriesMultiSelector
  from './UploadSearchCategoriesMultiSelector/UploadSearchCategoriesMultiSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'

interface Props {
  query: UploadCategoryStepFragment$key
}

interface SearchProps {
  title: string
}

interface ChoiceProps {
  title: string
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

  const dispatch = useContext(DispatchContext)

  const { i18n } = useLingui()

  const currentCategories = data?.categories.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
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
    defaultValue: currentCategories ?? {},
    onChange: (props) => dispatch({
      type: 'categories',
      value: props
    })
  })

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
        {...registerSearch('title')}
        placeholder={i18n._(t`Search for a category`)}
      />
      <ChoiceRemovableTags
        titleKey='title'
        values={values}
        removeValue={removeValue}
      />
      <FlowBuilderScrollableContainer>
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<SkeletonRectangleGrid />}>
            <UploadSearchCategoriesMultiSelector
              searchArguments={searchArguments}
              register={register}
            />
          </Suspense>
        </QueryErrorBoundary>
      </FlowBuilderScrollableContainer>
    </Stack>
  )
}
