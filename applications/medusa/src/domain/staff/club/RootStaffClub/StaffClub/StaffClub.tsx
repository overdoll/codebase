import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import { HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import StaffClubStatus from './StaffClubStatus/StaffClubStatus'
import LargeClubHeader from '../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { Trans } from '@lingui/macro'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubPageButton from '../../../../slug/root/RootPublicClub/PublicClub/ClubMenu/ClubPageButton/ClubPageButton'
import StaffClubOwner from './StaffClubOwner/StaffClubOwner'
import StaffClubPayouts from './StaffClubPayouts/StaffClubPayouts'
import StaffClubPayments from './StaffClubPayments/StaffClubPayments'
import StaffClubSuspensions from './StaffClubSuspensions/StaffClubSuspensions'
import StaffClubTermination from './StaffClubTermination/StaffClubTermination'
import StaffClubSupporterSubscriptions from './StaffClubSupporterSubscriptions/StaffClubSupporterSubscriptions'
import StaffClubPosts from './StaffClubPosts/StaffClubPosts'

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
      ...StaffClubSuspensionsFragment
      ...StaffClubTerminationFragment
      ...StaffClubSupporterSubscriptionsFragment
      ...StaffClubPostsFragment
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
                Posts
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Owner
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Subscriptions
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
            <Tab>
              <Trans>
                Suspensions
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Termination
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StaffClubStatus query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubPosts query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubOwner query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubSupporterSubscriptions query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubPayouts query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubPayments query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubSuspensions query={queryData.club} />
          </TabPanel>
          <TabPanel>
            <StaffClubTermination query={queryData.club} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
