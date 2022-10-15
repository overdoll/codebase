import type { ChooseCurrencyFragment$key } from '@//:artifacts/ChooseCurrencyFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Select from '@//:modules/form/Select/Select'
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

export default function ChooseCurrency (props: Props): JSX.Element {
  const {
    query
  } = props

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
    <Select
      variant='flushed'
      size='sm'
      w='65px'
      flexShrink={0}
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
  )
}
