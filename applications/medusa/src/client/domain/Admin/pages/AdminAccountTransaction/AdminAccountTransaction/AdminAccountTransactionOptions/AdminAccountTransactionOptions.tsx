import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminAccountTransactionOptionsFragment$key
} from '@//:artifacts/AdminAccountTransactionOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Badge, Box, Menu, MenuButton, MenuList, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import Button from '@//:modules/form/Button/Button'
import {
  getTransactionColorScheme
} from '../../../../components/AdminTransactionsList/AdminTransactionCard/AdminTransactionCard'

interface Props {
  query: AdminAccountTransactionOptionsFragment$key
}

const Fragment = graphql`
  fragment AdminAccountTransactionOptionsFragment on AccountTransaction {
    type
    billedAtDate
    amount
    currency
  }
`

export default function AdminAccountTransactionOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const billedAtDate = format(new Date(data.billedAtDate as Date), dateFormat, { locale })
  const price = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Type
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Badge borderRadius='base' fontSize='sm' colorScheme={getTransactionColorScheme(data.type)}>
            {data.type}
          </Badge>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Amount
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Trans>
            {price}
          </Trans>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Billed At Date
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {billedAtDate}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <Menu placement='bottom-end' autoSelect={false}>
          <MenuButton
            w='100%'
            size='lg'
            colorScheme='gray'
            as={Button}
          >
            <Trans>
              Manage Transaction
            </Trans>
          </MenuButton>
          <MenuList minW='230px' boxShadow='outline'>
            <></>
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  )
}
