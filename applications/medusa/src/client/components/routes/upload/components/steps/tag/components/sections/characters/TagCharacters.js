/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../../search/Search';
import Characters from './query/Characters';
import { events } from '../../../../../../Upload';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';

type Props = {
  dispatch: any,
  state: any,
};

export default function TagCharacters({ state, dispatch }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelect = character => {
    dispatch({
      type: events.TAG_CHARACTERS,
      value: { ...state.characters, character },
    });
  };

  return (
    <>
      <div>current characters: {Object.keys(state.characters).length}</div>
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args }) => (
              <>
                DISPLAY SELECTED CHARACTERS HERE???
                <ErrorBoundary>
                  <Suspense fallback="loading characters">
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
