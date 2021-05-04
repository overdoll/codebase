/**
 * @flow
 */
import type { Node } from 'react';
import Categories from './query/Categories';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import Section from '../../section/Section';
import { Tag, TagLabel, Text, TagCloseButton } from '@chakra-ui/react';

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

  const onRemove = category => {
    dispatch({
      type: EVENTS.TAG_CATEGORIES,
      remove: true,
      value: category,
    });
  };

  return (
    <Section
      label="select category"
      placeholder="search categories"
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
      {Object.keys(state.categories).length !== 0 ? (
        Object.keys(state.categories).map(id => (
          <Tag
            size="lg"
            key="lg"
            variant="solid"
            colorScheme="purple"
            borderRadius="full"
          >
            <TagLabel>{state.categories[id].title}</TagLabel>
            <TagCloseButton onClick={() => onRemove(state.categories[id])} />
          </Tag>
        ))
      ) : (
        <Text as="i" fontSize="md">
          No categories selected
        </Text>
      )}
    </Section>
  );
}
