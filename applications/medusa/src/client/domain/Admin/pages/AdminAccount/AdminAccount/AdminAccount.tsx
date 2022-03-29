import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { NotFoundAccount } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import AdminClubSupporterSubscriptions from './AdminClubSupporterSubscriptions/AdminClubSupporterSubscriptions'
import AdminTransactions from './AdminTransactions/AdminTransactions'
import LargeAccountHeader from './LargeAccountHeader/LargeAccountHeader'
import AdminPermissions from './AdminPermissions/AdminPermissions'

interface Props {
  query: PreloadedQuery<AdminAccountQuery>
}

const Query = graphql`
  query AdminAccountQuery($username: String!) {
    account(username: $username) {
      ...AdminPermissionsFragment
      ...AdminClubSupporterSubscriptionsFragment
      ...AdminTransactionsFragment
      ...LargeAccountHeaderFragment
    }
  }
`

export default function AdminAccount ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminAccountQuery>(
    Query,
    query
  )

  if (queryData?.account == null) {
    return <NotFoundAccount />
  }

  return (
    <Stack spacing={4}>
      <LargeAccountHeader query={queryData.account} />
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Permissions
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Subscriptions
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Transactions
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminPermissions query={queryData.account} />
          </TabPanel>
          <TabPanel>
            <AdminClubSupporterSubscriptions query={queryData.account} />
          </TabPanel>
          <TabPanel>
            <AdminTransactions query={queryData.account} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
