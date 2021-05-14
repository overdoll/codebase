/**
 * @flow
 */
import type { Node } from 'react';
import Categories from './query/Categories';
import type { Dispatch, State } from '@//:types/upload';
import { EVENTS } from '../../../../../../constants/constants';
import Section from '../../section/Section';
import { Tag, TagLabel, Text, TagCloseButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default function TagCategories({ state, dispatch }: Props): Node {
  const [t] = useTranslation('upload');

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
      label={t('tag.category.label')}
      searchTitle={t('tag.category.search')}
      search={args => (
        <Categories
          selected={Object.keys(state.categories)}
          onSelect={onSelect}
          args={args}
        />
      )}
      title={t('tag.category.label')}
      count={Object.keys(state.categories).length}
    >
      {Object.keys(state.categories).length !== 0 ? (
        Object.keys(state.categories).map(id => (
          <Tag
            key={id}
            size="lg"
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
          {t('tag.category.empty')}
        </Text>
      )}
    </Section>
  );
}
