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
import { Input, Flex, Tag, TagLabel, TagCloseButton, Wrap, WrapItem } from '@chakra-ui/react'
import {
  GridItem,
  GridWrap,
  Selector,
  SelectorTextOverlay
} from '../../../../../../../../../../../components/ContentSelection'
import ResourceItem from '../../../../../../../../../../../components/DataDisplay/ResourceItem/ResourceItem'
import { removeNode } from '@//:modules/utilities/functions'
import { EVENTS } from '../../../../../../constants/constants'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import type SearchCategoriesQuery from '@//:artifacts/SearchCategoriesQuery.graphql'

type Props = {
  query: SearchCategoriesFragment$key,
  search?: string,
  selected: Array<string>,
  onSelect: () => void
}

const SearchCategoriesQueryGQL = graphql`
  query SearchCategoriesQuery($first: Int, $after: String, $title: String) {
    ...SearchCategoriesFragment @arguments(first: $first, after: $after, title: $title)
  }
`

const SearchCategoriesFragmentGQL = graphql`
  fragment SearchCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int}
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

export default function SearchCategories ({ query, search, onSelect, selected }: Props): Node {
  const queryData = useLazyLoadQuery<SearchCategoriesQuery>(
    SearchCategoriesQueryGQL,
    {}
  )

  const { data, refetch } = usePaginationFragment<SearchCategoriesFragment>(
    SearchCategoriesFragmentGQL,
    queryData
  )

  const categories = removeNode(data.categories.edges)

  const refetchQuery = useCallback(search => {
    refetch(
      {
        variables: { search: search },
        options: {
          onComplete () {
            console.log('refetched')
          }
        }
      })
  }, [])

  useEffect(() => {
    refetchQuery(search)
  }, [search])

  const onChangeSelection = (id) => {
    const category = categories.filter((item) => item.id === id)[0]
    onSelect(category)
  }

  return (
    <Suspense fallback={<SkeletonStack />}>
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <ErrorFallback error={error} reset={reset} refetch={refetch} />
        )}
      >
        <GridWrap>
          {categories.map((item, index) => (
            <GridItem key={index}>
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
            </GridItem>
          )
          )}
        </GridWrap>
      </ErrorBoundary>
    </Suspense>
  )
}
