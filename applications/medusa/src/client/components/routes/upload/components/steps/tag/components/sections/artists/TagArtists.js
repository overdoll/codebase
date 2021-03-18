/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Artists from './query/Artists';
import Search from '../../search/Search';
import { events } from '../../../../../../Upload';

type Props = {
  dispatch: any,
  state: any,
};

export default function TagArtists({ state, dispatch }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // For selecting an artist, we immediately close since we should only have 1
  const onSelect = artist => {
    dispatch({ type: events.TAG_ARTIST, value: artist });
    onClose();
  };

  return (
    <>
      <div>artists comp</div>
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args }) => (
              <>
                selected:
                <Suspense fallback="loading artists">
                  <Artists
                    args={args}
                    selected={Object.keys(state.artist)}
                    onSelect={onSelect}
                  />
                </Suspense>
              </>
            )}
          </Search>,
          RootElement,
        )}
    </>
  );
}
