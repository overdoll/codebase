/**
 * @flow
 */
import type { Node } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import Search from '../../search/Search';
import Categories from './query/Categories';
import { useState } from 'react';
import { events } from '../../../../../../Upload';

type Props = {
  dispatch: any,
  state: any,
};

export default function TagCategories({ state, dispatch }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelect = category => {
    dispatch({
      type: events.TAG_CATEGORIES,
      value: { ...state.categories, category },
    });
  };

  return (
    <>
      <div>categories comp</div>
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args }) => (
              <Categories
                selected={Object.keys(state.categories)}
                onSelect={onSelect}
                args={args}
              />
            )}
          </Search>,
          RootElement,
        )}
    </>
  );
}
