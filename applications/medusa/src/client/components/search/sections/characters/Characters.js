/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { CharactersQuery } from '@//:artifacts/CharactersQuery.graphql';

type Props = {
  args: {
    variables: any,
    options: any,
  },
};

const CharactersQueryGQL = graphql`
  query CharactersQuery($data: SearchInput!) {
    characters(data: $data) {
      id
      name
      thumbnail
      media {
        id
        title
        thumbnail
      }
    }
  }
`;

export default function Characters({ args }: Props): Node {
  const data = useLazyLoadQuery<CharactersQuery>(
    CharactersQueryGQL,
    args.variables,
    args.options,
  );

  return data.characters.map(item => (
    <div key={item.id}>
      {item.name}-{item.thumbnail}
      {item.media.title}-{item.media.id}-{item.media.thumbnail}
    </div>
  ));
}
