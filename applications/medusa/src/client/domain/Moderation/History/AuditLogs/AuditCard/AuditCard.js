/**
 * @flow
 */

import {
  Flex,
  Text,
  CircularProgress,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'
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
import InterfaceArrowsMoveHorizontalCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-move-horizontal-circle.svg'
import InterfaceArrowsButtonDown
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-down.svg'
import AuditInspect from './AuditInspect/AuditInspect'
import { format } from 'date-fns'
import Button from '@//:modules/form/Button'

type Props = {
  auditLog: AuditCardFragment$key,
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
    ...AuditInspectFragment
  }
`

export default function AuditCard ({ auditLog }: Props): Node {
  const data = useFragment(AuditCardFragmentGQL, auditLog)

  const { isOpen, onToggle } = useDisclosure()

  const getMinuteDifference = (date) => {
    const ms = 1000 * 60
    const now = new Date()
    const later = new Date(date)

    const difference = Math.round((later - now) / ms, 0)

    return difference < 0 ? 0 : difference
  }

  const expiryTime = getMinuteDifference(data.reversibleUntil)

  const expiryPercent = (expiryTime / 10) * 100

  const formattedDate = format(new Date(data.post.postedAt), 'eeee h:m aaa')

  return (
    <AccordionItem border='none'>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            textAlign='left'
            borderRadius='base' size='lg' bg='gray.800'
            h={12}
          >
            <Flex align='center' justify='space-between' w='100%' direction='row'>
              <Text fontSize='md'>
                {formattedDate}
              </Text>
              <Text fontSize='md'>
                {data.contributor.username}
              </Text>
              <Flex align='center' justify='center' position='relative'>
                <Box>
                  <Icon
                    icon={data.reverted ? InterfaceArrowsMoveHorizontalCircle : data.action === 'APPROVED' ? InterfaceValidationCheckCircle : InterfaceDeleteCircle}
                    w={4} h={4}
                    fill={data.reverted ? 'blue.500' : data.action === 'APPROVED' ? 'green.500' : 'orange.500'}
                  />
                </Box>
                {(expiryPercent > 0 && !data.reverted) &&
                  <CircularProgress color='blue.500' position='absolute' value={expiryPercent} size={7} />}
              </Flex>
            </Flex>
            <Flex ml={3}>
              <Icon
                icon={isExpanded ? InterfaceArrowsButtonDown : InterfaceArrowsButtonRight} w={4} h={4}
                fill='gray.300'
              />
            </Flex>
          </AccordionButton>
          <AccordionPanel px={0} pt={2} pb={2}>
            <AuditInspect auditLog={auditLog} />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
