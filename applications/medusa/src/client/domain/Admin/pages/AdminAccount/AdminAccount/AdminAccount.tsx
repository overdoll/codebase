import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import { Box, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { NotFoundAccount } from '@//:modules/content/Placeholder'
import AdminLockAccount from './AdminLockAccount/AdminLockAccount'
import AdminAssignModerator from './AdminAssignModerator/AdminAssignModerator'
import AdminAssignStaff from './AdminAssignStaff/AdminAssignStaff'
import { Trans } from '@lingui/macro'
import AdminClubSupporterSubscriptions from './AdminClubSupporterSubscriptions/AdminClubSupporterSubscriptions'
import AdminTransactions from './AdminTransactions/AdminTransactions'
import LargeAccountHeader from '../../../components/LargeAccountHeader/LargeAccountHeader'

interface Props {
  query: PreloadedQuery<AdminAccountQuery>
}

const Query = graphql`
  query AdminAccountQuery($username: String!) {
    account(username: $username) {
      __typename
      username
      avatar {
        ...ResourceIconFragment
      }
      ...AdminLockAccountFragment
      ...AdminAssignModeratorFragment
      ...AdminAssignStaffFragment
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
            <Stack spacing={8}>
              <Box>
                <AdminLockAccount query={queryData.account} />
              </Box>
              <Box>
                <AdminAssignModerator query={queryData.account} />
              </Box>
              <Box>
                <AdminAssignStaff query={queryData.account} />
              </Box>
            </Stack>
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
