import { CuratedDataFeedFragment$key } from '@//:artifacts/CuratedDataFeedFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import isBefore from 'date-fns/isBefore'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  viewerQuery: CuratedDataFeedFragment$key | null
}

const ViewerFragment = graphql`
  fragment CuratedDataFeedFragment on Account {
    curatedPostsFeedData {
      generatedAt
      nextRegenerationTime
      nextRegenerationTimeDuration
      viewedAt
    }
  }
`

export default function CuratedDataFeed (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (viewerData == null) return <></>

  if (viewerData?.curatedPostsFeedData.generatedAt == null) {
    return (
      <Stack spacing={1}>
        <Heading fontSize='lg' color='gray.00'>
          <Trans>
            Welcome to your first feed!
          </Trans>
        </Heading>
      </Stack>
    )
  }

  const hasNewContent = viewerData.curatedPostsFeedData.viewedAt == null || isBefore(new Date(viewerData.curatedPostsFeedData.nextRegenerationTime), new Date())

  return (
    <Stack spacing={2}>
      {hasNewContent && (
        <Text color='primary.400' fontSize='md'>
          <Trans>
            We've added some fresh content to your feed
          </Trans>
        </Text>)}
    </Stack>
  )
}
