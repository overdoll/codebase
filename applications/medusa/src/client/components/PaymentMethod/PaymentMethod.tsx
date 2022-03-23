import { graphql } from 'react-relay'
import type { PaymentMethodFragment$key } from '@//:artifacts/PaymentMethodFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Text } from '@chakra-ui/react'
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
    <TableBodyRow columns={3}>
      <TableBodyColumn column={1}>
        <DisplayCard query={data.card} />
      </TableBodyColumn>
      <TableBodyColumn column={1}>
        <Text w='100%' align='center' isTruncated fontFamily='mono' fontSize='lg' color='gray.00'>
          **** {data.card.last4}
        </Text>
      </TableBodyColumn>
      <TableBodyColumn column={1}>
        <Text w='100%' align='end' isTruncated fontFamily='mono' fontSize='lg' color='gray.00'>
          {data.card.expiration}
        </Text>
      </TableBodyColumn>
    </TableBodyRow>
  )
}
