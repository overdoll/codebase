import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { SelectRuleListQuery } from '@//:artifacts/SelectRuleListQuery.graphql'
import { RuleTileOverlay, StackTile } from '../../../../../../../ContentSelection'
import { EmptyBoundary, EmptyRules } from '../../../../../../../Placeholder'
import { Choice } from '../../../../../../Choice'
import { ComponentSearchArguments } from '../../../../../../Search/types'
import { ComponentChoiceArguments } from '../../../../../../Choice/types'
import { Stack } from '@chakra-ui/react'

type Props = ComponentSearchArguments<any> & ComponentChoiceArguments<any>

const Query = graphql`
  query SelectRuleListQuery {
    rules {
      edges {
        node {
          id
          title
          ...RuleTileOverlayFragment
        }
      }
    }
  }
`

export default function SelectRuleList ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SelectRuleListQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  //

  return (
    <EmptyBoundary
      fallback={<EmptyRules />}
      condition={queryData.rules.edges.length < 1}
    >
      <Stack spacing={2}>
        {queryData.rules.edges.map((item, index) => (
          <StackTile key={index}>
            <Choice
              {...register(item.node.id, { title: item.node.title })}
            >
              <RuleTileOverlay query={item.node} />
            </Choice>
          </StackTile>
        )
        )}
      </Stack>
    </EmptyBoundary>
  )
}
