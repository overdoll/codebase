/**
 * @flow
 */
import type { Node } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import type { ArtistsQuery } from '@//:artifacts/ArtistsQuery.graphql';
import type { VariablesOf } from 'relay-runtime';
import Element from '../../../element/Element';
import { Wrap, Flex, Heading } from '@chakra-ui/react';
import CleaningBroom from '@streamlinehq/streamlinehq/img/streamline-regular/cleaning-broom-fSZbre.svg';
import Button from '@//:modules/form/button/Button';
import { useTranslation } from 'react-i18next';
import Icon from '@//:modules/content/icon/Icon';

type Props = {
  args: {
    variables: VariablesOf<ArtistsQuery>,
    options: {},
  },
  onSelect: () => void,
  selected: { id: string },
};

const ArtistsQueryGQL = graphql`
  query ArtistsQuery($data: SearchInput!) {
    artists(data: $data) {
      id
      avatar
      username
    }
  }
`

export default function Artists ({ args, onSelect, selected }: Props): Node {
  const data = useLazyLoadQuery<ArtistsQuery>(
    ArtistsQueryGQL,
    args.variables,
    args.options
  )

  // Add new artist if no artists are available
  const addNewArtist = () => {
    onSelect({ id: null, username: args.variables.data.search, avatar: null })
  }

  const [t] = useTranslation('upload');

  if (data.artists.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" h="70%">
        <Icon h={100} w={100} icon={CleaningBroom} color="gray.100" mb={8} />
        <Heading mb={8} color="gray.100" size="lg">
          {t('tag.artist.not_found')}
        </Heading>
        <Button size="lg" onClick={addNewArtist}>
          {t('tag.artist.add') + ' ' + args.variables.data.search}
        </Button>
      </Flex>
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
