import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminAccountTransactionQuery } from '@//:artifacts/AdminAccountTransactionQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import AdminTransactionCard from '../../AdminAccountClubSupporterSubscription/AdminAccountClubSupporterSubscription/AdminSubscriptionTransactions/AdminTransactionsList/AdminTransactionCard/AdminTransactionCard'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import AdminAccountTransactionOptions from './AdminAccountTransactionOptions/AdminAccountTransactionOptions'
import AdminAccountTransactionSubscription
  from './AdminAccountTransactionSubscription/AdminAccountTransactionSubscription'
import AdminAccountTransactionEvents from './AdminAccountTransactionEvents/AdminAccountTransactionEvents'

interface Props {
  query: PreloadedQuery<AdminAccountTransactionQuery>
}

const Query = graphql`
  query AdminAccountTransactionQuery($reference: String!) {
    accountTransaction(reference: $reference) {
      ...AdminTransactionCardFragment
      ...AdminAccountTransactionOptionsFragment
      ...AdminAccountTransactionSubscriptionFragment
      ...AdminAccountTransactionEventsFragment
    }
  }
`

export default function AdminAccountTransaction ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminAccountTransactionQuery>(
    Query,
    query
  )

  if (queryData?.accountTransaction == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={6}>
      <TableBodyRowBackground>
        <AdminTransactionCard query={queryData?.accountTransaction} />
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
            <AdminAccountTransactionOptions query={queryData.accountTransaction} />
          </TabPanel>
          <TabPanel>
            <AdminAccountTransactionSubscription query={queryData.accountTransaction} />
          </TabPanel>
          <TabPanel>
            <AdminAccountTransactionEvents query={queryData.accountTransaction} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
