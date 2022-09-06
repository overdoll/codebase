import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchCategoriesQuery } from '@//:artifacts/StaffSearchCategoriesQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { EmptyBoundary, EmptyCategories } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Badge, Box, Flex } from '@chakra-ui/react'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchCategoriesQuery($title: String) {
    ...StaffSearchCategoriesFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchCategoriesPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "StaffCategoriesConnection_categories")
    {
      edges {
        node {
          id
          slug
          topic {
            title
          }
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`
export default function StaffSearchCategories ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchCategoriesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchCategoriesQuery, any>(
    Fragment,
    queryData
  )
  const categories = removeNode(data.categories.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyCategories hint={searchArguments.variables.title} />}
      condition={categories.length < 1}
    >
      <GridWrap>
        {categories.map((item) => (
          <GridTile key={item.node.id}>
            <LinkTile href={{
              pathname: '/staff/entity/category/[slug]',
              query: { slug: item.slug }
            }}
            >
              <Flex w='100%' h='100%' position='relative'>
                <CategoryTileOverlay query={item} />
                <Box p={2} right={0} bottom={0} position='absolute'>
                  {item?.topic?.title != null && (
                    <Badge colorScheme='gray' fontFamily='mono' fontSize='sm'>
                      {item.topic.title}
                    </Badge>
                  )}
                </Box>
              </Flex>
            </LinkTile>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
