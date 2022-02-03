import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { UploadAudiencesSingleSelectorQuery } from '@//:artifacts/UploadAudiencesSingleSelectorQuery.graphql'
import {
  SingleSelectedValue,
  SingleSelectedValueFunction,
  SingleSelector,
  StackTile
} from '@//:modules/content/ContentSelection'
import { ListSpacer } from '@//:modules/content/PageLayout'
import AudienceTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/AudienceTileOverlay/AudienceTileOverlay'

interface Props {
  selected: SingleSelectedValue
  onSelect: SingleSelectedValueFunction
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
