import { graphql } from 'react-relay'
import type { SelectPaymentMethodFragment$key } from '@//:artifacts/SelectPaymentMethodFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { TableRow, TableRowColumn } from '@//:modules/content/ThemeComponents/TableRow/TableRow'
import DisplayCard from './DisplayCard/DisplayCard'

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
            card {
              last4
              expiration
              ...DisplayCardFragment
            }
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
            <TableRow columns={4}>
              <TableRowColumn column={1}>
                <DisplayCard query={item.node.paymentMethod.card} />
              </TableRowColumn>
              <TableRowColumn column={2}>
                <Flex justify='center'>
                  <Text fontFamily='mono' fontSize='lg' color='gray.00'>
                    **** {item.node.paymentMethod.card.last4}
                  </Text>
                </Flex>
              </TableRowColumn>
              <TableRowColumn column={1}>
                <Flex justify='flex-end'>
                  <Text fontFamily='mono' fontSize='lg' color='gray.00'>
                    {item.node.paymentMethod.card.expiration}
                  </Text>
                </Flex>
              </TableRowColumn>
            </TableRow>
          </SmallBackgroundBox>
        </Choice>
      )
      )}
    </Stack>
  )
}
