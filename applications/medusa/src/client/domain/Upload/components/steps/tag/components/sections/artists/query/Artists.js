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
  query ArtistsQuery($username: String) {
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
    onSelect({ id: null, username: args.variables.username, avatar: null })
  }

  const [t] = useTranslation('upload')

  if (data.accounts.edges.length === 0) {
    return (
      <Empty
        title={t('tag.artist.not_found')} button={`${t('tag.artist.add')} ${args.variables.username}`}
        onClick={addNewArtist}
      />
    )
  }

  return (
    <Wrap
      justify='center'
    >
      {
        data.accounts.edges.map(item => (
          <Element
            key={item.node.id}
            onSelect={() => onSelect(item.node)}
            selected={selected.id === item.node.id}
            title={item.node.username}
            thumbnail={item.node.avatar}
          />
        ))
      }
    </Wrap>
  )
}
