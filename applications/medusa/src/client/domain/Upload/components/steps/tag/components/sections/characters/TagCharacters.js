/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import Characters from './query/Characters'
import type { Dispatch, State } from '@//:types/upload'
import { EVENTS } from '../../../../../../constants/constants'
import Section from '../../section/Section'
import Search from '../../search/Search'
import Media from './query/Media'
import { Tag, TagLabel, TagCloseButton, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  dispatch: Dispatch,
  state: State,
  minCharacters: number,
};

export default function TagCharacters ({ state, dispatch }: Props): Node {
  // state to handle how the new character will be added, when requested

  const [t] = useTranslation('upload')

  const [newCharacter, addNewCharacter] = useState(null)

  // OnSelect will remove or add the character based on if it's in the object already or not
  const onSelect = character => {
    if (character.request) {
      addNewCharacter(character)
    } else {
      dispatch({
        type: EVENTS.TAG_CHARACTERS,
        remove: state.characters[character.id] !== undefined,
        value: character
      })
    }
  }

  const onRemove = character => {
    dispatch({
      type: EVENTS.TAG_CHARACTERS,
      remove: true,
      value: character
    })
  }

  // When the user selects a media, we send that back up the chain, where we either get a new media, or a current one
  // from our list
  const onAddNewMedia = media => {
    dispatch({
      type: EVENTS.TAG_CHARACTERS,
      remove: false,
      value: { ...newCharacter, media: media }
    })

    // reset the state back to null
    addNewCharacter(null)
  }

  // if user clicks "cancel", we move them back to the list of characters
  const onCancelNewCharacter = () => {
    addNewCharacter(null)
  }

  // if we are selecting a new character, open a modal for selecting a new media with this
  if (newCharacter !== null) {
    return (
      <Search
        placeholder={t('tag.character.media.search')}
        header={t('tag.character.media.selected', { character: newCharacter.name })}
        onClose={onCancelNewCharacter}
        isOpen
      >
        {args => <Media selected={[]} onSelect={onAddNewMedia} args={args} />}
      </Search>
    )
  }

  return (
    <Section
      label={t('tag.character.label')}
      searchTitle={t('tag.character.search')}
      search={args => (
        <Characters
          selected={Object.keys(state.characters)}
          onSelect={onSelect}
          args={args}
        />
      )}
      title={t('tag.character.label')}
      count={Object.keys(state.characters).length}
    >
      {Object.keys(state.characters).length !== 0
        ? (
            Object.keys(state.characters).map(id => (
              <Tag
                key={id}
                size='lg'
                variant='solid'
                colorScheme='green'
                borderRadius='full'
              >
                <TagLabel>{`${state.characters[id].name} (${state.characters[id].media.title})`}</TagLabel>
                <TagCloseButton onClick={() => onRemove(state.characters[id])} />
              </Tag>
            ))
          )
        : (
          <Text as='i' fontSize='md'>
            {t('tag.character.empty')}
          </Text>
          )}
    </Section>
  )
}
