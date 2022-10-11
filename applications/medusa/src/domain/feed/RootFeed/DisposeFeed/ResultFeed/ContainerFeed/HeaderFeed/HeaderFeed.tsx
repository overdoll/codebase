import { HeaderFeedViewerFragment$key } from '@//:artifacts/HeaderFeedViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { HStack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { FeedMenu } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import QuickPreferences from '@//:modules/content/HookedComponents/Filters/fragments/QuickPreferences/QuickPreferences'

interface Props {
  viewerQuery: HeaderFeedViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment HeaderFeedViewerFragment on Account {
    ...QuickPreferencesFragment
  }
`

export default function HeaderFeed (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <HStack justify='space-between'>
      <PageHeader icon={FeedMenu} title={<Trans>Your feed</Trans>} />
      <QuickPreferences query={viewerData} />
    </HStack>
  )
}
