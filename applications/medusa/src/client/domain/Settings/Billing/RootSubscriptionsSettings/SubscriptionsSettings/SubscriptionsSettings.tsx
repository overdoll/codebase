import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { SubscriptionsSettingsQuery } from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ClubSupporterSubscriptionsSettings from './ClubSupporterSubscriptionsSettings/ClubSupporterSubscriptionsSettings'
import ExpiredClubSupporterSubscriptionsSettings
  from './ExpiredClubSupporterSubscriptionsSettings/ExpiredClubSupporterSubscriptionsSettings'

interface Props {
  query: PreloadedQuery<SubscriptionsSettingsQuery>
}

const Query = graphql`
  query SubscriptionsSettingsQuery {
    viewer @required(action: THROW) {
      ...ClubSupporterSubscriptionsSettingsFragment
      ...ExpiredClubSupporterSubscriptionsSettingsFragment
    }
  }
`

export default function SubscriptionsSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<SubscriptionsSettingsQuery>(
    Query,
    props.query
  )

  return (
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
  )
}
