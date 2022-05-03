import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffPayoutQuery } from '@//:artifacts/StaffPayoutQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffClubPayoutCard
  from '../../../../club/RootStaffClub/StaffClub/StaffClubPayouts/StaffClubPayoutsList/StaffClubPayoutCard/StaffClubPayoutCard'
import StaffPayoutOptions from './StaffPayoutOptions/StaffPayoutOptions'
import StaffPayoutAccount from './StaffPayoutAccount/StaffPayoutAccount'
import StaffPayoutPaymentsList from './StaffPayoutPaymentsList/StaffPayoutPaymentsList'
import StaffPayoutEvents from './StaffPayoutEvents/StaffPayoutEvents'
import StaffPayoutClub from './StaffPayoutClub/StaffPayoutClub'

interface Props {
  query: PreloadedQuery<StaffPayoutQuery>
}

const Query = graphql`
  query StaffPayoutQuery($reference: String!) {
    payout(reference: $reference) {
      ...StaffClubPayoutCardFragment
      ...StaffPayoutOptionsFragment
      ...StaffPayoutAccountFragment
      ...StaffPayoutPaymentsListFragment
      ...StaffPayoutEventsFragment
      ...StaffPayoutClubFragment
    }
  }
`

export default function StaffPayout ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffPayoutQuery>(
    Query,
    query
  )

  if (queryData?.payout == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={6}>
      <TableBodyRowBackground>
        <StaffClubPayoutCard query={queryData.payout} />
      </TableBodyRowBackground>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Payout
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Account
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Club
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Payments
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Events
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StaffPayoutOptions query={queryData.payout} />
          </TabPanel>
          <TabPanel>
            <StaffPayoutAccount query={queryData.payout} />
          </TabPanel>
          <TabPanel>
            <StaffPayoutClub query={queryData.payout} />
          </TabPanel>
          <TabPanel>
            <StaffPayoutPaymentsList query={queryData.payout} />
          </TabPanel>
          <TabPanel>
            <StaffPayoutEvents query={queryData.payout} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
