import type { ChooseCurrencyFragment$key } from '@//:artifacts/ChooseCurrencyFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Select from '@//:modules/form/Select/Select'
import { useState } from 'react'
import { MaybeRenderProp } from '@//:types/components'
import { runIfFunction } from '@//:modules/support'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  query: ChooseCurrencyFragment$key
  defaultValue: string
  onChange: (e) => void
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
  query,
  defaultValue,
  onChange
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const onChangeCurrency = (e): void => {
    onChange(e.target.value)
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
        defaultValue={defaultValue}
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
