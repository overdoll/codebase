/**
 * @flow
 */
import type { Node } from 'react';
import Artists from './query/Artists';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import Section from '../../section/Section';
import { Tag, TagLabel, TagCloseButton, Text } from '@chakra-ui/react';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagArtists({ state, dispatch }: Props): Node {
  // For selecting an artist, we immediately close since we should only have 1
  const onSelect = (artist, onClose) => {
    dispatch({ type: EVENTS.TAG_ARTIST, value: artist });
    onClose();
  };

  const onRemove = artist => {
    dispatch({
      type: EVENTS.TAG_ARTIST,
      remove: true,
      value: artist,
    });
  };

  return (
    <Section
      label="select artist"
      placeholder="search artists"
      search={(args, onClose) => (
        <Artists
          args={args}
          selected={state.artist}
          onSelect={artist => onSelect(artist, onClose)}
        />
      )}
      title={'Artist'}
      count={Object.keys(state.artist).length !== 0 ? 1 : 0}
    >
      {Object.keys(state.artist).length !== 0 ? (
        <Tag
          size="lg"
          key="lg"
          variant="solid"
          colorScheme="teal"
          borderRadius="full"
        >
          <TagLabel>{state.artist.username}</TagLabel>
          <TagCloseButton onClick={() => onRemove(state.artist)} />
        </Tag>
      ) : (
        <Text as="i" fontSize="md">
          No artist selected
        </Text>
      )}
    </Section>
  );
}
