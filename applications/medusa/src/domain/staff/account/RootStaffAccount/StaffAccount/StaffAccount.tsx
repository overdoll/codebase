import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffAccountQuery } from '@//:artifacts/StaffAccountQuery.graphql'
import { HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { NotFoundAccount } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import StaffClubSupporterSubscriptions from './StaffClubSupporterSubscriptions/StaffClubSupporterSubscriptions'
import StaffTransactions from './StaffTransactions/StaffTransactions'
import LargeAccountHeader from '../../../../../common/components/LargeAccountHeader/LargeAccountHeader'
import StaffPermissions from './StaffPermissions/StaffPermissions'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ProfilePageButton from '../../../../profile/RootProfile/Profile/ProfileMenu/ProfilePageButton/ProfilePageButton'

interface Props {
  query: PreloadedQuery<StaffAccountQuery>
}

const Query = graphql`
  query StaffAccountQuery($username: String!) {
    account(username: $username) {
      ...StaffPermissionsFragment
      ...StaffClubSupporterSubscriptionsFragment
      ...StaffTransactionsFragment
      ...LargeAccountHeaderFragment
      ...ProfilePageButtonFragment
    }
  }
`

export default function StaffAccount ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffAccountQuery>(
    Query,
    query
  )

  if (queryData?.account == null) {
    return <NotFoundAccount />
  }

  return (
    <Stack spacing={4}>
      <HStack spacing={2} justify='space-between'>
        <LargeAccountHeader query={queryData.account} />
        <Menu
          p={1}
        >
          <ProfilePageButton query={queryData.account} />
        </Menu>
      </HStack>
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
            <StaffPermissions query={queryData.account} />
          </TabPanel>
          <TabPanel>
            <StaffClubSupporterSubscriptions query={queryData.account} />
          </TabPanel>
          <TabPanel>
            <StaffTransactions query={queryData.account} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
