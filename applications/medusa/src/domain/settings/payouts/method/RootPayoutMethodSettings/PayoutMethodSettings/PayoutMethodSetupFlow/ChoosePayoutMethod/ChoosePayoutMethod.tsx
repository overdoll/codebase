import { graphql, useFragment } from 'react-relay/hooks'
import type { ChoosePayoutMethodFragment$key } from '@//:artifacts/ChoosePayoutMethodFragment.graphql'
import { Choice, useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import { StackTile } from '@//:modules/content/ContentSelection'
import PayoutMethodChoice from './PayoutMethodChoice/PayoutMethodChoice'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: ChoosePayoutMethodFragment$key
}

const Fragment = graphql`
  fragment ChoosePayoutMethodFragment on Country {
    payoutMethods
  }
`

export default function ChoosePayoutMethod ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    register
  } = useChoiceContext()

  return (
    <Stack spacing={2}>
      {data.payoutMethods.map((item) => (
        <StackTile key={item}>
          <Choice
            {...register(item, {})}
          >
            <PayoutMethodChoice payoutMethod={item} />
          </Choice>
        </StackTile>
      )
      )}
    </Stack>
  )
}
