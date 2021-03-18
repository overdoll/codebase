/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { CategoriesQuery } from '@//:artifacts/CategoriesQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';

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
  const data = useLazyLoadQuery<CategoriesQuery>(
    CategoriesQueryGQL,
    args.variables,
    args.options,
  );

  if (data.categories.length === 0) {
    return 'no categories found';
  }

  return data.categories.map(item => (
    <Element
      key={item.id}
      onSelect={() => onSelect(item)}
      selected={selected.indexOf(item.id) > -1}
    >
      {item.title}-{item.thumbnail}
    </Element>
  ));
}
