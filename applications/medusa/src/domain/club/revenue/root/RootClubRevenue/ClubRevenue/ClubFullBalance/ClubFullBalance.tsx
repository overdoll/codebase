import { graphql, useFragment } from 'react-relay/hooks'
import { ClubFullBalanceFragment$key } from '@//:artifacts/ClubFullBalanceFragment.graphql'
import ClubBalance from './ClubBalance/ClubBalance'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ClubFullBalanceFragment$key
}

const Fragment = graphql`
  fragment ClubFullBalanceFragment on Club {
    slug
    pendingBalance {
      amount
      currency
    }
    ...ClubBalanceFragment
  }
`

export default function ClubFullBalance ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const pendingBalance = displayPrice({
    amount: data.pendingBalance.amount,
    currency: data.pendingBalance.currency,
    locale: locale
  })

  return (
    <Stack spacing={2}>
      <ClubBalance query={data} />
      <LargeBackgroundBox>
        <HStack justify='space-between'>
          <HStack align='center' spacing={2}>
            <Heading fontSize='md' color='gray.200'>
              <Trans>
                Pending Balance
              </Trans>
            </Heading>
            <Heading fontSize='md' color='gray.100'>
              {pendingBalance}
            </Heading>
          </HStack>
          <LinkButton
            size='sm'
            variant='link'
            href={{
              pathname: '/club/[slug]/revenue/payments',
              query: {
                slug: data.slug
              }
            }}
          >
            <Trans>
              View Payments
            </Trans>
          </LinkButton>
        </HStack>
      </LargeBackgroundBox>
    </Stack>
  )
}
