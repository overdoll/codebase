/**
 * @flow
 */

import type { Node } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import type { AuditLogsFragment$key } from '@//:artifacts/AuditLogsFragment.graphql'
import {
  Text,
  Flex,
  Stack,
  Accordion
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import AuditCard from './AuditCard/AuditCard'
import Button from '@//:modules/form/Button'
import { usePreloadedQuery } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { AuditLogsQuery } from '@//:artifacts/AuditLogsQuery.graphql'
import { ListSpacer } from '@//:modules/content/PageLayout'

type Props = {
  query: PreloadedQueryInner<AuditLogsQuery>,
}

const AuditLogsQueryGQL = graphql`
  query AuditLogsQuery ($from: Time!, $to: Time!) {
    viewer {
      ...AuditLogsFragment
    }
  }
`

const AuditLogsGQL = graphql`
  fragment AuditLogsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AuditLogsPaginationQuery" ) {
    moderatorPostAuditLogs (first: $first, after: $after, dateRange: {from: $from, to: $to})
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
  const queryData = usePreloadedQuery<AuditLogsQuery>(
    AuditLogsQueryGQL,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AuditLogsFragment$key,
    _>(
      AuditLogsGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('moderation')

  const auditLogs = data?.moderatorPostAuditLogs.edges

  return (
    <>
      <ListSpacer>
        {auditLogs.map((item, index) =>
          <AuditCard
            key={index} auditLog={auditLogs[index]?.node}
          />
        )}
      </ListSpacer>
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
