/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex, Heading, Skeleton, Stack, Table, Th, Thead, Tr } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, usePreloadedQuery } from 'react-relay'
import type { HistoryAuditQuery } from '@//:artifacts/HistoryAuditQuery.graphql'
import { Suspense } from 'react'
import AuditLogs from './AuditLogs/AuditLogs'

const AuditLogsGQL = graphql`
  query HistoryAuditQuery {
    viewer {
      ...AuditLogsFragment
    }
  }
`

type Props = {
  prepared: {
    stateQuery: HistoryAuditQuery
  }
}

export default function History (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = usePreloadedQuery<HistoryAuditQuery>(
    AuditLogsGQL,
    props.prepared.stateQuery
  )

  return (
    <>
      <Helmet title='history' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          direction='column'
        >
          <Heading size='lg' color='gray.00'>{t('history.title')}</Heading>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>{t('history.table.headers.date')}</Th>
                <Th>{t('history.table.headers.contributor')}</Th>
                <Th>{t('history.table.headers.status')}</Th>
              </Tr>
            </Thead>
          </Table>
          <Suspense fallback={
            <Stack mt={2}>
              {[...Array(3).keys()].map((item, index) =>
                <Skeleton key={index} borderRadius={5} h={12} />
              )}
            </Stack>
          }
          >
            <AuditLogs auditLogs={data?.viewer} />
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
