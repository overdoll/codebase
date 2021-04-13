/**
 * @flow
 */
import type { Node } from 'react';
import Categories from './query/Categories';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import Section from '../../section/Section';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagCategories({ state, dispatch }: Props): Node {
  // OnSelect will remove or add the category based on if it's in the object already or not
  const onSelect = category => {
    dispatch({
      type: EVENTS.TAG_CATEGORIES,
      value: category,
      remove: state.categories[category.id] !== undefined,
    });
  };

  return (
    <Section
      search={args => (
        <Categories
          selected={Object.keys(state.categories)}
          onSelect={onSelect}
          args={args}
        />
      )}
      title={'Categories'}
      count={Object.keys(state.categories).length}
    >
      DISPLAY SELECTED CATEGORIES HERE???
    </Section>
  );
}
