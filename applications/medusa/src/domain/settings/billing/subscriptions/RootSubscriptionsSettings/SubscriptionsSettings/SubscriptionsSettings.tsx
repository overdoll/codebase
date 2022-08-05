import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { SubscriptionsSettingsQuery } from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ClubSupporterSubscriptionsSettings from './ClubSupporterSubscriptionsSettings/ClubSupporterSubscriptionsSettings'
import ExpiredClubSupporterSubscriptionsSettings
  from './ExpiredClubSupporterSubscriptionsSettings/ExpiredClubSupporterSubscriptionsSettings'
import AccountInformationBanner
  from '../../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import ContactButton from '../../../../../../common/components/Contact/ContactButton'

interface Props {
  query: PreloadedQuery<SubscriptionsSettingsQuery>
}

const Query = graphql`
  query SubscriptionsSettingsQuery {
    viewer @required(action: THROW) {
      ...ClubSupporterSubscriptionsSettingsFragment
      ...ExpiredClubSupporterSubscriptionsSettingsFragment
      ...AccountInformationBannerFragment
    }
  }
`

export default function SubscriptionsSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<SubscriptionsSettingsQuery>(
    Query,
    props.query
  )

  return (
    <>
      <AccountInformationBanner query={queryData.viewer} />
      <Stack spacing={4}>
        <Tabs colorScheme='gray' isFitted variant='soft-rounded'>
          <TabList>
            <Tab>
              <Trans>
                Current
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Expired
              </Trans>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ClubSupporterSubscriptionsSettings query={queryData.viewer} />
            </TabPanel>
            <TabPanel>
              <ExpiredClubSupporterSubscriptionsSettings query={queryData.viewer} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Stack spacing={2}>
          <Text fontSize='md' color='gray.200'>
            <Trans>
              For questions or concerns about your billing, please contact us
            </Trans>
          </Text>
          <ContactButton />
        </Stack>
      </Stack>
    </>
  )
}
