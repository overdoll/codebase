import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { AudienceMultiSelectorQuery } from '@//:artifacts/AudienceMultiSelectorQuery.graphql'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { AudienceTileOverlay, StackTile } from '@//:modules/content/ContentSelection'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
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
  searchArguments,
  register
}: Props): JSX.Element {
  const data = useLazyLoadQuery<AudienceMultiSelectorQuery>(
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
