/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { CharactersQuery } from '@//:artifacts/CharactersQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';

type Props = {
  args: {
    variables: VariablesOf<CharactersQuery>,
    options?: any,
  },
  onSelect: any,
  selected: Array<string>,
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

export default function Characters({ args, onSelect, selected }: Props): Node {
  const data = useLazyLoadQuery<CharactersQuery>(
    CharactersQueryGQL,
    args.variables,
    args.options,
  );

  // When we add a "new" character, we will open a modal so that the user can select the media
  const onAddNewCharacter = () => {
    const name: string = args.variables.data.search;
    onSelect({ id: name, name: name, thumbnail: null, media: null });
  };

  if (data.characters.length === 0) {
    return (
      <>
        no characters found
        <button onClick={onAddNewCharacter}>
          add {args.variables.data.search} character
        </button>
      </>
    );
  }

  return data.characters.map(item => (
    <Element
      key={item.id}
      onSelect={() => onSelect(item)}
      selected={selected.indexOf(item.id) > -1}
    >
      {item.name}-{item.thumbnail}
      {item.media.title}-{item.media.id}-{item.media.thumbnail}
    </Element>
  ));
}
