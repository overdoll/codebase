import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffPaymentQuery } from '@//:artifacts/StaffPaymentQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffPaymentOptions from './StaffPaymentOptions/StaffPaymentOptions'
import StaffClubPaymentCard
  from '../../../../club/RootStaffClub/StaffClub/StaffClubPayments/StaffClubPaymentsList/StaffClubPaymentCard/StaffClubPaymentCard'
import StaffPaymentTransaction from './StaffPaymentTransaction/StaffPaymentTransaction'
import StaffPaymentClub from './StaffPaymentClub/StaffPaymentClub'

interface Props {
  query: PreloadedQuery<StaffPaymentQuery>
}

const Query = graphql`
  query StaffPaymentQuery($reference: String!) {
    payment(reference: $reference) {
      ...StaffClubPaymentCardFragment
      ...StaffPaymentOptionsFragment
      ...StaffPaymentTransactionFragment
      ...StaffPaymentClubFragment
    }
  }
`

export default function StaffPayment ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffPaymentQuery>(
    Query,
    query
  )

  if (queryData?.payment == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={6}>
      <TableBodyRowBackground>
        <StaffClubPaymentCard query={queryData.payment} />
      </TableBodyRowBackground>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Payment
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Transaction
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Club
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StaffPaymentOptions query={queryData.payment} />
          </TabPanel>
          <TabPanel>
            <StaffPaymentTransaction query={queryData.payment} />
          </TabPanel>
          <TabPanel>
            <StaffPaymentClub query={queryData.payment} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
