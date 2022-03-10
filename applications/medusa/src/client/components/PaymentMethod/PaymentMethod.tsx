import { graphql } from 'react-relay'
import type { PaymentMethodFragment$key } from '@//:artifacts/PaymentMethodFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Flex, Text } from '@chakra-ui/react'
import { TableRow, TableRowColumn } from '@//:modules/content/ThemeComponents/TableRow/TableRow'
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
    <TableRow columns={4}>
      <TableRowColumn column={1}>
        <DisplayCard query={data.card} />
      </TableRowColumn>
      <TableRowColumn column={2}>
        <Flex justify='center'>
          <Text fontFamily='mono' fontSize='lg' color='gray.00'>
            **** {data.card.last4}
          </Text>
        </Flex>
      </TableRowColumn>
      <TableRowColumn column={1}>
        <Flex justify='flex-end'>
          <Text fontFamily='mono' fontSize='lg' color='gray.00'>
            {data.card.expiration}
          </Text>
        </Flex>
      </TableRowColumn>
    </TableRow>
  )
}
