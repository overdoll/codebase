import { CuratedDataFeedFragment$key } from '@//:artifacts/CuratedDataFeedFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import differenceInHours from 'date-fns/differenceInHours'
import isBefore from 'date-fns/isBefore'
import { CircularProgress, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Plural, Trans } from '@lingui/macro'

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
        <Text>
          <Trans>
            Starting from today, we'll give you a new feed
            every {viewerData.curatedPostsFeedData.nextRegenerationTimeDuration / 3600000} hours
          </Trans>
        </Text>
      </Stack>
    )
  }

  const hasNewContent = viewerData.curatedPostsFeedData.viewedAt == null || isBefore(new Date(viewerData.curatedPostsFeedData.nextRegenerationTime), new Date())

  const hoursDiff = viewerData.curatedPostsFeedData.nextRegenerationTime != null
    ? differenceInHours(new Date(viewerData.curatedPostsFeedData.nextRegenerationTime), new Date())
    : (viewerData.curatedPostsFeedData.nextRegenerationTimeDuration / 3600000)

  return (
    <Stack spacing={2}>
      <HStack spacing={2}>
        <CircularProgress value={(hoursDiff / 24) * 100} size='24px' thickness='15px' color='primary.400' />
        <Heading color='gray.00' fontSize='xl'>
          <Plural
            value={hoursDiff}
            one='New feed in # hour'
            other='New feed in # hours'
          />
        </Heading>
      </HStack>
      {hasNewContent && (
        <Text color='primary.400' fontSize='md'>
          <Trans>
            We've added some fresh content to your feed
          </Trans>
        </Text>)}
    </Stack>
  )
}
