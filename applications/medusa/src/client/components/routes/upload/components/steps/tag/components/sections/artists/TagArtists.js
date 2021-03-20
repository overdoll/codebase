/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Artists from './query/Artists';
import Search from '../../search/Search';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import LoadingSearch from '../../loading/LoadingSearch';
import ErrorFallback from '../../error/ErrorFallback';

type Props = {
  dispatch: Dispatch,
  state: State,
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
    dispatch({ type: EVENTS.TAG_ARTIST, value: artist });
    onClose();
  };

  return (
    <>
      <div>current artist: {Object.keys(state.artist).length}</div>
      DISPLAY SELECTED ARTIST HERE???
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args, refetch }) => (
              <>
                DISPLAY SELECTED ARTIST HERE???
                <ErrorBoundary
                  fallback={({ error, reset }) => (
                    <ErrorFallback
                      error={error}
                      reset={reset}
                      refetch={refetch}
                    />
                  )}
                >
                  <Suspense fallback={<LoadingSearch />}>
                    <Artists
                      args={args}
                      selected={Object.keys(state.artist)}
                      onSelect={onSelect}
                    />
                  </Suspense>
                </ErrorBoundary>
              </>
            )}
          </Search>,
          RootElement,
        )}
    </>
  );
}
