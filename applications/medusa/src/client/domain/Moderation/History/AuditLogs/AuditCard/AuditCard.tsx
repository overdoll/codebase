import { AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AuditCardFragment$key } from '@//:artifacts/AuditCardFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import AuditInspect from './AuditInspect/AuditInspect'
import { format } from 'date-fns'
import { ArrowButtonDown, ArrowButtonUp } from '@//:assets/icons/navigation'
import { CheckCircle, DeleteCircle } from '@//:assets/icons/interface'

interface Props {
  auditLog: AuditCardFragment$key
}

const AuditCardFragmentGQL = graphql`
  fragment AuditCardFragment on PostAuditLog {
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

export default function AuditCard ({ auditLog }: Props): JSX.Element {
  const data = useFragment(AuditCardFragmentGQL, auditLog)

  const formattedDate = format(new Date(data?.post?.postedAt as string), 'eeee h:mm aaa')

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Flex w='100%'>
              <Grid w='100%' templateColumns='repeat(8, 1fr)' gap={2}>
                <GridItem colSpan={3}>
                  <Text textAlign='left' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' fontSize='sm'>
                    {formattedDate}
                  </Text>
                </GridItem>
                <GridItem textOverflow='ellipsis' colSpan={3}>
                  <Text textAlign='left' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' fontSize='sm'>
                    {data?.post?.brand?.name}
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Flex w='100%' h='100%' align='center' justify='center' position='relative'>
                    <Box>
                      <Icon
                        icon={data.action === 'APPROVED' ? CheckCircle : DeleteCircle}
                        w={4}
                        h={4}
                        fill={data.action === 'APPROVED' ? 'green.400' : 'orange.400'}
                      />
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem align='center' colSpan={1}>
                  <Flex w='100%' h='100%' align='center' justify='flex-end'>
                    <Icon
                      icon={isExpanded ? ArrowButtonUp : ArrowButtonDown}
                      fill='gray.300'
                      w={4}
                      h={4}
                    />
                  </Flex>
                </GridItem>
              </Grid>
            </Flex>
          </AccordionButton>
          <AccordionPanel>
            <AuditInspect auditLog={data} />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
