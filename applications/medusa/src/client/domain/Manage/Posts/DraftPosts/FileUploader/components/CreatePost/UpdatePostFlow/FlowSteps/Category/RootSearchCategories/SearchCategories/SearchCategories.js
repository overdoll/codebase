/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useFragment, usePaginationFragment, useRefetchableFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type {
  SearchCategoriesFragment$key,
  SearchCategoriesFragment
} from '@//:artifacts/SearchCategoriesFragment.graphql'

import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Input, Flex, Tag, TagLabel, TagCloseButton, Wrap, WrapItem, Heading, Text } from '@chakra-ui/react'
import {
  SmallGridItem,
  GridWrap,
  Selector,
  SelectorTextOverlay
} from '../../../../../../../../../../../../components/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { removeNode } from '@//:modules/utilities/functions'
import { EVENTS } from '../../../../../../../constants/constants'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import type SearchCategoriesQuery from '@//:artifacts/SearchCategoriesQuery.graphql'
import Button from '@//:modules/form/Button'

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
  const queryData = useLazyLoadQuery<SearchCategoriesQuery>(
    SearchCategoriesQueryGQL,
    queryArgs.variables,
    queryArgs.options
  )

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<SearchCategoriesFragment>(
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
          {t('posts.flow.steps.category.selector.search.empty', { word: queryArgs.variables.title })}
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
              onSelect={onChangeSelection} selected={selected} id={item.id}
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
            <Button h='100%' w='100%' variant='panel' onClick={() => loadNext(5)} isLoading={isLoadingNext}>
              <Flex
                align='center'
                justify='center'
                whiteSpace='normal'
              >
                <Text color='gray.00'>
                  {t('posts.flow.steps.category.selector.search.load')}
                </Text>
              </Flex>
            </Button>
          </SmallGridItem>}
      </GridWrap>
    </>
  )
}
