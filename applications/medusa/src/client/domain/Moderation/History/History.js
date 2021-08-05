/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex, Heading, Table, Th, Thead, Tr } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedAuditLogsQuery } from '@//:artifacts/PreparedAuditLogsQuery.graphql'
import PreparedAuditLogs from './PreparedAuditLogs/PreparedAuditLogs'

type Props = {
  prepared: {
    auditLogsQuery: PreloadedQueryInner<PreparedAuditLogsQuery>,
  }
}

export default function History (props: Props): Node {
  const [t] = useTranslation('moderation')

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
            <SkeletonStack />
          }
          >
            <PreparedAuditLogs query={props.prepared.auditLogsQuery} />
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
