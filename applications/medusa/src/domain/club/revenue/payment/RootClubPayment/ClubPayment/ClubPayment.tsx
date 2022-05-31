import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubPaymentQuery } from '@//:artifacts/ClubPaymentQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Box, Heading, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Tr } from '@chakra-ui/react'
import { LargeBackgroundBox, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import {
  STATUS_COLORS
} from '../../../../../staff/club/RootStaffClub/StaffClub/StaffClubPayments/StaffClubPaymentsList/StaffClubPaymentCard/StaffClubPaymentCard'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'

interface Props {
  query: PreloadedQuery<ClubPaymentQuery>
}

const Query = graphql`
  query ClubPaymentQuery($reference: String!)  {
    payment(reference: $reference) {
      platformFeeAmount
      finalAmount
      baseAmount
      currency
      isDeduction
      status
      settlementDate
    }
  }
`

export default function ClubPayment ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPaymentQuery>(
    Query,
    query
  )

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const STATUS_DESCRIPTIONS = {
    COMPLETE: i18n._(t`The payment has been deposited as a part of a payout to your preferred payout method.`),
    PENDING: i18n._(t`The payment takes 14 days to settle, after which it will be ready to be paid out. Payments in this status will be a part of your Pending Balance.`),
    READY: i18n._(t`The payment is ready to be deposited and will be paid out as a part of an automatic payout. Payments in this status will be a part of your Balance.`)
  }

  if (queryData?.payment == null) {
    return <NotFoundGeneric />
  }

  const baseAmount = displayPrice({
    amount: queryData.payment.baseAmount,
    currency: queryData.payment.currency,
    locale: locale
  })
  const platformFeeAmount = displayPrice({
    amount: queryData.payment.platformFeeAmount,
    currency: queryData.payment.currency,
    locale: locale
  })
  const finalAmount = displayPrice({
    amount: queryData.payment.finalAmount,
    currency: queryData.payment.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      {queryData.payment.isDeduction && (
        <Alert
          status='info'
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              This is a deduction item. The deducted amount will be subtracted from your balance due to
              a refund or chargeback event.
            </Trans>
          </AlertDescription>
        </Alert>
      )}
      {!queryData.payment.isDeduction
        ? (
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Fee Breakdown
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <TableContainer>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Initial Payment</Td>
                    <Td isNumeric>{baseAmount}</Td>
                  </Tr>
                  <Tr>
                    <Td>Platform Fee</Td>
                    <Td isNumeric>({platformFeeAmount})</Td>
                  </Tr>
                  <Tr>
                    <Td>Your Cut</Td>
                    <Td isNumeric>{finalAmount}</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Type</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
          )
        : (
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Deduction Breakdown
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <TableContainer>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Deduction Amount</Td>
                    <Td isNumeric>({baseAmount})</Td>
                  </Tr>
                  <Tr>
                    <Td>Platform Fee</Td>
                    <Td isNumeric>+{platformFeeAmount}</Td>
                  </Tr>
                  <Tr>
                    <Td>Total Deducted From Balance</Td>
                    <Td isNumeric>({finalAmount})</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Type</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
          )}
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Status
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <LargeBackgroundBox>
          <Heading fontSize='xl' color={`${STATUS_COLORS[queryData.payment.status] as string}.300`}>
            {queryData.payment.status}
          </Heading>
          <Heading fontSize='sm' color='gray.200'>
            {STATUS_DESCRIPTIONS[queryData.payment.status]}
          </Heading>
          {queryData.payment.status === 'PENDING' && (
            <Heading fontSize='sm' color='gray.200'>
              <Trans>
                The payment will settle
                on {format(new Date(queryData.payment.settlementDate as Date), dateFormat, { locale })}
              </Trans>
            </Heading>
          )}
        </LargeBackgroundBox>
      </Box>
    </Stack>
  )
}
