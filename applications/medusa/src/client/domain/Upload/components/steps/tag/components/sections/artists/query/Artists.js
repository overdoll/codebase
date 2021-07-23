/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { ArtistsQuery } from '@//:artifacts/ArtistsQuery.graphql'
import type { VariablesOf } from 'relay-runtime'
import Element from '../../../../../../../../../components/Element/Element'
import { Wrap } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Empty from '../../../search/empty/Empty'

type Props = {
  args: {
    variables: VariablesOf<ArtistsQuery>,
    options: {},
  },
  onSelect: () => void,
  selected: { id: string },
};

const ArtistsQueryGQL = graphql`
  query ArtistsQuery($username: String!) {
    accounts(username: $username) {
      edges {
        node {
          id
          avatar
          username
        }
      }
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

  const [t] = useTranslation('upload')

  if (data.artists.edges.length === 0) {
    return (
      <Empty
        title={t('tag.artist.not_found')} button={`${t('tag.artist.add')} ${args.variables.data.search}`}
        onClick={addNewArtist}
      />
    )
  }

  return (
    <Wrap
      justify='center'
    >
      {
        data.artists.map(item => (
          <Element
            key={item.id}
            onSelect={() => onSelect(item)}
            selected={selected.id === item.id}
            title={item.username}
            thumbnail={item.avatar}
          />
        ))
      }
    </Wrap>
  )
}
