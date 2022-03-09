import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { SelectCancellationReasonListQuery } from '@//:artifacts/SelectCancellationReasonListQuery.graphql'
import { CancellationReasonOverlay, StackTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Stack } from '@chakra-ui/react'

type Props = ComponentSearchArguments<any> & ComponentChoiceArguments<any>

const Query = graphql`
  query SelectCancellationReasonListQuery {
    cancellationReasons {
      edges {
        node {
          id
          ...CancellationReasonOverlayFragment
        }
      }
    }
  }
`

export default function SelectCancellationReasonList ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SelectCancellationReasonListQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  return (
    <EmptyBoundary
      fallback={<></>}
      condition={queryData.cancellationReasons.edges.length < 1}
    >
      <Stack spacing={2}>
        {queryData.cancellationReasons.edges.map((item, index) => (
          <StackTile key={index}>
            <Choice
              {...register(item.node.id, {})}
            >
              <CancellationReasonOverlay query={item.node} />
            </Choice>
          </StackTile>
        )
        )}
      </Stack>
    </EmptyBoundary>
  )
}
