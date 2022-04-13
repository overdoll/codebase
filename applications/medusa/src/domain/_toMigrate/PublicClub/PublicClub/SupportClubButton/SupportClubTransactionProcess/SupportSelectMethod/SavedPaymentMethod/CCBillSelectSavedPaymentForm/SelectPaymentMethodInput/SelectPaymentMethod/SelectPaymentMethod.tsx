import { graphql } from 'react-relay'
import type { SelectPaymentMethodFragment$key } from '@//:artifacts/SelectPaymentMethodFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { Stack } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import PaymentMethod from '../../../../../../../../../../settings/billing/payment-methods/RootSavedPaymentMethodsSettings/SavedPaymentMethodsSettings/PaymentMethod/PaymentMethod'

interface Props {
  onChange: (id: string) => void
  query: SelectPaymentMethodFragment$key
}

const Fragment = graphql`
  fragment SelectPaymentMethodFragment on Account {
    savedPaymentMethods {
      edges {
        node {
          id
          paymentMethod {
            ...PaymentMethodFragment
          }
        }
      }
    }
  }
`

export default function SelectPaymentMethod ({
  onChange,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    register
  } = useChoice<{}>({
    max: 1,
    onChange: (values) => {
      onChange(Object.keys(values)[0] != null ? Object.keys(values)[0] : '')
    }
  })

  return (
    <Stack spacing={1}>
      {data.savedPaymentMethods.edges.map((item, index) => (
        <Choice
          key={index}
          {...register(item.node.id, {})}
        >
          <SmallBackgroundBox bg='gray.900'>
            <PaymentMethod query={item.node.paymentMethod} />
          </SmallBackgroundBox>
        </Choice>
      )
      )}
    </Stack>
  )
}
