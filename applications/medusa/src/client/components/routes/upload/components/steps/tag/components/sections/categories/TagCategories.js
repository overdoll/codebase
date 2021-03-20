/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../../search/Search';
import Categories from './query/Categories';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import LoadingSearch from '../../loading/LoadingSearch';
import ErrorFallback from '../../error/ErrorFallback';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagCategories({ state, dispatch }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // OnSelect will remove or add the category based on if it's in the object already or not
  const onSelect = category => {
    dispatch({
      type: EVENTS.TAG_CATEGORIES,
      value: category,
      remove: state.categories[category.id] !== undefined,
    });
  };

  return (
    <>
      <div>current categories: {Object.keys(state.characters).length}</div>
      DISPLAY SELECTED CATEGORIES HERE???
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args, refetch }) => (
              <>
                DISPLAY SELECTED CATEGORIES HERE???
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
                    <Categories
                      selected={Object.keys(state.categories)}
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
