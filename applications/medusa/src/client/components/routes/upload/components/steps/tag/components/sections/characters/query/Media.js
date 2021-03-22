/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { MediaQuery } from '@//:artifacts/MediaQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';

type Props = {
  args: {
    variables: VariablesOf<MediaQuery>,
    options?: any,
  },
  onSelect: any,
};

const MediaQueryGQL = graphql`
  query MediaQuery($data: SearchInput!) {
    media(data: $data) {
      id
      title
      thumbnail
    }
  }
`;

export default function Media({ args, onSelect }: Props): Node {
  const data = useLazyLoadQuery<MediaQuery>(
    MediaQueryGQL,
    args.variables,
    args.options,
  );

  // add a new media with a custom tag telling us it's custom
  const onAddNewMedia = () => {
    const name: string = args.variables.data.search;
    onSelect({ id: name, title: name, thumbnail: null, request: true });
  };

  return (
    <>
      {data.media.length === 0 ? (
        <div>
          no media found
          <button onClick={onAddNewMedia}>
            add {args.variables.data.search} media
          </button>
        </div>
      ) : (
        data.media.map(item => (
          <Element
            key={item.id}
            onSelect={() => onSelect(item)}
            selected={false}
          >
            {item.title}-{item.id}-{item.thumbnail}
          </Element>
        ))
      )}
    </>
  );
}
