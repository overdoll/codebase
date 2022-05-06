import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPayoutCardFragment$key } from '@//:artifacts/ClubPayoutCardFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Badge, Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import {
  STATUS_COLORS
} from '../../../../../../../staff/club/RootStaffClub/StaffClub/StaffClubPayouts/StaffClubPayoutsList/StaffClubPayoutCard/StaffClubPayoutCard'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { useRouter } from 'next/router'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'

interface Props {
  query: ClubPayoutCardFragment$key
}

const Fragment = graphql`
  fragment ClubPayoutCardFragment on ClubPayout {
    reference
    amount
    currency
    status
    depositDate
  }
`

export default function ClubPayoutCard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { query: { slug } } = useRouter()

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const depositDate = format(new Date(data.depositDate as Date), dateFormat, { locale })

  const amount = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })

  return (
    <LinkTile href={{
      pathname: '/club/[slug]/revenue/payout/[reference]',
      query: {
        slug: slug as string,
        reference: data.reference
      }
    }}
    >
      <LargeBackgroundBox>
        <HStack justify='space-between' spacing={4}>
          <HStack w='100%' justify='space-between'>
            <Stack spacing={2}>
              <Heading color='gray.00' fontSize='2xl'>
                {amount}
              </Heading>
              <HStack justify='space-between' spacing={2}>
                <Badge borderRadius='base' fontSize='sm' colorScheme={STATUS_COLORS[data.status]}>
                  <Trans>
                    {data.status}
                  </Trans>
                </Badge>
                <Heading color='gray.200' fontSize='sm' />
              </HStack>
            </Stack>
            <Stack align='flex-end' justify='space-between'>
              <Box w={3} h={3} backgroundColor='gray.500' borderRadius='full' />
              <Box>
                <Heading color='gray.200' fontSize='sm'>
                  <Trans>
                    Deposit Date
                  </Trans>
                </Heading>
                <Heading color='gray.00' fontSize='md'>
                  {depositDate}
                </Heading>
              </Box>
            </Stack>
          </HStack>
        </HStack>
      </LargeBackgroundBox>
    </LinkTile>
  )
}
