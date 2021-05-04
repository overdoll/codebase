/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { ArtistsQuery } from '@//:artifacts/ArtistsQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';
import { Wrap } from '@chakra-ui/react';

type Props = {
  args: {
    variables: VariablesOf<ArtistsQuery>,
    options?: any,
  },
  onSelect: any,
  selected: any,
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

export default function Artists({ args, onSelect, selected }: Props): Node {
  const data = useLazyLoadQuery<ArtistsQuery>(
    ArtistsQueryGQL,
    args.variables,
    args.options,
  );

  // Add new artist if no artists are available
  const addNewArtist = () => {
    onSelect({ id: null, username: args.variables.data.search, avatar: null });
  };

  if (data.artists.length === 0) {
    return (
      <>
        no artists found
        <button onClick={addNewArtist}>
          add {args.variables.data.search} artist
        </button>
      </>
    );
  }

  return (
    <Wrap justify="center">
      {data.artists.map(item => (
        <Element
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selected.id === item.id}
          title={item.username}
          thumbnail={item.avatar}
        />
      ))}
    </Wrap>
  );
}
