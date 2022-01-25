import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import { Flex, Stack, Text } from '@chakra-ui/react'
import type { GeneralSearchQuery } from '@//:artifacts/GeneralSearchQuery.graphql'
import { CategoryIdentifier } from '@//:assets/icons/interface'
import { GridWrap, RectangleGridItem, Selector } from '../../../../ContentSelection'
import ItemOverlay from '../../../../ContentSelection/components/ItemOverlay/ItemOverlay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { removeNode } from '@//:modules/support'
import type { SearchCategoriesSelectorFragment$key } from '@//:artifacts/SearchCategoriesSelectorFragment.graphql'
import { Trans } from '@lingui/macro'
import LoadMoreRectangle from '../../../../ContentSelection/components/LoadMoreRectangle/LoadMoreRectangle'
import { Icon } from '@//:modules/content'
import { useEffect } from 'react'

interface Props {
  selected: string[]
  onSelect: (category: any) => void
  query: SearchCategoriesSelectorFragment$key
  showEmptyPlaceholder?: boolean
  onDataChange?: (data) => void
}

const Fragment = graphql`
  fragment SearchCategoriesSelectorFragment on Query
  @argumentDefinitions(
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "SearchCategoriesSelectorPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $search
    ) @connection(key: "SearchCategoriesSelector_categories")
    {
      edges {
        node {
          id
          title
          slug
          thumbnail {
            ...ResourceItemFragment
          }
        }
      }
    }
  }
`

export default function SearchCategoriesSelector ({
  onSelect,
  selected,
  query,
  showEmptyPlaceholder = true,
  onDataChange
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<GeneralSearchQuery, any>(
    Fragment,
    query
  )
  const categories = removeNode(data.categories.edges)

  const onChangeSelection = (id): void => {
    const category = categories.filter((item) => item.id === id)[0]
    onSelect(category)
  }

  useEffect(() => {
    onDataChange?.(data)
  }, [data])

  if (categories.length < 1 && !showEmptyPlaceholder) {
    return <></>
  }

  // If no categories were found, show empty placeholder
  if (categories.length < 1 && showEmptyPlaceholder) {
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
          <RectangleGridItem key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <ItemOverlay background={<ResourceItem
                query={item.thumbnail}
                                       />}
              >
                <Stack spacing={1}>
                  <Icon w={4} h={4} icon={CategoryIdentifier} fill='gray.00' />
                  <Text
                    fontSize='lg'
                    color='gray.00'
                    textAlign='center'
                  >
                    {item.title}
                  </Text>
                </Stack>
              </ItemOverlay>
            </Selector>
          </RectangleGridItem>
        )
        )}
        <LoadMoreRectangle
          text={<Trans>Load More Categories</Trans>}
          hasNext={hasNext && categories.length > 0}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
