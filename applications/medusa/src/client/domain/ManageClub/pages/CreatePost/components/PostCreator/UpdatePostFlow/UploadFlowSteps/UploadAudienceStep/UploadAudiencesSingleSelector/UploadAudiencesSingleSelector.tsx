import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { UploadAudiencesSingleSelectorQuery } from '@//:artifacts/UploadAudiencesSingleSelectorQuery.graphql'
import { SingleSelector, StackTile } from '@//:modules/content/ContentSelection'
import { ListSpacer } from '@//:modules/content/PageLayout'
import AudienceTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/AudienceTileOverlay/AudienceTileOverlay'
import { SingleSelectorProps } from '@//:modules/content/ContentSelection/components/SingleSelector/SingleSelector'

interface Props extends SingleSelectorProps {
}

const Query = graphql`
  query UploadAudiencesSingleSelectorQuery {
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

export default function UploadAudiencesSingleSelector ({
  onSelect,
  selected
}: Props): JSX.Element {
  const data = useLazyLoadQuery<UploadAudiencesSingleSelectorQuery>(
    Query,
    {}
  )

  return (
    <ListSpacer>
      {data.audiences.edges.map((item, index) => (
        <StackTile key={index}>
          <SingleSelector
            onSelect={onSelect}
            selected={selected}
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
