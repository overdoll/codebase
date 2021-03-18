/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { CategoriesQuery } from '@//:artifacts/CategoriesQuery.graphql';

type Props = {
  args: {
    variables: any,
    options: any,
  },
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

export default function Categories({ args }: Props): Node {
  const data = useLazyLoadQuery<CategoriesQuery>(
    CategoriesQueryGQL,
    args.variables,
    args.options,
  );

  return data.categories.map(item => (
    <div key={item.id}>
      {item.title}-{item.thumbnail}
    </div>
  ));
}
