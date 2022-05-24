import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubRevenueQuery } from '@//:artifacts/ClubRevenueQuery.graphql'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { Box, Stack } from '@chakra-ui/react'
import ClubFullBalance from './ClubFullBalance/ClubFullBalance'
import ClubPayoutsList from './ClubPayoutsList/ClubPayoutsList'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ClubPayoutMethodAlert from './ClubPayoutMethodAlert/ClubPayoutMethodAlert'
import { CLUB_GUIDELINES, PAYOUTS_INFORMATION } from '@//:modules/constants/links'
import { ClubPeopleGroup, PayoutMethod } from '@//:assets/icons'
import ClubInformationBanner from '../../../../../../common/components/ClubInformationBanner/ClubInformationBanner'
import ClubTransactionMetrics from './ClubTransactionMetrics/ClubTransactionMetrics'

interface Props {
  query: PreloadedQuery<ClubRevenueQuery>
}

const Query = graphql`
  query ClubRevenueQuery($slug: String!)  {
    club(slug: $slug) {
      __typename
      viewerIsOwner
      ...ClubFullBalanceFragment
      ...ClubPayoutsListFragment
      ...ClubPayoutMethodAlertFragment
      ...ClubInformationBannerFragment
      ...ClubTransactionMetricsFragment
    }
  }
`

export default function ClubRevenue ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubRevenueQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <ClubInformationBanner query={queryData.club} />
        <ClubPayoutMethodAlert query={queryData.club} />
      </Stack>
      <ClubFullBalance query={queryData.club} />
      <ClubPayoutsList query={queryData.club} />
      <ClubTransactionMetrics query={queryData.club} />
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Help
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <Stack spacing={2}>
          <PagePanelWrap isExternal href={CLUB_GUIDELINES}>
            <PagePanelIcon icon={ClubPeopleGroup} colorScheme='purple' />
            <PagePanelText
              title={
                <Trans>Club Guidelines</Trans>
              }
              description={(
                <Trans>Requirements for revenue collection</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal href={PAYOUTS_INFORMATION}>
            <PagePanelIcon icon={PayoutMethod} colorScheme='green' />
            <PagePanelText
              title={
                <Trans>Payouts Information</Trans>
              }
              description={(
                <Trans>Information about payouts</Trans>
              )}
            />
          </PagePanelWrap>
        </Stack>
      </Box>
    </Stack>
  )
}
