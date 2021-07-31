/**
 * @flow
 */

import { Button, Flex, Text, CircularProgress, CircularProgressLabel, Box } from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AuditCardFragment$key } from '@//:artifacts/AuditCardFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import InterfaceValidationCheckCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-circle.svg'
import InterfaceDeleteCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-circle.svg'
import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import InterfaceArrowsRoundLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-round-left.svg'

import convertToMonthDayTime from '@//:modules/utilities/functions/date/convertToMonthDayTime'

type Props = {
  auditLog: AuditCardFragment$key,
  selected: boolean,
  setSelected: () => void,
}

const AuditCardFragmentGQL = graphql`
  fragment AuditCardFragment on PostAuditLog {
    reverted
    reversibleUntil
    contributor {
      username
    }
    post {
      postedAt
    }
    action
  }
`

export default function AuditCard ({ auditLog, selected, setSelected }: Props): Node {
  const data = useFragment(AuditCardFragmentGQL, auditLog)

  const getMinuteDifference = (date) => {
    const ms = 1000 * 60
    const now = new Date()
    const later = new Date(date)

    const difference = Math.round((later - now) / ms, 0)

    return difference < 0 ? 0 : difference
  }

  const expiryTime = getMinuteDifference(data.reversibleUntil)

  const expiryPercent = expiryTime / 24

  return (
    <Button
      pl={3} pr={3} textAlign='left'
      borderRadius={5} variant='solid' size='xl' h={12}
      bg={selected ? 'gray.600' : 'gray.800'}
      onClick={setSelected}
      boxShadow={selected ? 'sm' : 'none'}
    >
      <Flex align='center' justify='space-between' w='100%' direction='row'>
        <Text fontSize='md'>
          {convertToMonthDayTime(data.post.postedAt)}
        </Text>
        <Text fontSize='md'>
          {data.contributor.username}
        </Text>
        <Flex align='center' justify='center' position='relative'>
          <Box>
            <Icon
              icon={data.reverted ? InterfaceArrowsRoundLeft : data.action === 'Approved' ? InterfaceValidationCheckCircle : InterfaceDeleteCircle}
              w={4} h={4} fill={data.reverted ? 'blue.500' : data.action === 'Approved' ? 'green.500' : 'orange.500'}
            />
          </Box>
          {(expiryPercent > 0 && !data.reverted) &&
            <CircularProgress colorScheme='blue' position='absolute' value={expiryPercent} size={7} />}
        </Flex>
      </Flex>
      <Flex ml={3}>
        <Icon icon={InterfaceArrowsButtonRight} w={4} h={4} fill={selected ? 'gray.100' : 'gray.300'} />
      </Flex>
    </Button>
  )
}
