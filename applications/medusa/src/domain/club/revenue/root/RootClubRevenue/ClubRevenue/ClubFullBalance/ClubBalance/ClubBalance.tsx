import { graphql, useFragment } from 'react-relay/hooks'
import { ClubBalanceFragment$key } from '@//:artifacts/ClubBalanceFragment.graphql'
import { Icon } from '@//:modules/content/PageLayout'
import displayPrice from '@//:modules/support/displayPrice'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { PayoutMethod } from '@//:assets/icons'

interface Props {
  query: ClubBalanceFragment$key
}

const Fragment = graphql`
  fragment ClubBalanceFragment on Club {
    balance {
      amount
      currency
    }
  }
`

export default function ClubBalance ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const balance = displayPrice({
    amount: data.balance.amount,
    currency: data.balance.currency,
    locale: locale
  })

  return (
    <Stack spacing={4}>
      <HStack align='center' spacing={2}>
        <Icon icon={PayoutMethod} w={3} h={3} fill='gray.200' />
        <Heading fontSize='md' color='gray.200'>
          <Trans>
            Balance
          </Trans>
        </Heading>
      </HStack>
      <Heading fontSize='4xl' color='gray.00'>
        {balance}
      </Heading>
    </Stack>
  )
}
