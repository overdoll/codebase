import { Grid, GridItem, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostPreviewCategoriesFragment$data,
  PostPreviewCategoriesFragment$key
} from '@//:artifacts/PostPreviewCategoriesFragment.graphql'
import { useLimiter } from '@//:modules/content/HookedComponents/Limiter'
import { DeepWritable } from 'ts-essentials'
import PreviewCategory
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCategory/PreviewCategory'
import CategoryLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/CategoryLinkTile/CategoryLinkTile'
import { useUpdateEffect } from 'usehooks-ts'
import { CATEGORY_LIMIT } from '../TagsPublicPost'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

interface Props {
  postQuery: PostPreviewCategoriesFragment$key
  isExpanded: boolean
}

const Fragment = graphql`
  fragment PostPreviewCategoriesFragment on Post {
    categories {
      id
      ...PreviewCategoryFragment
      ...CategoryLinkTileFragment
    }
  }
`

export default function PostPreviewCategories (props: Props): JSX.Element {
  const {
    postQuery,
    isExpanded
  } = props

  const data = useFragment(Fragment, postQuery)

  const {
    constructedData,
    onExpand
  } = useLimiter<DeepWritable<PostPreviewCategoriesFragment$data['categories']>>({
    data: data.categories as DeepWritable<PostPreviewCategoriesFragment$data['categories']> ?? [],
    amount: CATEGORY_LIMIT
  })

  const firstDataSet = constructedData.slice(0, 5) as DeepWritable<PostPreviewCategoriesFragment$data['categories']>
  const firstDataSetColumns = ['minmax(70px, 300px)', 'minmax(70px, 300px)', 'minmax(70px, 300px)', 'minmax(50px, 190px)', 'minmax(50px, 190px)']
  const secondDataSet = constructedData.slice(5, CATEGORY_LIMIT) as DeepWritable<PostPreviewCategoriesFragment$data['categories']>
  const lastDataSet = constructedData.slice(CATEGORY_LIMIT) as DeepWritable<PostPreviewCategoriesFragment$data['categories']>

  useUpdateEffect(() => {
    isExpanded && onExpand()
  }, [isExpanded])

  return (
    <Stack w='100%' spacing={1}>
      <Grid
        w='100%'
        gap={1}
        templateColumns={(firstDataSet.map((item, index) => firstDataSetColumns[index])).join(' ')}
        templateRows='80px'
      >
        {firstDataSet.map((item) =>
          <GridItem key={item.id}>
            <CategoryLinkTile onClick={() => trackFathomEvent('4HWA0TIN', 1)} query={item}>
              <PreviewCategory categoryQuery={item} />
            </CategoryLinkTile>
          </GridItem>
        )}
      </Grid>
      {secondDataSet.length > 0 && (
        <Grid
          w='100%'
          gap={1}
          templateColumns={`repeat(${secondDataSet.length}, minmax(50px, 300px))`}
          templateRows='50px'
        >
          {secondDataSet.map((item) =>
            <GridItem key={item.id}>
              <CategoryLinkTile onClick={() => trackFathomEvent('4HWA0TIN', 1)} query={item}>
                <PreviewCategory categoryQuery={item} />
              </CategoryLinkTile>
            </GridItem>
          )}
        </Grid>
      )}
      {lastDataSet.length > 0 && (
        <Grid
          w='100%'
          gap={1}
          templateColumns={`repeat(${lastDataSet.length > 6 ? 6 : lastDataSet.length}, minmax(50px, 200px))`}
          templateRows={`repeat(${Math.ceil(lastDataSet.length / 6)}, 50px)`}
        >
          {lastDataSet.map((item) =>
            <GridItem key={item.id}>
              <CategoryLinkTile onClick={() => trackFathomEvent('4HWA0TIN', 1)} query={item}>
                <PreviewCategory categoryQuery={item} />
              </CategoryLinkTile>
            </GridItem>
          )}
        </Grid>
      )}
    </Stack>
  )
}
