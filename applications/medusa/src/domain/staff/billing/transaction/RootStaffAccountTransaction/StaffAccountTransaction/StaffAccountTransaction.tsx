import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffAccountTransactionQuery } from '@//:artifacts/StaffAccountTransactionQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import StaffTransactionCard from '../../../subscription/RootStaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription/StaffSubscriptionTransactions/StaffTransactionsList/StaffTransactionCard/StaffTransactionCard'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffAccountTransactionOptions from './StaffAccountTransactionOptions/StaffAccountTransactionOptions'
import StaffAccountTransactionSubscription
  from './StaffAccountTransactionSubscription/StaffAccountTransactionSubscription'
import StaffAccountTransactionEvents from './StaffAccountTransactionEvents/StaffAccountTransactionEvents'

interface Props {
  query: PreloadedQuery<StaffAccountTransactionQuery>
}

const Query = graphql`
  query StaffAccountTransactionQuery($reference: String!) {
    accountTransaction(reference: $reference) {
      ...StaffTransactionCardFragment
      ...StaffAccountTransactionOptionsFragment
      ...StaffAccountTransactionSubscriptionFragment
      ...StaffAccountTransactionEventsFragment
    }
  }
`

export default function StaffAccountTransaction ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffAccountTransactionQuery>(
    Query,
    query
  )

  if (queryData?.accountTransaction == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={6}>
      <TableBodyRowBackground>
        <StaffTransactionCard query={queryData?.accountTransaction} />
      </TableBodyRowBackground>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Transaction
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Subscription
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
            <StaffAccountTransactionOptions query={queryData.accountTransaction} />
          </TabPanel>
          <TabPanel>
            <StaffAccountTransactionSubscription query={queryData.accountTransaction} />
          </TabPanel>
          <TabPanel>
            <StaffAccountTransactionEvents query={queryData.accountTransaction} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
