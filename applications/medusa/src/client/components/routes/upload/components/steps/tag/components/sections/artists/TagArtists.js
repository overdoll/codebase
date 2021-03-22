/**
 * @flow
 */
import type { Node } from 'react';
import Artists from './query/Artists';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import Section from '../Section';

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

  return (
    <Section
      search={(args, onClose) => (
        <Artists
          args={args}
          selected={Object.keys(state.artist)}
          onSelect={artist => onSelect(artist, onClose)}
        />
      )}
    >
      <div>current artist: {Object.keys(state.artist).length}</div>
      DISPLAY SELECTED ARTIST HERE???
    </Section>
  );
}
