/**
 * @flow
 */
import type { Node } from 'react'
import { usePaginationFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { SearchCategoriesFragment } from '@//:artifacts/SearchCategoriesFragment.graphql'

import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Flex, Text } from '@chakra-ui/react'
import {
  GridWrap,
  Selector,
  SelectorTextOverlay,
  SmallGridItem
} from '../../../../../../../../../../../components/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { removeNode } from '@//:modules/utilities/functions'
import type SearchCategoriesQuery from '@//:artifacts/SearchCategoriesQuery.graphql'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  selected: Array<string>,
  onSelect: () => void,
  queryArgs: () => void,
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
    }
  }
`

export default function SearchCategories ({ onSelect, selected, queryArgs }: Props): Node {
  const queryData = useLazyLoadQuery < SearchCategoriesQuery > (
    SearchCategoriesQueryGQL,
    queryArgs.variables,
    queryArgs.options
  )

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment < SearchCategoriesFragment > (
    SearchCategoriesFragmentGQL,
    queryData
  )

  const [t] = useTranslation('manage')

  const categories = removeNode(data.categories.edges)

  const onChangeSelection = (id) => {
    const category = categories.filter((item) => item.id === id)[0]
    onSelect(category)
  }

  // If no categories were found, show empty placeholder
  if (categories.length < 1) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          {t('create_post.flow.steps.category.selector.search.empty', { word: queryArgs.variables.title })}
        </Text>
      </Flex>
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {categories.map((item, index) => (
          <SmallGridItem key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <SelectorTextOverlay label={item.title}>
                <ResourceItem
                  type={item.thumbnail.type}
                  urls={item.thumbnail.urls}
                />
              </SelectorTextOverlay>
            </Selector>
          </SmallGridItem>
        )
        )}
        {hasNext &&
          <SmallGridItem h='inherit'>
            <ClickableBox
              h='100%'
              w='100%'
              align='center'
              justify='center'
              onClick={() => loadNext(5)}
              isLoading={isLoadingNext}
              whiteSpace='normal'
            >
              <Text textAlign='center' color='gray.00'>
                {t('create_post.flow.steps.category.selector.search.load')}
              </Text>
            </ClickableBox>
          </SmallGridItem>}
      </GridWrap>
    </>
  )
}
