import { graphql, useFragment } from 'react-relay/hooks'
import { Box, Stack } from '@chakra-ui/react'
import { Suspense, useContext, useEffect, useState } from 'react'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import SkeletonStack from '../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import type { CategoriesCurationStepFragment$key } from '@//:artifacts/CategoriesCurationStepFragment.graphql'

import { useMultiSelector } from '@//:modules/content/ContentSelection'
import CategoryMultiSelector from './CategoryMultiSelector/CategoryMultiSelector'
import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'
import HStackScroll
  from '../../../../../../../../../modules/content/PageLayout/BuildingBlocks/HStackScroll/HStackScroll'
import SearchInput from '../../../../../../../../components/SearchInput/SearchInput'
import { useSearchQueryArguments } from '@//:modules/hooks'
import { useLingui } from '@lingui/react'

interface Props {
  query: CategoriesCurationStepFragment$key | null
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

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ title: null })

  const [search, setSearch] = useState<string>('')

  const dispatch = useContext(DispatchContext)

  const { i18n } = useLingui()

  const currentCategories = data?.category?.categories.reduce((accum, value) => ({
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
    setQueryArgs({ title: search })
  }, [search])

  useEffect(() => {
    dispatch({
      type: 'category',
      value: currentSelection
    })
  }, [currentSelection])

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
        <HStackScroll>
          {Object.keys(currentSelection).map((item, index) =>
            <RemovableTag
              key={index}
              onRemove={removeSelection}
              id={item}
              title={currentSelection[item].name}
            />
          )}
        </HStackScroll>
        <SearchInput
          onChange={setSearch}
          placeholder={i18n._(t`Search for a category`)}
        />
        <Box maxH='60vh' overflowY='auto'>
          <QueryErrorBoundary loadQuery={() => {
          }}
          >
            <Suspense fallback={<SkeletonStack />}>
              <CategoryMultiSelector
                queryArgs={queryArgs}
                selected={currentSelection}
                onSelect={changeSelection}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
      </Stack>
    </Box>
  )
}
