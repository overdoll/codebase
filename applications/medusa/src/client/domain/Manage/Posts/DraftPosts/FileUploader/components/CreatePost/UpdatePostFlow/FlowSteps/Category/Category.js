/**
 * @flow
 */
import type { Node } from 'react'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '../../../../../../../../../../components/PageLayout'
import { useCallback, useEffect, useState } from 'react'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { CategoryFragment$key } from '@//:artifacts/CategoryFragment.graphql'
import type { CategoryTagFragment$key } from '@//:artifacts/CategoryTagFragment.graphql'
import { graphql } from 'react-relay/hooks'
import {
  Input,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  InputLeftElement,
  InputRightElement, IconButton, InputGroup
} from '@chakra-ui/react'
import {
  GridItem,
  GridWrap,
  Selector,
  SelectorTextOverlay, useSingleSelector, useMultiSelector
} from '../../../../../../../../../../components/ContentSelection'
import ResourceItem from '../../../../../../../../../../components/DataDisplay/ResourceItem/ResourceItem'
import { EVENTS, STEPS } from '../../../../../constants/constants'
import { removeNode } from '@//:modules/utilities/functions'
import Icon from '@//:modules/content/Icon/Icon'
import SearchCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/search/search-circle.svg'
import InterfaceDelete1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-1.svg'
import SearchCategories from './SearchCategories/SearchCategories'
import SearchInput from '../../../SearchInput/SearchInput'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: CategoryFragment$key,
}

const CategoryFragmentGQL = graphql`
  fragment CategoryFragment on Query {
    post (reference: $reference) {
      categories {
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
    ...SearchCategoriesFragment
  }
`

export default function Category ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(CategoryFragmentGQL, query)

  const [t] = useTranslation('manage')

  const currentCategories = data.post.categories.map((item) => item.id)

  const [search, setSearch] = useState('')

  const [selected, setSelected] = useState(currentCategories)

  const setCurrentSelection = (category) => {
    if (selected.includes(category.id)) {
      setSelected(selected.filter((item) => item !== category.id))
      dispatch({ type: EVENTS.CATEGORIES, value: category, remove: true })
      return
    }
    setSelected((array) => [...array, category.id])
    dispatch({ type: EVENTS.CATEGORIES, value: category })
  }

  const removeSelection = (id) => {
    setSelected(selected.filter((item) => item !== id))
    dispatch({ type: EVENTS.CATEGORIES, value: { id: id }, remove: true })
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          {t('posts.flow.steps.category.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput onChange={setSearch} />
      <Wrap>
        {Object.values(state.categories).map((item, index) =>
          <WrapItem key={index}>
            <Tag borderRadius='full' size='lg'>
              <TagLabel>{item.title}</TagLabel>
              <TagCloseButton color='gray.00' opacity={1} bg='orange.400' onClick={() => removeSelection(item.id)} />
            </Tag>
          </WrapItem>
        )}
      </Wrap>
      <SearchCategories
        query={data}
        selected={selected}
        onSelect={setCurrentSelection}
        search={search}
      />
    </>
  )
}
