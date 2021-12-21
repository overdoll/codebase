import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { AudiencesQuery } from '@//:artifacts/AudiencesQuery.graphql'
import {
  RowItem,
  RowWrap,
  Selector,
  SelectorTextOverlay
} from '../../../../../../../../../../../components/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'

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
          thumbnail {
            ...ResourceItemFragment
          }
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
    <RowWrap>
      {data.audiences.edges.map((item, index) => (
        <RowItem key={index}>
          <Selector
            onSelect={onSelect}
            selected={(selected != null) ? [selected] : []}
            id={item.node.id}
          >
            <SelectorTextOverlay label={item.node.title}>
              <ResourceItem query={item.node.thumbnail as ResourceItemFragment$key} />
            </SelectorTextOverlay>
          </Selector>
        </RowItem>
      )
      )}
    </RowWrap>
  )
}
