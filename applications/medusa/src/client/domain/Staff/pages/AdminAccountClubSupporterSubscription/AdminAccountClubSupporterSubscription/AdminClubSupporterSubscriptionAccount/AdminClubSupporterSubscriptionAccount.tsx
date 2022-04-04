import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffClubSupporterSubscriptionAccountFragment$key
} from '@//:artifacts/StaffClubSupporterSubscriptionAccountFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LargeAccountHeader from '../../../../components/LargeAccountHeader/LargeAccountHeader'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: StaffClubSupporterSubscriptionAccountFragment$key
}

const Fragment = graphql`
  fragment StaffClubSupporterSubscriptionAccountFragment on IAccountClubSupporterSubscription {
    supporterSince
    account {
      ...LargeAccountHeaderFragment
      username
    }
  }
`

export default function StaffClubSupporterSubscriptionAccount ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Supporter
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <LinkTile to={`/staff/account/${data.account.username}`}>
          <LargeAccountHeader query={data.account} />
        </LinkTile>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Supporter Since
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {supporterSince}
        </SmallBackgroundBox>
      </Box>
    </Stack>
  )
}
