/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CharactersQuery } from '@//:artifacts/CharactersQuery.graphql'
import type { VariablesOf } from 'relay-runtime'
import Element from '../../../../../../../../../components/Element/Element'
import { Wrap } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Empty from '../../../search/empty/Empty'

type Props = {
  args: {
    variables: VariablesOf<CharactersQuery>,
    options: {},
  },
  onSelect: () => void,
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
`

export default function Characters ({ args, onSelect, selected }: Props): Node {
  const data = useLazyLoadQuery<CharactersQuery>(
    CharactersQueryGQL,
    args.variables,
    args.options
  )

  // When we add a "new" character, we will open a modal so that the user can select the media
  const onAddNewCharacter = () => {
    const name: string = args.variables.data.search
    onSelect({
      id: name,
      name: name,
      thumbnail: null,
      media: null,
      request: true
    })
  }

  const [t] = useTranslation('upload')

  if (data.characters.length === 0) {
    return (
      <Empty
        title={t('tag.character.not_found')} button={`${t('tag.character.add')} ${args.variables.data.search}`}
        onClick={onAddNewCharacter}
      />
    )
  }

  return (
    <>
      <Wrap justify='center'>
        {data.characters.map(item => (
          <Element
            key={item.id}
            onSelect={() => onSelect(item)}
            selected={selected.indexOf(item.id) > -1}
            title={item.name}
            subheader={item.media.title}
            thumbnail={item.thumbnail}
          />
        ))}
      </Wrap>
    </>
  )
}
