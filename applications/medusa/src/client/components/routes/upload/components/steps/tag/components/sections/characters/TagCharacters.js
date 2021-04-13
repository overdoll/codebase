/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import Characters from './query/Characters';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import Section from '../../section/Section';
import { createPortal } from 'react-dom';
import Search from '../../search/Search';
import RootElement from '@//:modules/utilities/RootElement';
import Media from './query/Media';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagCharacters({ state, dispatch }: Props): Node {
  // state to handle how the new character will be added, when requested
  const [newCharacter, addNewCharacter] = useState(null);

  // OnSelect will remove or add the character based on if it's in the object already or not
  const onSelect = character => {
    if (character.request) {
      addNewCharacter(character);
    } else {
      dispatch({
        type: EVENTS.TAG_CHARACTERS,
        remove: state.characters[character.id] !== undefined,
        value: character,
      });
    }
  };

  // When the user selects a media, we send that back up the chain, where we either get a new media, or a current one
  // from our list
  const onAddNewMedia = media => {
    dispatch({
      type: EVENTS.TAG_CHARACTERS,
      remove: false,
      value: { ...newCharacter, media: media },
    });

    // reset the state back to null
    addNewCharacter(null);
  };

  // if user clicks "cancel", we move them back to the list of characters
  const onCancelNewCharacter = () => {
    addNewCharacter(null);
  };

  // if we are selecting a new character, open a modal for selecting a new media with this
  if (newCharacter !== null) {
    return createPortal(
      <Search
        header={<div>selected character: {newCharacter.name}</div>}
        onClose={onCancelNewCharacter}
      >
        {args => <Media selected={[]} onSelect={onAddNewMedia} args={args} />}
      </Search>,
      RootElement,
    );
  }

  return (
    <Section
      search={args => (
        <Characters
          selected={Object.keys(state.characters)}
          onSelect={onSelect}
          args={args}
        />
      )}
      title={'Characters'}
      count={Object.keys(state.characters).length}
    >
      DISPLAY SELECTED CHARACTERS HERE???
    </Section>
  );
}
