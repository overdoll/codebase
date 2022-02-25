import { CircularProgress, CircularProgressLabel, Flex, Tooltip } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostHeaderFragment$key } from '@//:artifacts/PostHeaderFragment.graphql'
import PostHeaderClub from '@//:modules/content/Posts/components/PostContent/PostHeaderClub/PostHeaderClub'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostHeaderFragment$key
}

const ContributorFragmentGQL = graphql`
  fragment PostHeaderFragment on Post {
    reassignmentAt
    ...PostHeaderClubFragment
  }
`

export default function PostHeader ({ query }: Props): JSX.Element {
  const data = useFragment(ContributorFragmentGQL, query)

  // Get difference in hours so that the moderator can see the reassignment deadline
  const getHourDifference = (date): number => {
    const ms = 1000 * 60 * 60
    const now = new Date()
    const later = new Date(date)

    const difference = Math.round((later.getTime() - now.getTime()) / ms)

    return difference < 0 ? 0 : difference
  }

  const reassignmentTime = getHourDifference(data.reassignmentAt)

  const reassignmentPercent = reassignmentTime / 24

  // Track changes of reassignment time so clock color changes
  const defineClockColor = (percent: number): string => {
    if (percent > 0.7) {
      return 'green.500'
    } else if (percent > 0.4) {
      return 'orange.500'
    }
    return 'green.500'
  }
  const clockColor = defineClockColor(reassignmentPercent)

  return (
    <Flex align='center' w='100%' justify='space-between'>
      <PostHeaderClub query={data} />
      <Tooltip label={
        <Trans>
          Time you have left to take action on the post before it is reassigned to another moderator
        </Trans>
      }
      >
        <Flex align='center'>
          <CircularProgress
            size={10}
            value={reassignmentPercent * 100}
            color={clockColor}
          >
            <CircularProgressLabel fontSize='xs'>
              {reassignmentTime}h
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Tooltip>
    </Flex>
  )
}
