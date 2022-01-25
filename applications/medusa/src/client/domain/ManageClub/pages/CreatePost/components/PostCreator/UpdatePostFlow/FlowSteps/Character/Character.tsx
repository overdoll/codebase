import { useContext, useEffect, useState } from 'react'
import type { CharacterFragment$key } from '@//:artifacts/CharacterFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { EVENTS } from '../../../../../constants/constants'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SearchInput from '../../../SearchInput/SearchInput'
import { Wrap, WrapItem } from '@chakra-ui/react'
import RootSearchCharacters from './RootSearchCharacters/RootSearchCharacters'
import { t, Trans } from '@lingui/macro'
import { DispatchContext, StateContext } from '../../../../../context'
import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'
import { useLingui } from '@lingui/react'

interface Props {
  query: CharacterFragment$key
}

const CharacterFragmentGQL = graphql`
  fragment CharacterFragment on Post {
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
`

export default function Category ({
  query
}: Props): JSX.Element {
  const data = useFragment(CharacterFragmentGQL, query)

  const { i18n } = useLingui()

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const currentCharacters = data.characters.map((item) => item.id)

  const [selected, setSelected] = useState(currentCharacters)

  const setCurrentSelection = (character): void => {
    if (selected.includes(character.id)) {
      setSelected(selected.filter((item) => item !== character.id))
      dispatch({
        type: EVENTS.CHARACTERS,
        value: character,
        remove: true
      })
      return
    }
    setSelected((array) => [...array, character.id])
    dispatch({
      type: EVENTS.CHARACTERS,
      value: character
    })
  }

  const removeSelection = (id): void => {
    setSelected(selected.filter((item) => item !== id))
    dispatch({
      type: EVENTS.CHARACTERS,
      value: { id: id },
      remove: true
    })
  }

  // Initially add current characters to state on load
  useEffect(() => {
    data.characters.forEach((item) => {
      dispatch({
        type: EVENTS.CHARACTERS,
        value: item
      })
    })
  }, [])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Who is in your post?
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Select the character(s) that are the primary focus in your content.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput placeholder={i18n._(t`Search for a character by name`)}>
        {({ searchInput }) =>
          <>
            <Wrap>
              {Object.values(state.characters).map((item, index) =>
                <WrapItem key={index}>
                  <RemovableTag
                    onRemove={removeSelection}
                    id={item.id}
                    title={item.name}
                  />
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
