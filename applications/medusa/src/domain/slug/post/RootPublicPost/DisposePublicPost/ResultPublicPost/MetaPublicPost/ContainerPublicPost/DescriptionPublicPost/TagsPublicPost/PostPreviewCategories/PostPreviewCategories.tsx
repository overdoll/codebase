import { Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostPreviewCategoriesFragment$data,
  PostPreviewCategoriesFragment$key
} from '@//:artifacts/PostPreviewCategoriesFragment.graphql'
import { useLimiter } from '@//:modules/content/HookedComponents/Limiter'
import { DeepWritable } from 'ts-essentials'
import { Trans } from '@lingui/macro'
import PreviewCategory
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCategory/PreviewCategory'
import CategoryLinkTile from '@//:common/components/CategoryLinkTile/CategoryLinkTile'

interface Props {
  postQuery: PostPreviewCategoriesFragment$key
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
  const { postQuery } = props

  const data = useFragment(Fragment, postQuery)

  const {
    constructedData,
    onExpand,
    hasExpansion,
    hiddenData
  } = useLimiter<DeepWritable<PostPreviewCategoriesFragment$data['categories']>>({
    data: data.categories as DeepWritable<PostPreviewCategoriesFragment$data['categories']> ?? [],
    amount: 7
  })

  return (
    <Stack w='100%' spacing={1}>
      <Grid
        h='100%'
        w='100%'
        gap={1}
        templateColumns={`repeat(${constructedData.length}, minmax(50px, 200px))`}
        templateRows='1fr'
      >
        {constructedData.map((item) =>
          <GridItem key={item.id}>
            <CategoryLinkTile query={item}>
              <PreviewCategory categoryQuery={item} />
            </CategoryLinkTile>
          </GridItem>
        )}
      </Grid>
      {hasExpansion && (
        <Heading cursor='pointer' onClick={onExpand} color='gray.300' fontSize='md'>
          <Trans>
            See {hiddenData.length} more...
          </Trans>
        </Heading>
      )}
    </Stack>
  )
}
