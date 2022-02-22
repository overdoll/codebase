import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { UploadAudiencesSingleSelectorQuery } from '@//:artifacts/UploadAudiencesSingleSelectorQuery.graphql'
import { StackTile } from '@//:modules/content/ContentSelection'
import { ListSpacer } from '@//:modules/content/PageLayout'
import AudienceTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/AudienceTileOverlay/AudienceTileOverlay'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
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
  searchArguments,
  register
}: Props): JSX.Element {
  const data = useLazyLoadQuery<UploadAudiencesSingleSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  return (
    <ListSpacer>
      {data.audiences.edges.map((item, index) => (
        <StackTile key={index}>
          <Choice
            {...register(item.node.id, { title: item.node.title })}
          >
            <AudienceTileOverlay query={item.node} />
          </Choice>
        </StackTile>
      )
      )}
    </ListSpacer>
  )
}
