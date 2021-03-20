/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../../search/Search';
import Characters from './query/Characters';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import ErrorFallback from '../../error/ErrorFallback';
import LoadingSearch from '../../loading/LoadingSearch';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagCharacters({ state, dispatch }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // OnSelect will remove or add the character based on if it's in the object already or not
  const onSelect = character => {
    dispatch({
      type: EVENTS.TAG_CHARACTERS,
      remove: state.characters[character.id] !== undefined,
      value: character,
    });
  };

  return (
    <>
      <div>current characters: {Object.keys(state.characters).length}</div>
      DISPLAY SELECTED CHARACTERS HERE???
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args, refetch }) => (
              <>
                DISPLAY SELECTED CHARACTERS HERE???
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
                    <Characters
                      selected={Object.keys(state.characters)}
                      onSelect={onSelect}
                      args={args}
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
