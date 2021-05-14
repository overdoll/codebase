/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { CharactersQuery } from '@//:artifacts/CharactersQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';
import { Flex, Heading, Wrap } from '@chakra-ui/react';
import CleaningBroom from '@streamlinehq/streamlinehq/img/streamline-regular/cleaning-broom-fSZbre.svg';
import Icon from '@//:modules/content/icon/Icon';
import Button from '@//:modules/form/button/Button';
import { useTranslation } from 'react-i18next';

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
    onSelect({
      id: name,
      name: name,
      thumbnail: null,
      media: null,
      request: true,
    });
  };

  const [t] = useTranslation('upload');

  if (data.characters.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" h="70%">
        <Icon h={100} w={100} icon={CleaningBroom} color="gray.100" mb={8} />
        <Heading mb={8} color="gray.100" size="lg">
          {t('tag.character.not_found')}
        </Heading>
        <Button size="lg" onClick={onAddNewCharacter}>
          {t('tag.character.add') + ' ' + args.variables.data.search}
        </Button>
      </Flex>
    );
  }

  return (
    <Wrap justify="center">
      {data.characters.map(item => (
        <Element
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selected.indexOf(item.id) > -1}
          title={item.name}
          thumbnail={item.thumbnail}
        />
      ))}
    </Wrap>
  );
}
