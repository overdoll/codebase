/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex, Heading, IconButton } from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import { Suspense } from 'react'
import { graphql, usePreloadedQuery, useLazyLoadQuery, useQueryLoader, usePaginationFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { HistoryPendingPostAuditLogsQuery } from '@//:artifacts/HistoryPendingPostAuditLogsQuery.graphql'
import type { QueuePendingPostsQuery } from '@//:artifacts/QueuePendingPostsQuery.graphql'
import type { PreloadedQuery } from 'react-relay/relay-hooks/EntryPointTypes.flow'

type Props = {
  auditLogsQueryRef: PreloadedQuery<HistoryPendingPostAuditLogsQuery>
}

const pendingPostAuditLogsGQL = graphql`
  query HistoryPendingPostAuditLogsQuery {
    pendingPostAuditLogs(filter: {}) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export default function History (props: Props): Node {
  const [t] = useTranslation('moderation')

  /*

  const data = usePreloadedQuery<HistoryPendingPostAuditLogsQuery>(
    pendingPostAuditLogsGQL,
    props.auditLogsQueryRef
  )

   */

  return (
    <>
      <Helmet title='history' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Flex align='center' justify='space-between'>
            <Heading size='lg' color='gray.00'>{t('history.title')}</Heading>
          </Flex>
        </Flex>
      </Center>
    </>
  )
}
