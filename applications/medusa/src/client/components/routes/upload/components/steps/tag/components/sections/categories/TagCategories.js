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
import ErrorFallback from '@//:modules/fallbacks/error/ErrorFallback';
import LoadingSearch from '@//:modules/fallbacks/loading/LoadingSearch';
import type { Dispatch, State } from '../../../../../../__types__/types';
import { EVENTS } from '../../../../../../constants/constants';

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
    let result = { ...state.categories };

    if (state.categories[category.id] !== undefined) {
      delete result[category.id];
    } else {
      result = { ...state.categories, category };
    }

    dispatch({
      type: EVENTS.TAG_CATEGORIES,
      value: result,
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
            {({ args }) => (
              <>
                DISPLAY SELECTED CATEGORIES HERE???
                <ErrorBoundary fallback={ErrorFallback}>
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
