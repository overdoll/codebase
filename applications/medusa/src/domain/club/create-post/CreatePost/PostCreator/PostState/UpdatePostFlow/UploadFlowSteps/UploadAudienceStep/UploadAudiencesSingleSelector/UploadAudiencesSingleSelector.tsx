import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { UploadAudiencesSingleSelectorQuery } from '@//:artifacts/UploadAudiencesSingleSelectorQuery.graphql'
import AudienceTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/AudienceTileOverlay/AudienceTileOverlay'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { EmptyAudiences, EmptyBoundary } from '@//:modules/content/Placeholder'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import { GridWrap } from '@//:modules/content/ContentSelection'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

const Query = graphql`
  query UploadAudiencesSingleSelectorQuery {
    audiences(first: 100) {
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
    <EmptyBoundary
      fallback={<EmptyAudiences />}
      condition={data.audiences.edges.length < 1}
    >
      <GridWrap>
        {data.audiences.edges.map((item, index) => (
          <ShortGridTile key={index}>
            <Choice
              {...register(item.node.id, { title: item.node.title })}
            >
              <AudienceTileOverlay query={item.node} />
            </Choice>
          </ShortGridTile>
        )
        )}
      </GridWrap>
    </EmptyBoundary>
  )
}
