/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { CharacterFragment$key } from '@//:artifacts/CharacterFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { EVENTS } from '../../../../../constants/constants'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import SearchInput from '../../../SearchInput/SearchInput'
import { Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import RootSearchCharacters from './RootSearchCharacters/RootSearchCharacters'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: CharacterFragment$key,
}

const CharacterFragmentGQL = graphql`
  fragment CharacterFragment on Query {
    post (reference: $reference) {
      characters {
        id
        name
        series {
          title
        }
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
`

export default function Category ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(CharacterFragmentGQL, query)

  const [t] = useTranslation('manage')

  const currentCharacters = data.post.characters.map((item) => item.id)

  const [selected, setSelected] = useState(currentCharacters)

  const setCurrentSelection = (character) => {
    if (selected.includes(character.id)) {
      setSelected(selected.filter((item) => item !== character.id))
      dispatch({ type: EVENTS.CHARACTERS, value: character, remove: true })
      return
    }
    setSelected((array) => [...array, character.id])
    dispatch({ type: EVENTS.CHARACTERS, value: character })
  }

  const removeSelection = (id) => {
    setSelected(selected.filter((item) => item !== id))
    dispatch({ type: EVENTS.CHARACTERS, value: { id: id }, remove: true })
  }

  // Initially add current characters to state on load
  useEffect(() => {
    data.post.characters.forEach((item) => {
      dispatch({ type: EVENTS.CHARACTERS, value: item })
    })
  }, [])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('posts.flow.steps.character.selector.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('posts.flow.steps.character.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput placeholder={t('posts.flow.steps.character.selector.search.placeholder')}>
        {({ searchInput }) =>
          <>
            <Wrap>
              {Object.values(state.characters).map((item, index) =>
                <WrapItem key={index}>
                  <Tag borderRadius='full' size='lg'>
                    <TagLabel>{item.name}</TagLabel>
                    <TagCloseButton
                      color='gray.00' opacity={1} bg='orange.400'
                      onClick={() => removeSelection(item.id)}
                    />
                  </Tag>
                </WrapItem>
              )}
            </Wrap>
            <RootSearchCharacters
              search={searchInput}
              selected={selected}
              onSelect={setCurrentSelection}
            />
          </>}
      </SearchInput>
    </>
  )
}
