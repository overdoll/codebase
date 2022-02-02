import { usePaginationFragment } from 'react-relay'
import { QueryArguments } from '@//:types/hooks'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Flex, Text } from '@chakra-ui/react'
import {
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  SingleSelector
} from '../../../../../../../../../../../../modules/content/ContentSelection'
import { removeNode } from '@//:modules/support'
import type { SearchCategoriesQuery } from '@//:artifacts/SearchCategoriesQuery.graphql'
import { Trans } from '@lingui/macro'
import CategoryTileOverlay
  from '../../../../../../../../../../../../modules/content/ContentSelection/components/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'

interface Props {
  selected: string[]
  onSelect: (category: any) => void
  queryArgs: QueryArguments
}

const SearchCategoriesQueryGQL = graphql`
  query SearchCategoriesQuery($title: String) {
    ...SearchCategoriesFragment @arguments(title: $title)
  }
`

const SearchCategoriesFragmentGQL = graphql`
  fragment SearchCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "SearchCategoriesPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "SearchCategories_categories")
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

export default function SearchCategories ({
  onSelect,
  selected,
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SearchCategoriesQuery>(
    SearchCategoriesQueryGQL,
    queryArgs.variables,
    queryArgs.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SearchCategoriesQuery, any>(
    SearchCategoriesFragmentGQL,
    queryData
  )
  const categories = removeNode(data.categories.edges)

  const onChangeSelection = (id): void => {
    const category = categories.filter((item) => item.id === id)[0]
    onSelect(category)
  }

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
            <SingleSelector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <CategoryTileOverlay query={item} />
            </SingleSelector>
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
