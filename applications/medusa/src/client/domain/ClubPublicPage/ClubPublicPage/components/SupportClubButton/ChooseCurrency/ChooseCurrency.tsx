import type { ChooseCurrencyFragment$key } from '@//:artifacts/ChooseCurrencyFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Select from '@//:modules/form/Select/Select'
import { Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
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
    <HStack w='100%' spacing={3} justify='space-between'>
      <Heading w='100%' fontSize='lg' color='gray.00'>
        <Trans>
          Preferred Billing Currency
        </Trans>
      </Heading>
      <Select
        variant='outline'
        size='md'
        w={140}
        defaultValue={state.currency}
        onChange={onChangeCurrency}
      >
        {data.supporterSubscriptionPrice.prices.map((item, index) => (
          <option
            key={index}
            value={item.currency}
          >
            {item.currency}
          </option>
        ))}
      </Select>
    </HStack>
  )
}
