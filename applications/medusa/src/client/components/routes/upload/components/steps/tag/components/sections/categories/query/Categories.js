/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { CategoriesQuery } from '@//:artifacts/CategoriesQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';
import { Wrap, Flex, Heading } from '@chakra-ui/react';
import Icon from '@//:modules/content/icon/Icon';
import CleaningBroom from '@streamlinehq/streamlinehq/img/streamline-regular/cleaning-broom-fSZbre.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  args: {
    variables: VariablesOf<CategoriesQuery>,
    options?: any,
  },
  onSelect: any,
  selected: Array<string>,
};

const CategoriesQueryGQL = graphql`
  query CategoriesQuery($data: SearchInput!) {
    categories(data: $data) {
      id
      title
      thumbnail
    }
  }
`;

export default function Categories({ args, onSelect, selected }: Props): Node {
  const [t] = useTranslation('upload');

  const data = useLazyLoadQuery<CategoriesQuery>(
    CategoriesQueryGQL,
    args.variables,
    args.options,
  );

  // We dont let users add custom categories
  if (data.categories.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" h="70%">
        <Icon h={100} w={100} icon={CleaningBroom} color="gray.100" mb={8} />
        <Heading mb={8} color="gray.100" size="lg">
          {t('tag.category.not_found')}
        </Heading>
      </Flex>
    );
  }

  return (
    <Wrap justify="center">
      {data.categories.map(item => (
        <Element
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selected.indexOf(item.id) > -1}
          title={item.title}
          thumbnail={item.thumbnail}
        />
      ))}
    </Wrap>
  );
}
