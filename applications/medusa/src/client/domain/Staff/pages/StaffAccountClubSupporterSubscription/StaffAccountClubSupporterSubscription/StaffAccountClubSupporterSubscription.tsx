import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import {
  StaffAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import StaffClubSupporterSubscriptionPreview
  from '../../StaffAccount/StaffAccount/StaffClubSupporterSubscriptions/StaffClubSupporterSubscription/StaffClubSupporterSubscriptionPreview'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffClubSupporterSubscriptionBillingError
  from './StaffClubSupporterSubscriptionBillingErrors/StaffClubSupporterSubscriptionBillingError'
import StaffClubSupporterSubscriptionAccount
  from './StaffClubSupporterSubscriptionAccount/StaffClubSupporterSubscriptionAccount'
import StaffClubSupporterSubscriptionClub from './StaffClubSupporterSubscriptionClub/StaffClubSupporterSubscriptionClub'
import StaffSubscriptionOptions from './StaffSubscriptionOptions/StaffSubscriptionOptions'
import StaffSubscriptionTransactions from './StaffSubscriptionTransactions/StaffSubscriptionTransactions'

interface Props {
  query: PreloadedQuery<StaffAccountClubSupporterSubscriptionQuery>
}

const Query = graphql`
  query StaffAccountClubSupporterSubscriptionQuery($reference: String!) {
    accountClubSupporterSubscription(reference: $reference) {
      __typename
      ...StaffClubSupporterSubscriptionPreviewFragment
      ... on IAccountClubSupporterSubscription {
        ...StaffClubSupporterSubscriptionBillingErrorFragment
        ...StaffClubSupporterSubscriptionAccountFragment
        ...StaffClubSupporterSubscriptionClubFragment
      }
      ...StaffSubscriptionOptionsFragment
      ...StaffSubscriptionTransactionsFragment
    }
  }
`

export default function StaffAccountClubSupporterSubscription ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffAccountClubSupporterSubscriptionQuery>(
    Query,
    query
  )

  if (queryData?.accountClubSupporterSubscription == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={4}>
      <TableBodyRowBackground>
        <StaffClubSupporterSubscriptionPreview query={queryData?.accountClubSupporterSubscription} />
      </TableBodyRowBackground>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Subscription
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Transactions
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Club
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Supporter
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Error
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StaffSubscriptionOptions query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <StaffSubscriptionTransactions query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <StaffClubSupporterSubscriptionClub query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <StaffClubSupporterSubscriptionAccount query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <StaffClubSupporterSubscriptionBillingError query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
