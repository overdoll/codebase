import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import {
  AdminAccountClubSupporterSubscriptionQuery
} from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import AdminClubSupporterSubscriptionPreview
  from '../../AdminAccount/AdminAccount/AdminClubSupporterSubscriptions/AdminClubSupporterSubscription/AdminClubSupporterSubscriptionPreview'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import AdminSubscriptionTransactions from './AdminSubscriptionTransactions/AdminSubscriptionTransactions'
import AdminClubSupporterSubscriptionInformation
  from './AdminClubSupporterSubscriptionInformation/AdminClubSupporterSubscriptionInformation'
import AdminClubSupporterSubscriptionBillingError
  from './AdminClubSupporterSubscriptionBillingErrors/AdminClubSupporterSubscriptionBillingError'
import AdminClubSupporterSubscriptionAccount
  from './AdminClubSupporterSubscriptionAccount/AdminClubSupporterSubscriptionAccount'
import AdminClubSupporterSubscriptionClub from './AdminClubSupporterSubscriptionClub/AdminClubSupporterSubscriptionClub'

interface Props {
  query: PreloadedQuery<AdminAccountClubSupporterSubscriptionQuery>
}

const Query = graphql`
  query AdminAccountClubSupporterSubscriptionQuery($reference: String!) {
    accountClubSupporterSubscription(reference: $reference) {
      ... on IAccountClubSupporterSubscription {
        ...AdminClubSupporterSubscriptionInformationFragment
        ...AdminClubSupporterSubscriptionBillingErrorFragment
        ...AdminClubSupporterSubscriptionAccountFragment
        ...AdminSubscriptionTransactionsFragment
        ...AdminClubSupporterSubscriptionClubFragment
      }
      __typename
      ...AdminClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function AdminAccountClubSupporterSubscription ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminAccountClubSupporterSubscriptionQuery>(
    Query,
    query
  )

  if (queryData?.accountClubSupporterSubscription == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={4}>
      <TableBodyRowBackground>
        <AdminClubSupporterSubscriptionPreview query={queryData?.accountClubSupporterSubscription} />
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
            <AdminClubSupporterSubscriptionInformation query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <AdminSubscriptionTransactions query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <AdminClubSupporterSubscriptionClub query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <AdminClubSupporterSubscriptionAccount query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
          <TabPanel>
            <AdminClubSupporterSubscriptionBillingError query={queryData.accountClubSupporterSubscription} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
