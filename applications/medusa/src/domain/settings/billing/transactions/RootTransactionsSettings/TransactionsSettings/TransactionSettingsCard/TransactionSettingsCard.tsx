import { graphql } from 'react-relay'
import type { TransactionSettingsCardFragment$key } from '@//:artifacts/TransactionSettingsCardFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Badge, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { TableBodyColumn, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import {
  getTransactionColorScheme
} from '../../../../../../staff/billing/subscription/RootStaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription/StaffSubscriptionTransactions/StaffTransactionsList/StaffTransactionCard/StaffTransactionCard'
import format from 'date-fns/format'
import { dateFormatWithTimeSimple } from '@//:modules/constants/format'

interface Props {
  query: TransactionSettingsCardFragment$key
}

const Fragment = graphql`
  fragment TransactionSettingsCardFragment on AccountTransaction {
    amount
    currency
    timestamp
    clubSupporterSubscription {
      ... on IAccountClubSupporterSubscription {
        club {
          name
          thumbnail {
            ...ResourceIconFragment
          }
        }
      }
    }
    type
    paymentMethod {
      card {
        type
        last4
      }
    }
  }
`

export default function TransactionSettingsCard ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const price = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })
  const timestamp = format(new Date(data.timestamp as Date), dateFormatWithTimeSimple, { locale })

  const colorScheme = getTransactionColorScheme(data.type)

  return (
    <Stack spacing={2}>
      <HStack spacing={2}>
        <ResourceIcon h={9} w={9} query={data?.clubSupporterSubscription?.club?.thumbnail} />
        <Heading
          isTruncated
          fontSize='lg'
          color='gray.00'
        >
          {data?.clubSupporterSubscription?.club?.name}
        </Heading>
      </HStack>
      <TableBodyRow columns={7}>
        <TableBodyColumn column={3}>
          <Text w='100%' align='start' isTruncated fontSize='md' color='gray.100'>
            {timestamp}
          </Text>
        </TableBodyColumn>
        <TableBodyColumn column={3}>
          <Text w='100%' align='center' isTruncated fontFamily='mono' fontSize='md' color='gray.100'>
            {data.paymentMethod.card.type} **{data.paymentMethod.card.last4}
          </Text>
        </TableBodyColumn>
        <TableBodyColumn column={1}>
          <Flex w='100%' justify='flex-end'>
            <Badge borderRadius='base' fontSize='md' colorScheme={colorScheme}>
              {price}
            </Badge>
          </Flex>
        </TableBodyColumn>
      </TableBodyRow>
    </Stack>
  )
}
