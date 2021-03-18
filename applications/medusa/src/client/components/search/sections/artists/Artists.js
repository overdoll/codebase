/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { ArtistsQuery } from '@//:artifacts/ArtistsQuery.graphql';

type Props = {
  args: {
    variables: any,
    options: any,
  },
};

const ArtistsQueryGQL = graphql`
  query ArtistsQuery($data: SearchInput!) {
    artists(data: $data) {
      id
      avatar
      username
    }
  }
`;

export default function Artists({ args }: Props): Node {
  const data = useLazyLoadQuery<ArtistsQuery>(
    ArtistsQueryGQL,
    args.variables,
    args.options,
  );

  return data.artists.map(item => (
    <div key={item.id}>
      {item.username}-{item.avatar}
    </div>
  ));
}
