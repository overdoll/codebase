import { graphql } from 'react-relay'
import type { TransactionSettingsCardFragment$key } from '@//:artifacts/TransactionSettingsCardFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Badge, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { TableBodyColumn, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import {
  getTransactionColorScheme
} from '../../../../../../staff/billing/subscription/RootStaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription/StaffSubscriptionTransactions/StaffTransactionsList/StaffTransactionCard/StaffTransactionCard'
import format from 'date-fns/format'
import { dateFormatWithTimeSimple } from '@//:modules/constants/format'
import ClubThumbnail from '@//:modules/content/DataDisplay/Club/ClubThumbnail/ClubThumbnail'

interface Props {
  query: TransactionSettingsCardFragment$key
}

const Fragment = graphql`
  fragment TransactionSettingsCardFragment on AccountTransaction {
    amount
    currency
    createdAt
    totalRefunded
    clubSupporterSubscription  {
      ... on IAccountClubSupporterSubscription {
        club  {
          name
          ...ClubThumbnailFragment
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
  const totalRefunded = displayPrice({
    amount: data.totalRefunded,
    currency: data.currency,
    locale: locale
  })
  const timestamp = format(new Date(data.createdAt as Date), dateFormatWithTimeSimple, { locale })

  const colorScheme = getTransactionColorScheme(data.type)

  return (
    <Stack spacing={2}>
      {data?.clubSupporterSubscription?.club != null && (
        <HStack spacing={2}>
          <ClubThumbnail
            h={10}
            w={10}
            query={data?.clubSupporterSubscription?.club}
          />
          <Heading
            noOfLines={1}
            fontSize='lg'
            color='gray.00'
          >
            {data?.clubSupporterSubscription?.club?.name}
          </Heading>
        </HStack>
      )}
      <TableBodyRow columns={7}>
        <TableBodyColumn column={3}>
          <Text w='100%' align='start' noOfLines={1} fontSize='md' color='gray.100'>
            {timestamp}
          </Text>
        </TableBodyColumn>
        <TableBodyColumn column={3}>
          <Text w='100%' align='center' noOfLines={1} fontFamily='mono' fontSize='md' color='gray.100'>
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
      {data.type === 'REFUND' && (
        <Text fontSize='md' color='gray.200'>
          {totalRefunded} was refunded to this payment method
        </Text>
      )}
    </Stack>
  )
}
