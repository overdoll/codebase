import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import { Box, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import StaffClubStatus from './StaffClubStatus/StaffClubStatus'
import StaffClubInfractions from './StaffClubInfractions/StaffClubInfractions'
import LargeClubHeader from '../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { Trans } from '@lingui/macro'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubPageButton from '../../../../[slug]/root/RootPublicClub/PublicClub/ClubMenu/ClubPageButton/ClubPageButton'
import StaffClubOwner from './StaffClubOwner/StaffClubOwner'
import StaffClubPayouts from './StaffClubPayouts/StaffClubPayouts'
import StaffClubPayments from './StaffClubPayments/StaffClubPayments'

interface Props {
  query: PreloadedQuery<StaffClubQuery>
}

const Query = graphql`
  query StaffClubQuery($slug: String!) {
    club(slug: $slug) {
      __typename
      ...LargeClubHeaderFragment
      ...StaffClubStatusFragment
      ...StaffClubInfractionsFragment
      ...ClubPageButtonFragment
      ...StaffClubOwnerFragment
      ...StaffClubPayoutsFragment
      ...StaffClubPaymentsFragment
    }
  }
`

export default function StaffClub ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffClubQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={6}>
      <HStack spacing={2} justify='space-between'>
        <LargeClubHeader query={queryData.club} />
        <Menu
          p={1}
        >
          <ClubPageButton query={queryData.club} />
        </Menu>
      </HStack>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Status
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Owner
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Payouts
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Payments
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={8}>
              <Box>
                <StaffClubStatus query={queryData.club} />
              </Box>
              <Box>
                <StaffClubInfractions query={queryData.club} />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <StaffClubOwner query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubPayouts query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubPayments query={queryData.club} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
