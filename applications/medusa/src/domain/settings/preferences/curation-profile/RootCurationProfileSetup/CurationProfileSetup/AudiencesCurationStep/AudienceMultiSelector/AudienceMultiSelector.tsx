import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { AudienceMultiSelectorQuery } from '@//:artifacts/AudienceMultiSelectorQuery.graphql'
import { AudienceTileOverlay, GridWrap } from '@//:modules/content/ContentSelection'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
}

const Query = graphql`
  query AudienceMultiSelectorQuery {
    audiences (first: 100) {
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
    <GridWrap>
      {data.audiences.edges.map((item) => (
        <ShortGridTile key={item.node.id}>
          <Choice
            {...register(item.node.id, { title: item.node.title })}
          >
            <AudienceTileOverlay query={item.node} />
          </Choice>
        </ShortGridTile>
      )
      )}
    </GridWrap>
  )
}
