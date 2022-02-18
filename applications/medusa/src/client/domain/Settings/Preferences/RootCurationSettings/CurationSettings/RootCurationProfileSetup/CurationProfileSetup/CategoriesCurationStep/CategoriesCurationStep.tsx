import { graphql, useFragment } from 'react-relay/hooks'
import { Box, Stack } from '@chakra-ui/react'
import { Suspense, useContext } from 'react'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import SkeletonStack from '../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import type { CategoriesCurationStepFragment$key } from '@//:artifacts/CategoriesCurationStepFragment.graphql'
import CategoryMultiSelector from './CategoryMultiSelector/CategoryMultiSelector'
import SearchInput
  from '../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'

interface Props {
  query: CategoriesCurationStepFragment$key | null
}

interface SearchProps {
  title: string
}

interface ChoiceProps {
  title: string
}

const Fragment = graphql`
  fragment CategoriesCurationStepFragment on CurationProfile {
    category {
      categories {
        id
        title
      }
    }
  }
`

export default function CategoriesCurationStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const currentCategories = data?.category?.categories.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
    }
  }), {})

  const dispatch = useContext(DispatchContext)

  const { i18n } = useLingui()

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
    <Box>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            Categories are a quick way to search for content. Select the categories you prefer to see the most. Leaving
            other categories blank will still show posts with those categories to you.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        <ChoiceRemovableTags
          values={values}
          removeValue={removeValue}
          titleKey='title'
        />
        <SearchInput
          {...registerSearch('title')}
          placeholder={i18n._(t`Search for a category`)}
        />
        <Box maxH='60vh' overflowY='auto'>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <CategoryMultiSelector
                searchArguments={searchArguments}
                register={register}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
      </Stack>
    </Box>
  )
}
