import { graphql, usePaginationFragment } from 'react-relay'
import { Accordion, Flex, Text } from '@chakra-ui/react'
import AuditCard from './AuditCard/AuditCard'
import Button from '@//:modules/form/Button/Button'
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PostAuditLogsQuery } from '@//:artifacts/PostAuditLogsQuery.graphql'
import { ListSpacer, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<PostAuditLogsQuery>
}

const Query = graphql`
  query PostAuditLogsQuery ($from: Time!, $to: Time!) @preloadable {
    viewer {
      ...PostAuditLogsFragment
    }
  }
`

const Fragment = graphql`
  fragment PostAuditLogsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AuditLogsPaginationQuery" ) {
    postAuditLogs (first: $first, after: $after, from: $from, to: $to)
    @connection(key: "AuditLogsAccount_postAuditLogs") {
      edges {
        node {
          id
          ...AuditCardFragment
        }
      }
    }
  }
`

export default function PostAuditLogs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PostAuditLogsQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PostAuditLogsQuery, any>(
    Fragment,
    queryData?.viewer
  )

  const auditLogs = data?.postAuditLogs?.edges

  return (
    <>
      <Accordion allowToggle>
        {auditLogs.length > 0
          ? (
            <ListSpacer>
              {auditLogs.map((item, index) =>
                <AuditCard
                  key={item.node.id}
                  auditLog={auditLogs[index]?.node}
                />
              )}
            </ListSpacer>
            )
          : (
            <SmallBackgroundBox align='center'>
              <Trans>
                No audit logs were found
              </Trans>
            </SmallBackgroundBox>
            )}
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
            </Button>
            )
          : (
            <Text fontSize='sm' color='gray.200'>
              <Trans>
                Only the last 7 days of logs are available
              </Trans>
            </Text>
            )}
      </Flex>
    </>
  )
}
