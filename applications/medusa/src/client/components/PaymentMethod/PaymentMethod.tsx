import { graphql } from 'react-relay'
import type { PaymentMethodFragment$key } from '@//:artifacts/PaymentMethodFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Flex, Text } from '@chakra-ui/react'
import { TableBodyColumn, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import DisplayCard from './DisplayCard/DisplayCard'

interface Props {
  query: PaymentMethodFragment$key
}

const Fragment = graphql`
  fragment PaymentMethodFragment on PaymentMethod {
    card {
      last4
      expiration
      ...DisplayCardFragment
    }
  }
`

export default function PaymentMethod ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TableBodyRow columns={4}>
      <TableBodyColumn column={1}>
        <DisplayCard query={data.card} />
      </TableBodyColumn>
      <TableBodyColumn column={2}>
        <Flex justify='center'>
          <Text fontFamily='mono' fontSize='lg' color='gray.00'>
            **** {data.card.last4}
          </Text>
        </Flex>
      </TableBodyColumn>
      <TableBodyColumn column={1}>
        <Flex justify='flex-end'>
          <Text fontFamily='mono' fontSize='lg' color='gray.00'>
            {data.card.expiration}
          </Text>
        </Flex>
      </TableBodyColumn>
    </TableBodyRow>
  )
}
