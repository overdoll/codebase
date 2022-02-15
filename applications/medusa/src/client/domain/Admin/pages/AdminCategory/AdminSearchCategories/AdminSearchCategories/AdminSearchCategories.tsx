import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchCategoriesQuery } from '@//:artifacts/AdminSearchCategoriesQuery.graphql'
import { removeNode } from '@//:modules/support'
import { Flex, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import {
  UploadSearchCategoriesMultiSelectorQuery
} from '@//:artifacts/UploadSearchCategoriesMultiSelectorQuery.graphql'
import { QueryArguments } from '@//:types/hooks'

interface Props {
  queryArgs: QueryArguments
}

const Query = graphql`
  query AdminSearchCategoriesQuery($title: String) {
    ...AdminSearchCategoriesFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchCategoriesPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "AdminCategoriesConnection_categories")
    {
      edges {
        node {
          slug
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`
export default function AdminSearchCategories ({ queryArgs }: Props): JSX.Element {
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
  } = usePaginationFragment<AdminSearchCategoriesQuery, any>(
    Fragment,
    queryData
  )
  const categories = removeNode(data.categories.edges)

  if (categories.length < 1) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          <Trans>
            No categories were found
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
            <LinkTile to={`/admin/category/search/${item.slug as string}`}>
              <CategoryTileOverlay query={item} />
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
    </>
  )
}
