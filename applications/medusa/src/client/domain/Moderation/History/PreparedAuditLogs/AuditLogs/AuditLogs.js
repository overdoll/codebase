/**
 * @flow
 */

import type { Node } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import type { AuditLogsFragment, AuditLogsFragment$key } from '@//:artifacts/AuditLogsFragment.graphql'
import {
  Text,
  Flex,
  Stack,
  Accordion
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import AuditCard from './AuditCard/AuditCard'
import Button from '@//:modules/form/Button'

type Props = {
  auditLogs: AuditLogsFragment$key,
}

const AuditLogsGQL = graphql`
  fragment AuditLogsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AuditLogsPaginationQuery" ) {
    moderatorPostAuditLogs (first: $first, after: $after)
    @connection(key: "AuditLogs_moderatorPostAuditLogs") {
      edges {
        node {
          ...AuditCardFragment
          ...AuditInspectFragment
        }
      }
    }
  }
`

export default function AuditLogs (props: Props): Node {
  const [t] = useTranslation('moderation')

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<AuditLogsFragment,
    _>(
      AuditLogsGQL,
      props.auditLogs
    )

  const auditLogs = data?.moderatorPostAuditLogs.edges

  return (
    <>
      <Stack mt={2} mb={3}>
        <Accordion allowToggle>
          {auditLogs.map((item, index) =>
            <AuditCard
              key={index} auditLog={auditLogs[index].node}
            />
          )}
        </Accordion>
      </Stack>
      <Flex justify='center'>
        {hasNext
          ? <Button
              onClick={() => loadNext(5)} isLoading={isLoadingNext} color='gray.200'
              variant='ghost'
            >{t('history.table.load')}
          </Button>
          : <Text fontSize='sm' color='gray.200'>
            {t('history.table.empty')}
          </Text>}
      </Flex>
    </>
  )
}
