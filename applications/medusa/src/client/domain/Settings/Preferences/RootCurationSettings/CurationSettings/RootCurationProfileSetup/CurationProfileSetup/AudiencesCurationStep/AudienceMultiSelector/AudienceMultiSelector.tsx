import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { AudienceMultiSelectorQuery } from '@//:artifacts/AudienceMultiSelectorQuery.graphql'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { AudienceTileOverlay, MultiSelector, StackTile } from '@//:modules/content/ContentSelection'
import {
  MultiSelectedValue,
  MultiSelectedValueFunction
} from '@//:modules/content/ContentSelection/hooks/useMultiSelector'

interface Props {
  selected: MultiSelectedValue
  onSelect: MultiSelectedValueFunction
}

const Query = graphql`
  query AudienceMultiSelectorQuery {
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

export default function AudienceMultiSelector ({
  onSelect,
  selected
}: Props): JSX.Element {
  const data = useLazyLoadQuery<AudienceMultiSelectorQuery>(
    Query,
    {}
  )

  return (
    <ListSpacer>
      {data.audiences.edges.map((item, index) => (
        <StackTile key={index}>
          <MultiSelector
            onSelect={onSelect}
            selected={selected}
            id={item.node.id}
            name={item.node.title}
            type='audience'
          >
            <AudienceTileOverlay query={item.node} />
          </MultiSelector>
        </StackTile>
      )
      )}
    </ListSpacer>
  )
}
