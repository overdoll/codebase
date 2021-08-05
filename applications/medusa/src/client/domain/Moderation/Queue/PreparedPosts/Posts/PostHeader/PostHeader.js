/**
 * @flow
 */

import { Avatar, CircularProgress, CircularProgressLabel, Flex, Text, Tooltip } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostHeaderFragment$key } from '@//:artifacts/PostHeaderFragment.graphql'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  contributor: PostHeaderFragment$key
}

const ContributorFragmentGQL = graphql`
  fragment PostHeaderFragment on Post {
    contributor {
      username
      avatar
    }
    reassignmentAt
  }
`

export default function PostHeader (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(ContributorFragmentGQL, props.contributor)

  // Get difference in hours so that the moderator can see the reassignment deadline
  const getHourDifference = (date) => {
    const ms = 1000 * 60 * 60
    const now = new Date()
    const later = new Date(date)

    const difference = Math.round((later - now) / ms, 0)

    return difference < 0 ? 0 : difference
  }

  const reassignmentTime = getHourDifference(data.reassignmentAt)

  const reassignmentPercent = reassignmentTime / 24

  // Track changes of reassignment time so clock color changes
  const defineClockColor = (percent) => {
    if (percent > 0.7) {
      return 'green.500'
    } else if (percent > 0.4) {
      return 'orange.500'
    }
  }
  const clockColor = defineClockColor(reassignmentPercent)

  return (
    <Flex align='center' w='100%' justify='space-between'>
      <Flex align='center'>
        <Avatar src={data?.contributor.avatar} w={10} h={10} mr={2} borderRadius='25%' />
        <Text color='gray.100' fontWeight='medium' size='md'>{data?.contributor.username}</Text>
      </Flex>
      <Tooltip label={t('queue.post.reassignment')}>
        <Flex align='center'>
          <CircularProgress
            size={10} value={reassignmentPercent * 100}
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
