import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { AudiencesQuery } from '@//:artifacts/AudiencesQuery.graphql'
import { SingleSelector, StackTile } from '../../../../../../../../../../../../modules/content/ContentSelection'
import { ListSpacer } from '@//:modules/content/PageLayout'
import AudienceTileOverlay
  from '../../../../../../../../../../../../modules/content/ContentSelection/components/TileOverlay/AudienceTileOverlay/AudienceTileOverlay'

interface Props {
  selected: string | null
  onSelect: (id: string) => void
}

const Query = graphql`
  query AudiencesQuery {
    audiences {
      edges {
        node {
          id
          title
          ...AudienceTileOverlayFragment
        }
      }
    }
  }
`

export default function Audiences ({
  onSelect,
  selected
}: Props): JSX.Element {
  const data = useLazyLoadQuery<AudiencesQuery>(
    Query,
    {}
  )

  return (
    <ListSpacer>
      {data.audiences.edges.map((item, index) => (
        <StackTile key={index}>
          <SingleSelector
            onSelect={onSelect}
            selected={(selected != null) ? [selected] : []}
            id={item.node.id}
          >
            <AudienceTileOverlay query={item.node} />
          </SingleSelector>
        </StackTile>
      )
      )}
    </ListSpacer>
  )
}
