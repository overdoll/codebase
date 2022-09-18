import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPaymentCardFragment$key } from '@//:artifacts/ClubPaymentCardFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Badge, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import {
  STATUS_COLORS
} from '../../../../../../staff/club/RootStaffClub/StaffClub/StaffClubPayments/StaffClubPaymentsList/StaffClubPaymentCard/StaffClubPaymentCard'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { useRouter } from 'next/router'
import { AddPlus, ArrowButtonRight, SubtractMinus } from '@//:assets/icons'
import Icon from '../../../../../../../modules/content/PageLayout/BuildingBlocks/Icon/Icon'

interface Props {
  query: ClubPaymentCardFragment$key
}

const Fragment = graphql`
  fragment ClubPaymentCardFragment on ClubPayment {
    settlementDate
    reference
    finalAmount
    currency
    status
    isDeduction
  }
`

export default function ClubPaymentCard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { query: { slug } } = useRouter()

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const settlementDate = format(new Date(data.settlementDate as Date), dateFormat, { locale })

  const amount = displayPrice({
    amount: data.finalAmount,
    currency: data.currency,
    locale: locale
  })

  return (
    <LinkTile href={{
      pathname: '/club/[slug]/revenue/payment/[reference]',
      query: {
        slug: slug as string,
        reference: data.reference
      }
    }}
    >
      <LargeBackgroundBox>
        <HStack align='center' justify='space-between' spacing={2}>
          <Grid w='100%' templateColumns='repeat(3, 1fr)' gap={2}>
            <GridItem colSpan={1}>
              <HStack spacing={1} h='100%' align='center'>
                {data.isDeduction
                  ? (
                    <Icon
                      icon={SubtractMinus}
                      w={2}
                      h={2}
                      fill='orange.300'
                    />
                    )
                  : (
                    <Icon
                      icon={AddPlus}
                      w={2}
                      h={2}
                      fill='green.300'
                    />
                    )}
                {data.isDeduction
                  ? (
                    <Heading color='orange.300' fontSize='lg'>
                      {amount}
                    </Heading>)
                  : (
                    <Heading color='green.400' fontSize='lg'>
                      {amount}
                    </Heading>)}
              </HStack>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex h='100%' align='center'>
                <Badge borderRadius='base' fontSize='sm' colorScheme={STATUS_COLORS[data.status]}>
                  <Trans>
                    {data.status}
                  </Trans>
                </Badge>
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex h='100%' align='center'>
                <Heading color='gray.100' fontSize='md'>
                  {settlementDate}
                </Heading>
              </Flex>
            </GridItem>
          </Grid>
          <Icon
            icon={ArrowButtonRight}
            w={4}
            h={4}
            fill='gray.500'
          />
        </HStack>
      </LargeBackgroundBox>
    </LinkTile>
  )
}
