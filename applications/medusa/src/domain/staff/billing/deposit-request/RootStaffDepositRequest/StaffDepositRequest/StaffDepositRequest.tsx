import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffDepositRequestQuery } from '@//:artifacts/StaffDepositRequestQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffDepositRequestCard
  from '../../../deposit-requests/RootStaffDepositRequests/StaffDepositRequests/StaffDepositRequestCard/StaffDepositRequestCard'
import StaffDepositRequestOptions from './StaffDepositRequestOptions/StaffDepositRequestOptions'
import StaffDepositRequestPayoutsList from './StaffDepositRequestPayoutsList/StaffDepositRequestPayoutsList'

interface Props {
  query: PreloadedQuery<StaffDepositRequestQuery>
}

const Query = graphql`
  query StaffDepositRequestQuery($reference: String!) {
    depositRequest(reference: $reference) {
      ...StaffDepositRequestCardFragment
      ...StaffDepositRequestOptionsFragment
      ...StaffDepositRequestPayoutsListFragment
    }
  }
`

export default function StaffDepositRequest ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffDepositRequestQuery>(
    Query,
    query
  )

  if (queryData?.depositRequest == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={6}>
      <TableBodyRowBackground>
        <StaffDepositRequestCard query={queryData.depositRequest} />
      </TableBodyRowBackground>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Deposit Request
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Payouts
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StaffDepositRequestOptions query={queryData.depositRequest} />
          </TabPanel>
          <TabPanel>
            <StaffDepositRequestPayoutsList query={queryData.depositRequest} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
