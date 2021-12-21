import { useEffect, useState } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { CategoryFragment$key } from '@//:artifacts/CategoryFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { EVENTS } from '../../../../../constants/constants'
import SearchInput from '../../../SearchInput/SearchInput'
import RootSearchCategories from './RootSearchCategories/RootSearchCategories'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: CategoryFragment$key
}

const CategoryFragmentGQL = graphql`
  fragment CategoryFragment on Post {
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
`

export default function Category ({
  uppy,
  state,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(CategoryFragmentGQL, query)

  const [t] = useTranslation('manage')

  const currentCategories = data.categories.map((item) => item.id) as string[]

  const [selected, setSelected] = useState(currentCategories)

  const setCurrentSelection = (category): void => {
    if (selected.includes(category.id)) {
      setSelected(selected.filter((item) => item !== category.id))
      dispatch({
        type: EVENTS.CATEGORIES,
        value: category,
        remove: true
      })
      return
    }
    setSelected((array) => [...array, category.id])
    dispatch({
      type: EVENTS.CATEGORIES,
      value: category
    })
  }

  const removeSelection = (id): void => {
    setSelected(selected.filter((item) => item !== id))
    dispatch({
      type: EVENTS.CATEGORIES,
      value: { id: id },
      remove: true
    })
  }

  // Initially add current categories to state on load
  useEffect(() => {
    data.categories.forEach((item) => {
      dispatch({
        type: EVENTS.CATEGORIES,
        value: item
      })
    })
  }, [])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('create_post.flow.steps.category.selector.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('create_post.flow.steps.category.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput placeholder={t('create_post.flow.steps.category.selector.search.placeholder')}>
        {({ searchInput }) =>
          <>
            <Wrap>
              {Object.values(state.categories).map((item, index) =>
                <WrapItem key={index}>
                  <Tag borderRadius='full' size='lg'>
                    <TagLabel>{item.title}</TagLabel>
                    <TagCloseButton
                      color='gray.00'
                      opacity={1}
                      bg='orange.400'
                      onClick={() => removeSelection(item.id)}
                    />
                  </Tag>
                </WrapItem>
              )}
            </Wrap>
            <RootSearchCategories
              selected={selected}
              onSelect={setCurrentSelection}
              search={searchInput}
            />
          </>}
      </SearchInput>
    </>
  )
}
