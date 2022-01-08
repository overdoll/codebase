import { useContext, useEffect, useState } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { useFragment } from 'react-relay'
import type { CategoryFragment$key } from '@//:artifacts/CategoryFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { EVENTS } from '../../../../../constants/constants'
import SearchInput from '../../../SearchInput/SearchInput'
import RootSearchCategories from './RootSearchCategories/RootSearchCategories'
import { t, Trans } from '@lingui/macro'
import { DispatchContext, StateContext } from '../../../../../context'

interface Props {
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
  query
}: Props): JSX.Element {
  const data = useFragment(CategoryFragmentGQL, query)

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const currentCategories = data.categories.map((item) => item.id)

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
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Add some categories
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Select the categories that would be most applicable to the content you have uploaded.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput placeholder={t`Search for a category`}>
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
