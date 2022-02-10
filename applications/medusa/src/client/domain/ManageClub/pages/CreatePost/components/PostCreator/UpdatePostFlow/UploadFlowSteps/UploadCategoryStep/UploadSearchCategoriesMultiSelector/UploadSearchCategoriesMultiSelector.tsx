import { usePaginationFragment } from 'react-relay'
import { QueryArguments } from '@//:types/hooks'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Flex, Text } from '@chakra-ui/react'
import {
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  MultiSelectedValue,
  MultiSelectedValueFunction,
  MultiSelector
} from '@//:modules/content/ContentSelection'
import { removeNode } from '@//:modules/support'
import type {
  UploadSearchCategoriesMultiSelectorQuery
} from '@//:artifacts/UploadSearchCategoriesMultiSelectorQuery.graphql'
import { Trans } from '@lingui/macro'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'

interface Props {
  selected: MultiSelectedValue
  onSelect: MultiSelectedValueFunction
  queryArgs: QueryArguments
}

const Query = graphql`
  query UploadSearchCategoriesMultiSelectorQuery($title: String) {
    ...UploadSearchCategoriesMultiSelectorFragment @arguments(title: $title)
  }
`

const Fragment = graphql`
  fragment UploadSearchCategoriesMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "UploadSearchCategoriesMultiSelectorPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "UploadSearchCategoriesMultiSelector_categories")
    {
      edges {
        node {
          id
          title
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`

export default function UploadSearchCategoriesMultiSelector ({
  onSelect,
  selected,
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadSearchCategoriesMultiSelectorQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchCategoriesMultiSelectorQuery, any>(
    Fragment,
    queryData
  )
  const categories = removeNode(data.categories.edges)

  // If no categories were found, show empty placeholder
  if (categories.length < 1) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          <Trans>
            No categories were found with the title {queryArgs.variables.title}
          </Trans>
        </Text>
      </Flex>
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {categories.map((item, index) => (
          <GridTile key={index}>
            <MultiSelector
              id={item.id}
              selected={selected}
              name={item.title}
              onSelect={onSelect}
            >
              <CategoryTileOverlay query={item} />
            </MultiSelector>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
