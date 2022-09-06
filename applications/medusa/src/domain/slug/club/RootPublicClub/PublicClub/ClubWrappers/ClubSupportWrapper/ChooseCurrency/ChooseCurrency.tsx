import type { ChooseCurrencyFragment$key } from '@//:artifacts/ChooseCurrencyFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Select from '@//:modules/form/Select/Select'
import { HStack } from '@chakra-ui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: ChooseCurrencyFragment$key
}

const Fragment = graphql`
  fragment ChooseCurrencyFragment on Club {
    supporterSubscriptionPrice {
      prices {
        currency
      }
    }
  }
`

export default function ChooseCurrency ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const {
    state,
    dispatch
  } = useSequenceContext()

  const onChangeCurrency = (e): void => {
    dispatch({
      type: 'currency',
      value: e.target.value,
      transform: 'SET'
    })
  }

  return (
    <HStack w='100%' spacing={3} justify='flex-start'>
      <Select
        variant='filled'
        size='lg'
        w={140}
        defaultValue={state.currency}
        onChange={onChangeCurrency}
      >
        {data.supporterSubscriptionPrice.prices.map((item) => (
          <option
            key={item.currency}
            value={item.currency}
          >
            {item.currency}
          </option>
        ))}
      </Select>
    </HStack>
  )
}
