/**
 * @flow
 */

import {
  Flex,
  Text,
  CircularProgress,
  Box,
  Collapse,
  Grid,
  GridItem,
  useDisclosure
} from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AuditCardFragment$key } from '@//:artifacts/AuditCardFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import AuditInspect from './AuditInspect/AuditInspect'
import { format } from 'date-fns'
import { ClickableBox } from '@//:modules/content/PageLayout'
import {
  ArrowButtonRight,
  ArrowButtonDown
} from '../../../../../../assets/icons/navigation'
import { CheckCircle, DeleteCircle, SwapCircle } from '../../../../../../assets/icons/interface'

type Props = {
  auditLog: AuditCardFragment$key,
}

const AuditCardFragmentGQL = graphql`
  fragment AuditCardFragment on PostAuditLog {
    reverted
    reversibleUntil
    post {
      postedAt
      brand {
        name
      }
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

  const formattedDate = format(new Date(data.post.postedAt), 'eeee h:mm aaa')

  return (
    <Box>
      <ClickableBox h={10} onClick={onToggle}>
        <Flex>
          <Grid w='100%' templateColumns='repeat(8, 1fr)' gap={2}>
            <GridItem colSpan={3}>
              <Text whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' fontSize='sm'>
                {formattedDate}
              </Text>
            </GridItem>
            <GridItem textOverflow='ellipsis' colSpan={3}>
              <Text whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' fontSize='sm'>
                {data.post.brand.name}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex w='100%' h='100%' align='center' justify='center' position='relative'>
                <Box>
                  <Icon
                    icon={data.reverted ? SwapCircle : data.action === 'APPROVED' ? CheckCircle : DeleteCircle}
                    w={4} h={4}
                    fill={data.reverted ? 'purple.500' : data.action === 'APPROVED' ? 'green.400' : 'orange.400'}
                  />
                </Box>
                {(expiryPercent > 0 && !data.reverted) &&
                  <CircularProgress
                    trackColor='transparent'
                    color='teal.500'
                    position='absolute'
                    value={expiryPercent}
                    size={7}
                  />}
              </Flex>
            </GridItem>
            <GridItem align='center' colSpan={1}>
              <Flex w='100%' h='100%' align='center' justify='flex-end'>
                <Icon
                  icon={isOpen ? ArrowButtonDown : ArrowButtonRight} w={4} h={4}
                  fill='gray.300'
                />
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </ClickableBox>
      <Collapse in={isOpen}>
        <Box mt={2}>
          <AuditInspect auditLog={data} />
        </Box>
      </Collapse>
    </Box>
  )
}
