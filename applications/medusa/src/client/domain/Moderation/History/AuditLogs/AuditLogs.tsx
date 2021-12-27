import { graphql, usePaginationFragment } from 'react-relay'
import { Accordion, Flex, Text } from '@chakra-ui/react'
import AuditCard from './AuditCard/AuditCard'
import Button from '@//:modules/form/Button/Button'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { AuditLogsQuery } from '@//:artifacts/AuditLogsQuery.graphql'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { AuditLogsPaginationQuery } from '@//:artifacts/AuditLogsPaginationQuery.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<AuditLogsQuery>
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
    postAuditLogs (first: $first, after: $after, dateRange: {from: $from, to: $to})
    @connection(key: "AuditLogsAccount_postAuditLogs") {
      edges {
        node {
          ...AuditCardFragment
        }
      }
    }
  }
`

export default function AuditLogs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AuditLogsQuery>(
    AuditLogsQueryGQL,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AuditLogsPaginationQuery, any>(
    AuditLogsGQL,
    queryData?.viewer
  )

  const auditLogs = data?.moderatorPostAuditLogs?.edges

  return (
    <>
      <Accordion allowToggle>
        <ListSpacer>
          {auditLogs.map((item, index) =>
            <AuditCard
              key={index}
              auditLog={auditLogs[index]?.node}
            />
          )}
        </ListSpacer>
      </Accordion>
      <Flex justify='center'>
        {hasNext
          ? (
            <Button
              onClick={() => loadNext(5)}
              isLoading={isLoadingNext}
              color='gray.200'
              variant='ghost'
            >
              <Trans>
                Load More
              </Trans>
            </Button>)
          : (
            <Text fontSize='sm' color='gray.200'>
              <Trans>
                Only the last 7 days of logs are available
              </Trans>
            </Text>)}
      </Flex>
    </>
  )
}
